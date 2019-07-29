import axios from 'axios'
import { createSelector } from 'reselect'

/**
 * Constants
 **/
const START = '_START';
const SUCCESS = '_SUCCESS';
const FAIL = '_FAIL';

const GET_AUTHOR = 'ADD_MESSAGE';
const REMOVE_AUTHOR_MESSAGE = 'REMOVE_AUTHOR_MESSAGE';

const Info = axios.create({
	baseURL: '/api'
});

/**
 *  Selectors
 * */
export const stateSelector = (state) => state['info'];
export const loadingSelector = createSelector(
	stateSelector,
	(state) => state.loading
);
export const authorSelector = createSelector(
	stateSelector,
	(state) => state.author
);
export const messagesSelector = createSelector(
	stateSelector,
	authorSelector,
	(author) => Object.values(author.messages)
);

/**
 * Action creators
 **/
export function getAuthor(params) {
	
	return dispatch => {
		dispatch({
			type: GET_AUTHOR + START,
			payload: {
				loading: true
			}
		});
		
		Info.get(`/getAuthor${params.authorName}`)
			.then(response => {
				
				dispatch({
					type: GET_AUTHOR + SUCCESS,
					payload: {
						loading: false,
						data: response.data
					}
				});
			})
			.catch(error => {
				dispatch({
					type: GET_AUTHOR + FAIL,
					payload: {
						loading: false
					}
				});
			})
	}
}

export function updateAuthorData(id) {
	
	return dispatch => {
		dispatch({
			type: REMOVE_AUTHOR_MESSAGE + START,
			payload: {
				loading: true
			}
		});
		
		Info.get(`/changeUserData:${id}`)
			.then(response => {
				
				dispatch({
					type: REMOVE_AUTHOR_MESSAGE + SUCCESS,
					payload: {
						loading: false,
						data: response.data
					}
				});
			})
			.catch(error => {
				dispatch({
					type: REMOVE_AUTHOR_MESSAGE + FAIL,
					payload: {
						loading: false
					}
				});
			})
	}
}


/**
 * Reducer
 **/
const initialState = {
	loading: false,
	author: false
};
export default function reducer(state = initialState, action) {
	const { type, payload } = action;
	
	switch (type) {
		case GET_AUTHOR + START:
			return Object.assign({}, state, {
				loading: true
			});
		case GET_AUTHOR + SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				author: payload.data
			});
		case GET_AUTHOR + FAIL:
			return Object.assign({}, state, {
				loading: false
			});
		case REMOVE_AUTHOR_MESSAGE + START:
			return Object.assign({}, state, {
				loading: true
			});
		case REMOVE_AUTHOR_MESSAGE + SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				author: payload.data
			});
		case REMOVE_AUTHOR_MESSAGE + FAIL:
			return Object.assign({}, state, {
				loading: false
			});
		
		default:
			return state
	}
}
