import React from 'react';
import PropTypes from 'prop-types';

class Main extends React.Component {
    render() {
        return (
            <div className="main-container" style={{backgroundColor: this.props.backgroundColor}}>
                <h2>Enter a City and State</h2>
                <input className="form-inputs" type='text'/>
                <button className="button">Get Weather</button>
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