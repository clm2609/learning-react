import React, { Component } from 'react';
import './App.css';
import SongAPI from '../api'
import { Link } from 'react-router-dom'



class Song extends Component {
    render() {
        const song = SongAPI.get(
            parseInt(this.props.match.params.number, 10)
        )
        if (!song) {
            return <div>Sorry, but the song was not found</div>
        }
        return (
            <div>
                <h1>{song.trackName}</h1>
                <h2>Artist: {song.artistName}</h2>
                <Link to='/RHCP'>Back</Link>
            </div>
        )
    }
}

export default Song;


//https://itunes.apple.com/search?term=red+hot+chili+peppers&entity=song&limit=10