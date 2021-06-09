const input_text = $('#input-text')
const searchButton = $('#search-btn')

const weather_app = new Weather();
const renderer = new Render()

async function Load_data() {
    const data = await weather_app.getDataFromDB();
    renderer.renderData(weather_app.cityData)
}

$('input').on('keyup', async function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
    }
})
$('#search-btn').on('click', async function (event) {
    if (input_text.val() === "") { return; }
    await weather_app.getCityData(input_text.val())
    renderer.renderData(weather_app.cityData)
    input_text.val('')
})
$('body').on('click', '.remove-item-btn', async function () {
    let name = $(this).data().name
    await weather_app.getCityData(name)
    await weather_app.removeCity(name);
    renderer.renderData(weather_app.cityData)
})
$('body').on('click', '.add-item-btn', async function () {
    let name = $(this).data().name
    weather_app.saveCity(name)
})

Load_data()


