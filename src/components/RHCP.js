import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import BestSongs from './BestSongs'
import Song from './Song'

import './App.css';

class RHCP extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/rhcp' component={BestSongs} />
                <Route path='/rhcp/:number' component={Song} />
            </Switch>
        );
    }
}

export default RHCP;


//https://itunes.apple.com/search?term=red+hot+chili+peppers&entity=song&limit=10