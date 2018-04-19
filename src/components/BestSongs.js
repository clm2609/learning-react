import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import SongAPI from '../api'


class BestSongs extends Component {
    render() {
        return (
            <div>
                <p>RHCP best songs</p>
                <ul>
                    {
                        SongAPI.all().map(p => (
                            <li key={p.trackId}>
                            <Link to={`/rhcp/${p.trackId}`}>{p.trackName}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default BestSongs;