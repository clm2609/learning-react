import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { RHCP: [] };
    }
    componentDidMount() {
        fetch('https://itunes.apple.com/search?term=red+hot+chili+peppers&entity=song&limit=10').then((response) => {
            return response.json()
        }).then((recurso) => {
            this.setState({ RHCP: recurso.results })
        })
    }
    render() {
        return (
            <ul>
                {
                    this.state.RHCP.map(p => (
                        <li key={p.trackId}>
                            <Link to={`/rhcp/${p.trackId}`}>{p.trackName}</Link>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default Home;
