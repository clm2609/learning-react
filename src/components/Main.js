import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './Home'
import RHCP from './RHCP'
import Search from './Search'

class Main extends Component {
    
    render() {

        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/rhcp' component={RHCP} />
                    <Route path='/search' component={Search} />

                </Switch>
            </main>
        );
    }
}

export default Main;
