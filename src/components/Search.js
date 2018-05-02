import React, { Component } from 'react';
import { TrackResult, ArtistResult } from './Results';
import ScrollButton from './ScrollButton';
import {
    Container, Col, Row, Button, Alert
} from 'reactstrap';
var hash = require('object-hash');
class Search extends Component {
    constructor(props) {
        super(props);
        this.showMore = this.showMore.bind(this);
        this.showLess = this.showLess.bind(this);
        this.search = this.search.bind(this);
        this.componentDidMount = this.search;
        this.componentWillReceiveProps = this.search;

        this.state = {
            searchResults: [],
            numResults: 20,
            showedResults: [[]],
            searchDone: false
        };
    }
    search() {
        var query = this.props.search
        fetch('https://itunes.apple.com/search?term=' + query + '&limit=200').then((response) => {
            return response.json()
        }).then((recurso) => {
            this.setState({ searchResults: recurso.results, searchDone: true }, () => (this.showableResults()))

        })
    }

    showableResults() {
        var results = this.state.searchResults
        var transformed = []
        var len = Math.min(this.state.numResults, results.length)
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
        this.setState((prevState, props) => ({
            numResults: prevState.numResults + 20
        }), () => (this.showableResults()));

    }
    showLess() {
        this.setState((prevState, props) => ({
            numResults: prevState.numResults - 20
        }), () => (this.showableResults()));

    }

    render() {
        const marginRow = {
            marginTop: '1rem'
        }
        const marginButton = {
            marginBottom: '1rem'
        }
        const noResults = () => {
            if (this.state.searchResults.length === 0) {
                return (
                    this.state.searchDone && <Alert color="danger" className="noresultalert">La busqueda {this.getUrlParams(this.props.location.search).search} no obtuvo resultados </Alert>
                )
            }
        }
        const buttonMore = () => {
            if (this.state.numResults < Math.min(200, this.state.searchResults.length)) {

                return <Button onClick={this.showMore}>Mostrar mas</Button>
            }
        }
        const buttonLess = () => {
            if (this.state.numResults > 20) {
                return <Button onClick={this.showLess}>Mostrar menos</Button>

            }
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
                    {
                        noResults()
                    }
                    <Row style={marginRow}>
                        <Col sm="3"> </Col>
                        <Col sm="3" style={marginButton}>
                            {buttonMore()}
                        </Col>
                        <Col sm="3" style={marginButton}>
                            {buttonLess()}
                        </Col>
                        <Col sm="3"> </Col>

                    </Row>
                </Container>
                <ScrollButton/>

            </div>
        );
    }
}

export default Search;