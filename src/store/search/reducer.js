// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

// import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const BASERESULTNUM = 20

const initialState = Immutable({
    searchResults: [],
    numResults: BASERESULTNUM,
    showedResults: [],
    searchDone: false
});
export default function reduce(state = initialState, action = {}) {

    switch (action.type) {
        case types.TRACKS_FETCHED:
            return state.merge({
                searchResults: action.searchResults.results,
                showedResults: showableResults(action.searchResults.results, state.numResults),
                searchDone: true
            });
        case types.MORE_RESULTS:
            let moreResults = state.numResults + BASERESULTNUM
            return state.merge({
                numResults: moreResults,
                showedResults: showableResults(state.searchResults, moreResults),

            });
        case types.LESS_RESULTS:
            let lessResults = state.numResults - BASERESULTNUM
            return state.merge({
                numResults: lessResults,
                showedResults: showableResults(state.searchResults, lessResults),

            });
        default:
            return state;
    }
}

//selectors

export function getSearchResults(state) {
    return state.search.searchResults;
}
export function getNumResults(state) {
    return state.search.numResults;
}
export function getShowedResults(state) {
    return state.search.showedResults;
}
export function getSearchDone(state) {
    return state.search.searchDone;
}

function showableResults(results, numResults) {
    return results.slice(0,numResults)
}