import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Author from "../components/author/Author"
import './index.sass'

class InfoPage extends Component {
	render() {
		const { match } = this.props;
		
		return (
			<section className='Info-page'>
				<Route path={`${match.path}`} component={ Author } />
			</section>
		);
	}
}

export default InfoPage;
