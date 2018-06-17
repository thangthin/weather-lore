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
    // getWeather : function (city) {
    //     let response = {
    //         "coord": {
    //             "lon": -96.69,
    //             "lat": 33.01
    //         },
    //         "weather": [
    //             {
    //                 "id": 803,
    //                 "main": "Clouds",
    //                 "description": "broken clouds",
    //                 "icon": "04d"
    //             }
    //         ],
    //         "base": "stations",
    //         "main": {
    //             "temp": 300.38,
    //             "pressure": 1015,
    //             "humidity": 74,
    //             "temp_min": 300.15,
    //             "temp_max": 301.15
    //         },
    //         "visibility": 16093,
    //         "wind": {
    //             "speed": 6.2,
    //             "deg": 170,
    //             "gust": 7.7
    //         },
    //         "clouds": {
    //             "all": 75
    //         },
    //         "dt": 1529158500,
    //         "sys": {
    //             "type": 1,
    //             "id": 2664,
    //             "message": 0.0049,
    //             "country": "US",
    //             "sunrise": 1529147871,
    //             "sunset": 1529199450
    //         },
    //         "id": 4719457,
    //         "name": "Plano",
    //         "cod": 200
    //     };
    //     let asyncRes = new Promise((resolve, reject) => {
    //         setTimeout(function() {
    //             resolve(response);
    //         }, 1000);
    //     });

    //     return asyncRes;
    // },
    //// REAL API CALL
    // getForecasts: function(city) {
    //     let endpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&type=accurate${REGISTERED_PARAM}`;
    //     return fetch(endpoint)
    //         .then(response => response.json())
    //         .then(json => {
    //             let list = json.list.slice(0,5);
    //             return list
    //         })
    //         .then(list => {
    //             return {
    //                 city: city,
    //                 weathers: list.map(toFahrenheit)
    //             }
    //         })
    // },
    //// MOCK API CALL
    getForecasts: function(city) {
        let response = {"cod":"200","message":0.0049,"cnt":40,"list":[{"dt":1529172000,"main":{"temp":304.36,"temp_min":304.36,"temp_max":305.75,"pressure":1006.71,"sea_level":1026.06,"grnd_level":1006.71,"humidity":60,"temp_kf":-1.39},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":6.06,"deg":176.001},"sys":{"pod":"d"},"dt_txt":"2018-06-16 18:00:00"},{"dt":1529182800,"main":{"temp":306.24,"temp_min":306.24,"temp_max":307.285,"pressure":1004.89,"sea_level":1024.12,"grnd_level":1004.89,"humidity":52,"temp_kf":-1.04},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":6.37,"deg":164},"sys":{"pod":"d"},"dt_txt":"2018-06-16 21:00:00"},{"dt":1529193600,"main":{"temp":306,"temp_min":306,"temp_max":306.693,"pressure":1003.85,"sea_level":1023.18,"grnd_level":1003.85,"humidity":46,"temp_kf":-0.7},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":6.81,"deg":156.501},"sys":{"pod":"n"},"dt_txt":"2018-06-17 00:00:00"},{"dt":1529204400,"main":{"temp":303.87,"temp_min":303.87,"temp_max":304.217,"pressure":1005.25,"sea_level":1024.69,"grnd_level":1005.25,"humidity":48,"temp_kf":-0.35},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":24},"wind":{"speed":6.13,"deg":159.005},"sys":{"pod":"n"},"dt_txt":"2018-06-17 03:00:00"},{"dt":1529215200,"main":{"temp":302.246,"temp_min":302.246,"temp_max":302.246,"pressure":1006.1,"sea_level":1025.68,"grnd_level":1006.1,"humidity":55,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":5.91,"deg":160.501},"sys":{"pod":"n"},"dt_txt":"2018-06-17 06:00:00"},{"dt":1529226000,"main":{"temp":301.018,"temp_min":301.018,"temp_max":301.018,"pressure":1006.38,"sea_level":1026.02,"grnd_level":1006.38,"humidity":60,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":20},"wind":{"speed":5.02,"deg":160.501},"sys":{"pod":"n"},"dt_txt":"2018-06-17 09:00:00"},{"dt":1529236800,"main":{"temp":299.78,"temp_min":299.78,"temp_max":299.78,"pressure":1007.54,"sea_level":1027.15,"grnd_level":1007.54,"humidity":64,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02d"}],"clouds":{"all":8},"wind":{"speed":3.62,"deg":153.508},"sys":{"pod":"d"},"dt_txt":"2018-06-17 12:00:00"},{"dt":1529247600,"main":{"temp":303.34,"temp_min":303.34,"temp_max":303.34,"pressure":1008.64,"sea_level":1028.07,"grnd_level":1008.64,"humidity":64,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":4.11,"deg":141.5},"sys":{"pod":"d"},"dt_txt":"2018-06-17 15:00:00"},{"dt":1529258400,"main":{"temp":305.653,"temp_min":305.653,"temp_max":305.653,"pressure":1007.76,"sea_level":1027.16,"grnd_level":1007.76,"humidity":61,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":12},"wind":{"speed":4.77,"deg":120.502},"sys":{"pod":"d"},"dt_txt":"2018-06-17 18:00:00"},{"dt":1529269200,"main":{"temp":305.748,"temp_min":305.748,"temp_max":305.748,"pressure":1005.68,"sea_level":1025.14,"grnd_level":1005.68,"humidity":55,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":80},"wind":{"speed":6.31,"deg":122.5},"sys":{"pod":"d"},"dt_txt":"2018-06-17 21:00:00"},{"dt":1529280000,"main":{"temp":304.759,"temp_min":304.759,"temp_max":304.759,"pressure":1004.79,"sea_level":1024.27,"grnd_level":1004.79,"humidity":55,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":56},"wind":{"speed":7.12,"deg":121.504},"sys":{"pod":"n"},"dt_txt":"2018-06-18 00:00:00"},{"dt":1529290800,"main":{"temp":302.144,"temp_min":302.144,"temp_max":302.144,"pressure":1005.92,"sea_level":1025.46,"grnd_level":1005.92,"humidity":62,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":76},"wind":{"speed":6.92,"deg":128.504},"sys":{"pod":"n"},"dt_txt":"2018-06-18 03:00:00"},{"dt":1529301600,"main":{"temp":300.872,"temp_min":300.872,"temp_max":300.872,"pressure":1006.53,"sea_level":1026.17,"grnd_level":1006.53,"humidity":67,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":64},"wind":{"speed":6.61,"deg":138.508},"sys":{"pod":"n"},"dt_txt":"2018-06-18 06:00:00"},{"dt":1529312400,"main":{"temp":299.279,"temp_min":299.279,"temp_max":299.279,"pressure":1005.98,"sea_level":1025.54,"grnd_level":1005.98,"humidity":72,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":64},"wind":{"speed":6.06,"deg":133.001},"sys":{"pod":"n"},"dt_txt":"2018-06-18 09:00:00"},{"dt":1529323200,"main":{"temp":296.283,"temp_min":296.283,"temp_max":296.283,"pressure":1005.64,"sea_level":1025.09,"grnd_level":1005.64,"humidity":96,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":7.41,"deg":114.002},"rain":{"3h":2.54},"sys":{"pod":"d"},"dt_txt":"2018-06-18 12:00:00"},{"dt":1529334000,"main":{"temp":295.942,"temp_min":295.942,"temp_max":295.942,"pressure":1004.91,"sea_level":1024.78,"grnd_level":1004.91,"humidity":99,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":8.56,"deg":136.004},"rain":{"3h":4.36},"sys":{"pod":"d"},"dt_txt":"2018-06-18 15:00:00"},{"dt":1529344800,"main":{"temp":297.023,"temp_min":297.023,"temp_max":297.023,"pressure":1003.73,"sea_level":1023.98,"grnd_level":1003.73,"humidity":100,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":4.71,"deg":179.5},"rain":{"3h":1.64},"sys":{"pod":"d"},"dt_txt":"2018-06-18 18:00:00"},{"dt":1529355600,"main":{"temp":297.445,"temp_min":297.445,"temp_max":297.445,"pressure":1004.12,"sea_level":1023.7,"grnd_level":1004.12,"humidity":92,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":6.86,"deg":226.5},"rain":{"3h":2.29},"sys":{"pod":"d"},"dt_txt":"2018-06-18 21:00:00"},{"dt":1529366400,"main":{"temp":297.15,"temp_min":297.15,"temp_max":297.15,"pressure":1004.19,"sea_level":1023.74,"grnd_level":1004.19,"humidity":98,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":88},"wind":{"speed":6.56,"deg":178.504},"rain":{"3h":7.11},"sys":{"pod":"n"},"dt_txt":"2018-06-19 00:00:00"},{"dt":1529377200,"main":{"temp":297.594,"temp_min":297.594,"temp_max":297.594,"pressure":1004.7,"sea_level":1024.56,"grnd_level":1004.7,"humidity":96,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":9.26,"deg":184.508},"rain":{"3h":3.86},"sys":{"pod":"n"},"dt_txt":"2018-06-19 03:00:00"},{"dt":1529388000,"main":{"temp":296.368,"temp_min":296.368,"temp_max":296.368,"pressure":1005.96,"sea_level":1025.62,"grnd_level":1005.96,"humidity":95,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":7.92,"deg":200.501},"rain":{"3h":6.25},"sys":{"pod":"n"},"dt_txt":"2018-06-19 06:00:00"},{"dt":1529398800,"main":{"temp":296.531,"temp_min":296.531,"temp_max":296.531,"pressure":1005.75,"sea_level":1025.33,"grnd_level":1005.75,"humidity":96,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":92},"wind":{"speed":7.06,"deg":196},"rain":{"3h":6.2},"sys":{"pod":"n"},"dt_txt":"2018-06-19 09:00:00"},{"dt":1529409600,"main":{"temp":297.038,"temp_min":297.038,"temp_max":297.038,"pressure":1006.04,"sea_level":1025.57,"grnd_level":1006.04,"humidity":96,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":7.26,"deg":192.502},"rain":{"3h":2.26},"sys":{"pod":"d"},"dt_txt":"2018-06-19 12:00:00"},{"dt":1529420400,"main":{"temp":297.646,"temp_min":297.646,"temp_max":297.646,"pressure":1006.6,"sea_level":1026.14,"grnd_level":1006.6,"humidity":97,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":6.21,"deg":190.001},"rain":{"3h":0.030000000000001},"sys":{"pod":"d"},"dt_txt":"2018-06-19 15:00:00"},{"dt":1529431200,"main":{"temp":300.193,"temp_min":300.193,"temp_max":300.193,"pressure":1006.27,"sea_level":1025.77,"grnd_level":1006.27,"humidity":93,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":7.51,"deg":190.005},"rain":{"3h":0.020000000000003},"sys":{"pod":"d"},"dt_txt":"2018-06-19 18:00:00"},{"dt":1529442000,"main":{"temp":301.709,"temp_min":301.709,"temp_max":301.709,"pressure":1004.61,"sea_level":1024.14,"grnd_level":1004.61,"humidity":91,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":88},"wind":{"speed":7.01,"deg":188.501},"rain":{},"sys":{"pod":"d"},"dt_txt":"2018-06-19 21:00:00"},{"dt":1529452800,"main":{"temp":300.963,"temp_min":300.963,"temp_max":300.963,"pressure":1004.18,"sea_level":1023.61,"grnd_level":1004.18,"humidity":87,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":68},"wind":{"speed":6.91,"deg":185.005},"rain":{"3h":0.019999999999996},"sys":{"pod":"n"},"dt_txt":"2018-06-20 00:00:00"},{"dt":1529463600,"main":{"temp":299.299,"temp_min":299.299,"temp_max":299.299,"pressure":1004.78,"sea_level":1024.4,"grnd_level":1004.78,"humidity":87,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":44},"wind":{"speed":7.01,"deg":183.503},"rain":{},"sys":{"pod":"n"},"dt_txt":"2018-06-20 03:00:00"},{"dt":1529474400,"main":{"temp":298.354,"temp_min":298.354,"temp_max":298.354,"pressure":1005.1,"sea_level":1024.77,"grnd_level":1005.1,"humidity":89,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":48},"wind":{"speed":7.21,"deg":190.502},"rain":{},"sys":{"pod":"n"},"dt_txt":"2018-06-20 06:00:00"},{"dt":1529485200,"main":{"temp":298.008,"temp_min":298.008,"temp_max":298.008,"pressure":1004.71,"sea_level":1024.33,"grnd_level":1004.71,"humidity":89,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":64},"wind":{"speed":6.41,"deg":199.005},"rain":{},"sys":{"pod":"n"},"dt_txt":"2018-06-20 09:00:00"},{"dt":1529496000,"main":{"temp":298.08,"temp_min":298.08,"temp_max":298.08,"pressure":1005.03,"sea_level":1024.76,"grnd_level":1005.03,"humidity":88,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":44},"wind":{"speed":5.41,"deg":204.5},"rain":{},"sys":{"pod":"d"},"dt_txt":"2018-06-20 12:00:00"},{"dt":1529506800,"main":{"temp":300.496,"temp_min":300.496,"temp_max":300.496,"pressure":1006.28,"sea_level":1025.76,"grnd_level":1006.28,"humidity":93,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":32},"wind":{"speed":5.17,"deg":206.001},"rain":{},"sys":{"pod":"d"},"dt_txt":"2018-06-20 15:00:00"},{"dt":1529517600,"main":{"temp":302.386,"temp_min":302.386,"temp_max":302.386,"pressure":1006.2,"sea_level":1025.54,"grnd_level":1006.2,"humidity":92,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":32},"wind":{"speed":4.76,"deg":192.502},"rain":{},"sys":{"pod":"d"},"dt_txt":"2018-06-20 18:00:00"},{"dt":1529528400,"main":{"temp":303.983,"temp_min":303.983,"temp_max":303.983,"pressure":1004.04,"sea_level":1023.38,"grnd_level":1004.04,"humidity":79,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":5.66,"deg":156.503},"rain":{},"sys":{"pod":"d"},"dt_txt":"2018-06-20 21:00:00"},{"dt":1529539200,"main":{"temp":304.213,"temp_min":304.213,"temp_max":304.213,"pressure":1003.9,"sea_level":1023.51,"grnd_level":1003.9,"humidity":68,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":56},"wind":{"speed":4.01,"deg":177.003},"rain":{"3h":0.010000000000005},"sys":{"pod":"n"},"dt_txt":"2018-06-21 00:00:00"},{"dt":1529550000,"main":{"temp":295.996,"temp_min":295.996,"temp_max":295.996,"pressure":1006.3,"sea_level":1025.81,"grnd_level":1006.3,"humidity":97,"temp_kf":0},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"clouds":{"all":80},"wind":{"speed":1.81,"deg":337.501},"rain":{"3h":7.32},"sys":{"pod":"n"},"dt_txt":"2018-06-21 03:00:00"},{"dt":1529560800,"main":{"temp":295.782,"temp_min":295.782,"temp_max":295.782,"pressure":1006.51,"sea_level":1026.11,"grnd_level":1006.51,"humidity":96,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":56},"wind":{"speed":0.87,"deg":108.004},"rain":{},"sys":{"pod":"n"},"dt_txt":"2018-06-21 06:00:00"},{"dt":1529571600,"main":{"temp":295.177,"temp_min":295.177,"temp_max":295.177,"pressure":1007.07,"sea_level":1026.87,"grnd_level":1007.07,"humidity":96,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":48},"wind":{"speed":2.42,"deg":28.5023},"rain":{"3h":0.72000000000001},"sys":{"pod":"n"},"dt_txt":"2018-06-21 09:00:00"},{"dt":1529582400,"main":{"temp":295.082,"temp_min":295.082,"temp_max":295.082,"pressure":1007.88,"sea_level":1027.69,"grnd_level":1007.88,"humidity":97,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":68},"wind":{"speed":2.01,"deg":42.5013},"rain":{},"sys":{"pod":"d"},"dt_txt":"2018-06-21 12:00:00"},{"dt":1529593200,"main":{"temp":297.376,"temp_min":297.376,"temp_max":297.376,"pressure":1008.86,"sea_level":1028.61,"grnd_level":1008.86,"humidity":98,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":1.41,"deg":30.0064},"rain":{"3h":0.019999999999996},"sys":{"pod":"d"},"dt_txt":"2018-06-21 15:00:00"}],"city":{"id":4719457,"name":"Plano","coord":{"lat":33.0137,"lon":-96.6926},"country":"US","population":259841}}
        let asyncPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response);
            }, 3000);
        });

        return asyncPromise
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