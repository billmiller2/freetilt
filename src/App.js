import React, { Component } from 'react';
import './App.css'
import { Main } from './Main'
import freetilt from './images/freetilt.jpg'

class App extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <img
                        height="25%"
                        width="25%"
                        src={freetilt}
                        alt="freetilt" />
                </div>
                <Main />
            </div>
        )
    }
}

export default App;
