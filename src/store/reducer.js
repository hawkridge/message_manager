import { combineReducers } from 'redux'
import messageReducer from '../ducks/journal'
import infoReducer from '../ducks/info'

export default combineReducers({
	journal: messageReducer,
	info: infoReducer
})
