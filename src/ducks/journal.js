import axios from 'axios'
import { createSelector } from 'reselect'

/**
 * Constants
 **/
const START = '_START';
const SUCCESS = '_SUCCESS';
const FAIL = '_FAIL';

const ADD_MESSAGE = 'ADD_MESSAGE';
const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES';
const UPDATE_SEARCH_KEYWORD = 'UPDATE_SEARCH_KEYWORD';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

const Journal = axios.create({
	baseURL: '/api'
});


/**
 *  Selectors
 * */
export const stateSelector = (state) => state['journal'];
export const loadingSelector = createSelector(
	stateSelector,
	(state) => state.loading
);
export const messagesSelector = createSelector(
	stateSelector,
	(state) => state.messages
);



/**
 * Action creators
 **/
export function addMessage(message) {
	return dispatch => {
		dispatch({
			type: ADD_MESSAGE + START,
			payload: {
				loading: true
			}
		});
		
		Journal.post('/addMessage', { message })
			.then(response => {
				
				dispatch({
					type: ADD_MESSAGE + SUCCESS,
					payload: {
						loading: false,
						data: response.data
					}
				});
			})
			.catch(error => {
				dispatch({
					type: ADD_MESSAGE + FAIL,
					payload: {
						loading: false
					}
				});
			})
	}
}

export function getMessages() {
	return dispatch => {
		dispatch({
			type: GET_ALL_MESSAGES + START,
			payload: {
				loading: true
			}
		});
		
		Journal.get('/getMessages')
			.then(response => {
				
				dispatch({
					type: GET_ALL_MESSAGES + SUCCESS,
					payload: {
						loading: false,
						data: response.data
					}
				});
			})
			.catch(error => {
				dispatch({
					type: GET_ALL_MESSAGES + FAIL,
					payload: {
						loading: false
					}
				});
			})
	}
}

export function removeMessage(id) {
	return dispatch => {
		dispatch({
			type: REMOVE_MESSAGE + START,
			payload: {
				loading: true
			}
		});
		
		Journal.get(`/removeMessage:${id}`)
			.then(response => {
				
				dispatch({
					type: REMOVE_MESSAGE + SUCCESS,
					payload: {
						loading: false,
						data: response.data
					}
				});
			})
			.catch(error => {
				dispatch({
					type: REMOVE_MESSAGE + FAIL,
					payload: {
						loading: false
					}
				});
			})
	}
}

export const updateFilter = keyword => ({
	type: UPDATE_SEARCH_KEYWORD,
	payload: { keyword }
});

/**
 * Reducer
 **/
const initialState = {
	loading: false,
	messages: false
};
export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	
	switch (type) {
		case ADD_MESSAGE + START:
			return Object.assign({}, state, {
				loading: true
			});
		case ADD_MESSAGE + SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				messages: payload.data
			});
		case ADD_MESSAGE + FAIL:
			return Object.assign({}, state, {
				loading: false
			});
		case GET_ALL_MESSAGES + START:
			return Object.assign({}, state, {
				loading: true
			});
		case GET_ALL_MESSAGES + SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				messages: payload.data
			});
		case GET_ALL_MESSAGES + FAIL:
			return Object.assign({}, state, {
				loading: false
			});
		case REMOVE_MESSAGE + START:
			return Object.assign({}, state, {
				loading: true
			});
		case REMOVE_MESSAGE + SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				messages: payload.data
			});
		case REMOVE_MESSAGE + FAIL:
			return Object.assign({}, state, {
				loading: false
			});
		case UPDATE_SEARCH_KEYWORD:
			return Object.assign({}, state, {
				filter: payload.keyword
			});
		
			
		default:
			return state
	}
}
