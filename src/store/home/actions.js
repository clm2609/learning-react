// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

// import _ from 'lodash';
import * as types from './actionTypes';
import itunesService from '../../services/itunes';

export function fetchHomePage(){
    return async(dispatch, getState) => {
        try {
            const searchResults = await itunesService.getHomePage();
            dispatch({type: types.HOME_FETCHED, searchResults});
        } catch (error) {
          console.error(error);
        }
      };
}