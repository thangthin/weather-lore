import React from 'react';
import PropTypes from 'prop-types';
import history from './History';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            location: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.state.location !== "") {
            let forecastPath = `/forecast?city=${this.state.location}`;
            history.push(forecastPath)
        }
        this.setState({
            error: true
        });
    }

    render() {
        let { location } = this.state;
        let { match } = this.props;
        return (
            <div className="main-container" style={{backgroundColor: this.props.backgroundColor}}>
                <h2>Enter a City and State</h2>
                {this.state.error && <p style={{"alignSelf": "center"}}>Location not set</p>}
                <form className="form-main" onSubmit={this.handleSubmit}>
                    <input
                        className="form-inputs"
                        type='text'
                        onChange={this.handleChange}
                        value={location}/>
                    <button className="button" type="submit">Get Weather</button>
                </form>
            </div>
        );
    }
}

Main.propTypes = {
    backgroundColor: PropTypes.string.isRequired
}

Main.defaultProps = {
    backgroundColor: 'azure'
}

export default Main;