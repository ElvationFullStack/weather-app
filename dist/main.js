const input_text = $('#input-text')

const weather_app = new Weather();
const renderer = new Render()

async function Load_data() {
    let data = await weather_app.getDataFromDB();
    renderer.renderData(weather_app.cityData)
}

$('#search-btn').on('click', async function () {
    let data = await weather_app.getCityData(input_text.val())
    weather_app.cityData.push(data)
    renderer.renderData(weather_app.cityData)
    input_text.val('')
})
$('body').on('click', '.remove-item-btn', async function () {
    let name = $(this).data().name
    let city = await weather_app.getCityData(name)
    let remove_res = await weather_app.removeCity(name);
    renderer.renderData(weather_app.cityData)

})
$('body').on('click', '.add-item-btn', async function () {
    let name = $(this).data().name
    // let city= await weather_app.getCityData(name)
    weather_app.saveCity(name)
})

Load_data()


