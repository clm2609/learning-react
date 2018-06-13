import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from '../../containers/Home/Home'
import Game from '../Game/Game'
import Search from '../../containers/Search/Search'

class Main extends Component {
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    render() {
        const RouteWithProps = ({ path, exact, strict, component:Component, location, ...rest }) => (
            <Route
              path={path}
              exact={exact}
              strict={strict}
              location={location}
              render={(props) => <Component {...props} {...rest} />}/>
          )
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/tictactoe' component={Game} />
                    <RouteWithProps path='/search'  component={Search} search={this.getParameterByName("search")}/>
          
                </Switch>
            </main>
        );
    }
}

export default Main;
