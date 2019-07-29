import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

class JournalMenu extends Component {
	
	render() {
		const { match } = this.props;
		
		return (
			<section className='Journal-menu'>
				<div className="add-btn">
					<Link to={`${match.url}/add`}>ADD MESSAGE</Link>
				</div>
			</section>
		);
	}
}

export default JournalMenu;
