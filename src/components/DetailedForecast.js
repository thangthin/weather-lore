import React from 'react';
import PropTypes from 'prop-types';
import QS from 'query-string';
import api from '../utils/api';

class DetailedForecast extends React.Component {
    constructor(props) {
        super(props);
        this.formatState = this.formatState.bind(this);

        this.state = this.formatState(Object.assign({},this.props.location.state));
    }

    formatState(state) {
        return {
            ...state,
            date: `${api.getDayName(new Date(state.date).getDay())}, ${new Date(state.date).toLocaleDateString()}`,
            max: Math.ceil(state.max),
            min: Math.floor(state.min),
        }
    }

    render() {
        let { date, max, min, city, condition, humidity, icon } = this.state;
        return (
            <div className="detailed-forecast">
                <div><img src={`/images/weather-icons/${icon}.svg`} alt="weater icon"/></div>
                <div>{ date }</div>
                <div>{ city }</div>
                <div>{ condition }</div>
                <div>{ `Min Temp: ${min} degrees` }</div>
                <div>{ `Max Temp: ${max} degrees` }</div>
                <div>{ `Humidity Index: ${humidity}` }</div>
            </div>
        )
    }
}



export default DetailedForecast;