import React from 'react';
import { Link } from 'react-router-dom';
import History from './History';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnChange(evt) {
        this.setState({
            city: evt.target.value
        });
    }

    handleOnClick() {
        if (this.state.city !== "") {
           History.push({
                pathname: '/forecast',
                search: `?city=${this.state.city}`
            });
            this.setState({
                city: ""
            });
        }
    }

    render() {
        return (
            <div className="header-container">
                <Link to="/"><span className="title">Weather Lore</span></Link>
                <div className="form-controls">
                    <input 
                        className="header-inputs"
                        type="text"
                        placeholder="plano, texas"
                        value={this.state.city}
                        onChange={this.handleOnChange}
                        />
                    <button 
                        className="button"
                        onClick={this.handleOnClick}
                        >Get Weather</button>
                </div>
            </div>
        );
    }
}

export default Header;