import React from 'react';

class Header extends React.Component {

    render() {
        return (
            <div className="header-container">
                <span className="title">Weather Lore</span>
                <div className="form-controls">
                    <input className="header-inputs" type="text"/>
                    <button className="button">Get Weather</button>
                </div>
            </div>
        );
    }
}

export default Header;