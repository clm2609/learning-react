import React, { Component } from 'react';
import { TrackResult, ArtistResult } from '../../components/Results/Results';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import {
    Button, Alert
} from 'reactstrap';
import './Search.css'
import { connect } from 'react-redux';
import { fetchSearchResults, showMoreResults, showLessResults } from '../../store/search/actions';
import * as searchSelectors from '../../store/search/reducer';

var hash = require('object-hash');
class Search extends Component {
    constructor(props) {
        super(props);
        this.showMore = this.showMore.bind(this);
        this.showLess = this.showLess.bind(this);
        this.search = this.search.bind(this);
        this.componentDidMount = this.search;
    }
    async search() {
        this.props.loadSearchResults(this.props.search)
    }
    showMore() {
        this.props.showMoreResults()
    }
    showLess() {
        this.props.showLessResults()
    }
    renderLoading() {
        return (
            <p>Loading...</p>
        );
    }
    render() {
        if (!this.props.showedResults) return this.renderLoading();

        const noResults = () => {
            if (this.props.searchResults.length === 0) {
                return (
                    this.props.searchDone && <Alert color="danger" className="noresultalert">La busqueda {this.getUrlParams(this.props.location.search).search} no obtuvo resultados </Alert>
                )
            }
        }
        const buttonMore = () => {
            if (this.props.numResults < Math.min(200, this.props.searchResults.length)) {
                return <Button onClick={this.showMore}>Mostrar mas</Button>
            }
        }
        const buttonLess = () => {
            if (this.props.numResults > 20) {
                return <Button onClick={this.showLess}>Mostrar menos</Button>

            }
        }
        return (
            <div>
                <div>
                    <div className="gridResults cell">
                        {
                            this.props.showedResults.map(p => (
                                <div key={hash(p)}>
                                    {p.wrapperType === 'track' && <TrackResult className="cell" track={p} />}
                                    {p.wrapperType === 'artist' && <ArtistResult artist={p} />}
                                </div>
                            ))
                        }
                    </div>
                    {
                        noResults()
                    }
                    <div className="gridButtons showMoreSearchButtons">
                            <div className="buttonMore">{buttonMore()}</div>
                            <div className="buttonLess">{buttonLess()}</div>
                    </div>
                </div>
                <ScrollButton />

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        searchResults: searchSelectors.getSearchResults(state),
        numResults: searchSelectors.getNumResults(state),
        searchDone: searchSelectors.getSearchDone(state),
        showedResults: searchSelectors.getShowedResults(state)
    }
}


function mapDispatchToProps(dispatch) {

    return ({
        loadSearchResults(query) {
            dispatch(fetchSearchResults(query))
        },
        showMoreResults() {
            dispatch(showMoreResults())
        },
        showLessResults() {
            dispatch(showLessResults())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);