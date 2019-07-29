import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import MainLayout from './layouts/mainLayout'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

class Root extends Component {
	render() {
		return (
			<Provider store={ store }>
				<BrowserRouter>
					<Switch>
						<Route path={'/'} component={ MainLayout } />
					</Switch>
				</BrowserRouter>
			</Provider>
		)
	}
}

export default Root;
