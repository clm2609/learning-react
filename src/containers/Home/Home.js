import React, { Component } from 'react';
import './Home.css'
import { getSearchResults } from '../../store/home/reducer';
import { connect } from 'react-redux';
import { fetchHomePage } from '../../store/home/actions';
import {Images} from '../../components/Images/Images'
import ScrollButton from '../../components/ScrollButton/ScrollButton';

var hash = require('object-hash');

class Home extends Component {
    constructor(props) {
        super(props);
        this.load = this.load.bind(this);
        this.componentDidMount = this.load;
    }
    async load() {
        this.props.loadHomePage()
    }
    render() {
        
        return (
            <div>
            <div className="gridHome">
                {
                    this.props.searchResults.map(p => (
                        <Images key={hash(p)} track={p} />
                    ))
                }
            </div>
            <ScrollButton />
            </div>

        );
    }
}


function mapStateToProps(state) {
    return {
        searchResults: getSearchResults(state)
    }
}


function mapDispatchToProps(dispatch) {

    return ({
        loadHomePage() {
            dispatch(fetchHomePage())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
