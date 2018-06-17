import React from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DailyForecast = (props) => {
    let day = api.getDayName(new Date(props.dateText).getDay());
    return (
        <div className="daily-forecast">
            <div className="img-containers"><img src={`/images/weather-icons/${props.icon}.svg`}/></div>
            <div>{day}</div>
        </div>
    )
}

DailyForecast.propTypes = {
    dateText: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}

class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weathers: null,
            loading: true
        }
        this.findWeatherFromLocation = this.findWeatherFromLocation.bind(this);
    }

    findWeatherFromLocation(search) {
        let { city } = queryString.parse(search);
        api.getForecasts(city)
           .then(forecasts => {
               this.setState(function() {
                   return {
                       weathers: forecasts,
                       loading: false
                   }
               });
           });
    }

    componentDidMount() {
        this.findWeatherFromLocation(this.props.location.search)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.search !== nextProps.location.search) {
            this.setState(function() {
                return {
                    loading: true
                }
            });
            this.findWeatherFromLocation(nextProps.location.search);
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="loading-container">
                    <img className="loading-logo" src={`/images/logo.svg`} alt="loading"/>
                </div>
            );
        } else {
            let forecasts = this.state.weathers.weathers
            let { city } = this.state.weathers;
            return (
                <div className="forecast">
                    <h2 className="forecast-city">{city}</h2>
                    <div className="forecast-containers">
                    {forecasts.map((day, idx) => {
                        return (
                            <Link key={idx} 
                                to={{
                                    pathname: `/details`,
                                    state: {
                                        city: city,
                                        date: day.dt,
                                        condition: day.weather[0].description,
                                        min: day.main.temp_max,
                                        max: day.main.temp_min,
                                        humidity: day.main.humidity,
                                        icon: day.weather[0].icon
                                    }
                                }} 
                            >
                                <DailyForecast 
                                    key={ idx }
                                    icon={ day.weather[0].icon } 
                                    dateText={ day.dt_txt }/>
                            </Link>
                            )
                    })}
                    </div>
                </div>
            )
        }
    }
}

export default Forecast;