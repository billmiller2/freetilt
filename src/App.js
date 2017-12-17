import React, { Component } from 'react';
import './App.css'
import { NavBar } from './Nav.jsx'
import { Main } from './Main'

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <Main />
            </div>
        );
    }
}

export default App;
