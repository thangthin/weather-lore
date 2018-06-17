const YOUR_API_KEY = "034018c64deeca66e5d4b3f0310547a0";
const REGISTERED_PARAM = `&APPID=${YOUR_API_KEY}`

const kelvinToFahrenheit = function(kelvin) {
    let fahrenheit = (kelvin * (9/5)) - 459.67;
    return fahrenheit;
};

const toFahrenheit = function(weatherObj) {
    return {
        ...weatherObj,
        main: {
            ...weatherObj.main,
            temp: kelvinToFahrenheit(weatherObj.main.temp),
            temp_min: kelvinToFahrenheit(weatherObj.main.temp_min),
            temp_max: kelvinToFahrenheit(weatherObj.main.temp_max)
        }
    }
};

const getRelevantForecastDays = (json) => {
    let sample = { "dt": 1529172000, "main": { "temp": 88.17800000000005, "temp_min": 88.17800000000005, "temp_max": 90.68, "pressure": 1006.71, "sea_level": 1026.06, "grnd_level": 1006.71, "humidity": 60, "temp_kf": -1.39 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": { "all": 0 }, "wind": { "speed": 6.06, "deg": 176.001 }, "sys": { "pod": "d" }, "dt_txt": "2018-06-16 18:00:00" }
    let firstDay = new Date(json.list[0].dt_txt).getDay();
    // get only objects with midday time unless it is the first one in list
    const isMidDay = (day, idx) => {
        if( idx === 0 ) {
            return true;
        } else {
            if (new Date(day.dt_txt).getDay() === firstDay ) {
                return false;
            }
            return (new Date(day.dt_txt).toLocaleTimeString() === "12:00:00 PM")
        }
    }

    let list = json.list.slice();
    let result = list.filter(isMidDay)
    return result;
}

export default {
    getWeather: function(city) {
        let endpoint =`http://api.openweathermap.org/data/2.5/weather?q=${city}&type=accurate${REGISTERED_PARAM}`
        return fetch(endpoint)
            .then(response => response.json());
        },
    getForecasts: function(city) {
        let endpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&type=accurate${REGISTERED_PARAM}`;
        return fetch(endpoint)
            .then(response => response.json())
            .then(getRelevantForecastDays)
            .then(list => {
                return {
                    city: city,
                    weathers: list.map(toFahrenheit)
                }
            });
    },
    getDayName: (day) => {
        let name = ""
        switch(day) {
            case 0:
                name = "Sunday";
                break;
            case 1:
                name = "Monday";
                break;
            case 2:
                name = "Tuesday";
                break;
            case 3:
                name = "Wednesday";
                break;
            case 4:
                name = "Thursday";
                break;
            case 5:
                name = "Friday";
                break;
            case 6:
                name = "Saturday";
                break;
            default:
                name = "";
        }
        return name;
    }
}