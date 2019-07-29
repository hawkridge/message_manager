import React, { Component } from 'react'
import InfoPage from '../pages/infoPage'
import JournalPage from '../pages/journalPage'
import { Route, Switch, Redirect } from 'react-router-dom'

class MainLayout extends Component {
	render() {
		return (
			<section className='Main-layout'>
				<div className="container">
					<Switch>
						<Route path={'/journal'} component={ JournalPage } />
						<Route path={'/info/:authorName'} component={ InfoPage } />
						<Redirect to={'/journal'} />
					</Switch>
				</div>
			</section>
		);
	}
}

export default MainLayout;
