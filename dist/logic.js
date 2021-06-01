class Weather {
    constructor() {
        this.cityData = [];
    }

    getDataFromDB() {
        return $.ajax({
            method: "GET",
            url: `/cities/`,
            success: (response) => {
                this.cityData = response;
                return this.cityData
                // console.log( this.cityData)

            }
        })

    }
    async getCityData(city) {

        return $.ajax({
            method: "GET",
            url: `/city/${city}`,
            success: (response) => {
                return response;
                // this.cityData.push(response)

            }
        })

    }
    async saveCity(city) {
        return $.ajax({
            method: "POST",
            url: `/city`,
            data: { name: city },
            success: (response) => {
                return response
            }

        })
    }

    async removeCity(city) {

        return $.ajax({
            method: "DELETE",
            url: `/city/${city}`,
            success: (response) => {
                console.log(response);
                this.cityData = this.cityData.filter(a => a.name != city)
                return response
            }

        })
    }

}