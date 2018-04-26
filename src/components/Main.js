import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './Home'
import Game from './Game'
import Search from './Search'

class Main extends Component {
    
    render() {

        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/tictactoe' component={Game} />
                    <Route path='/search' component={Search} />

                </Switch>
            </main>
        );
    }
}

export default Main;
