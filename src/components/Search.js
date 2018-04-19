import React, { Component } from 'react';
import { TrackResult, ArtistResult } from './Results';
import ScrollButton from './ScrollButton';
import {
    Container, Col, Row, Button
} from 'reactstrap';
var hash = require('object-hash');
class Search extends Component {
    constructor(props) {
        super(props);
        this.showMore = this.showMore.bind(this);
        this.showLess = this.showLess.bind(this);

        this.state = {
            searchResults: [],
            numResults: 20,
            showedResults: [[]]
        };
    }
    componentDidMount() {
        var query = this.getUrlParams(this.props.location.search);
        fetch('https://itunes.apple.com/search?term=' + query.search + '&limit=200').then((response) => {
            return response.json()
        }).then((recurso) => {
            this.setState({ searchResults: recurso.results }, () => (this.showableResults()))

        })
    }

    showableResults() {
        var results = this.state.searchResults
        var transformed = []
        var len = this.state.numResults
        var tam = Math.ceil(len / 4)
        for (var i = 0; i < tam; i++) {
            var aux = []
            for (var j = 0; j < 4; j++) {
                if ((i * 4 + j) < len) {
                    aux.push(results[i * 4 + j])
                }
            }
            transformed.push(aux)
        }
        this.setState({ showedResults: transformed })
    }
    getUrlParams(search) {
        let hashes = search.slice(search.indexOf('?') + 1).split('&')
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=')
            return Object.assign(params, { [key]: decodeURIComponent(val) })
        }, {})
    }
    showMore() {
        if (this.state.numResults < 200) {
            this.setState((prevState, props) => ({
                numResults: prevState.numResults + 20
            }),()=>(this.showableResults()));
        }
    }
    showLess() {
        if (this.state.numResults > 20) {
            this.setState((prevState, props) => ({
                numResults: prevState.numResults - 20
            }),()=>(this.showableResults()));
        }
    }

    render() {
        const marginRow = {
            marginTop: '1rem'
        }
        const marginButton = {
            marginBottom: '1rem'
        }
        return (
            <div>
                <Container>
                    {

                        this.state.showedResults.map(p => (
                            <Row style={marginRow} className="table" key={hash(p)}>
                                {p.map(o => (
                                    <Col md="3" className="cell" key={hash(o)}>
                                        {o.wrapperType === 'track' &&
                                            <TrackResult className="cell" track={o} />
                                        }
                                        {o.wrapperType === 'artist' &&
                                            <ArtistResult artist={o} />
                                        }
                                    </Col>
                                ))}
                            </Row>
                        ))
                    }
                    <Row style={marginRow}>
                        <Col sm="3"> </Col>
                        <Col sm="3" style={marginButton}>
                            <Button onClick={this.showMore}>Mostrar mas</Button>
                        </Col>
                        <Col sm="3" style={marginButton}>
                            <Button onClick={this.showLess}>Mostrar menos</Button>
                        </Col>
                        <Col sm="3"> </Col>

                    </Row>
                </Container>
                <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>

            </div>
        );
    }
}

export default Search;