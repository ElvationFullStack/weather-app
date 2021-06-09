
const express = require('express');
const request = require('request');
const City = require('../../model/city');

const router = express.Router()

const api_key = "a729e21a99204cc5c91e87a5951ee7fa"
const api_url = "http://api.openweathermap.org/data/2.5/weather";


//======================GET Method======================
router.get('/cities', function (req, res) {
    City.find({}, function (err, docs) {
        if (err) { res.send(err) }
        else { res.send(docs) }
    });

})

router.get('/city/:city', async function (req, res) {
    const { city } = req.params
    let url_to_send = `${api_url}?q=${city}&appid=${api_key}&units=metric`

    request(url_to_send, function (error, response, body) {
        if (response.statusCode === 404) { res.send('') }
        let data = filter_data((JSON.parse(body)));
        res.send(data)
    });

})

//========================POST METHOD====================
router.post('/city', function (req, res) {
    const new_city = req.body.name;
    let url_to_send = `${api_url}?q=${new_city}&appid=${api_key}&units=metric`
    request(url_to_send, async function (error, response, body) {
        let data = await filter_data((JSON.parse(body)));
        save_city(data)
    });
    res.send("finished saving")
})
//======================DELETE METHODE====================
router.delete('/city/:city', function (req, res) {
    const city = req.params.city
    City.findOneAndDelete({ name: city }, function (err, docs) {
        if (err) { res.send(err) }
        else {
            if (docs === null) {
                res.send("no such city in Db")
            } else {
                res.send(docs)
            }
        }
    });
})
//=============================helper Function========================================
function filter_data(data) {
    const w = {}
    w.name = data.name;
    w.temperature = data.main.temp;
    w.condition = data.weather[0].main;
    w.condtionPic = data.weather[0].icon;
    return w
}

function save_city(city) {
    const new_city = new City(city);
    new_city.save()
}


module.exports = router