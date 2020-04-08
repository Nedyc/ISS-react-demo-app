class Weather{
    constructor() {
        this.apis = {
            location: "https://lvz615j8kg.execute-api.eu-west-3.amazonaws.com/weather-api/location/search.json?lattlong=",
            forecast: "https://lvz615j8kg.execute-api.eu-west-3.amazonaws.com/weather-api/location/weather.json?"
        }
        
        this.result = [];
        this.dayForection = [];
    }

    //Get pos
    async getWeather(lattlong){
        return await fetch(this.apis.location+lattlong.lat+","+lattlong.lng).then((response) => {
            return response.json();
        }).then((json) => {
            this.result = json;
            return json;
        }).catch( err => {
            return null;
        });
    }

    
    //Get day forecast
    async getDayForecast(woeid, day, month, year){
        return await fetch(this.apis.forecast+"woeid="+woeid+"&year="+year+"&month="+month+"&day="+day).then((response) => {
            return response.json();
        }).then((json) => {
            this.result = json;
            return json;
        }).catch( err => {
            return null;
        });
    }
}

export default new Weather();