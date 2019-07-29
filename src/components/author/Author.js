import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAuthor, authorSelector, loadingSelector } from '../../ducks/info'
import { updateAuthorData } from '../../ducks/info'
import MessageList from '../message-list/MessageList'
import Preloader from "../preloader/Preloader"
import './index.sass'

class Author extends Component {
	componentDidMount() {
		const { getAuthor } = this.props;
		const { params } = this.props.match;
		
		getAuthor(params);
	}
	
	goBack = ev => {
		ev.stopPropagation();
		
		const { goBack } = this.props.history;
		goBack();
	};
	
	removeMessage = (id) => ev => {
		const { updateAuthorData } = this.props;
		
		updateAuthorData(id);
	};
	
	
	render() {
		const { author, loading, match } = this.props;
		
		if(loading) return <Preloader />;
		
		return (
			<section className='Author'>
				<header>
					<div className="arrow arrow-left" onClick={this.goBack}></div>
					<h4 className="author-name">
						{ author.name }
					</h4>
				</header>
				
				<section className="author-info">
					<div className="info">
						{ author.info }
					</div>
					
					<div className="comments">
						<h4 className='comments-header'>Messages</h4>
						<MessageList
							messages={author.messages}
							type={'author'}
							loading={loading}
							match={match}
							removeMessage={ this.removeMessage }/>
					</div>
				</section>
				
			</section>
		);
	}
}

const mapStateToProps = state => ({
	loading: loadingSelector(state),
	author: authorSelector(state)
});

export default connect(mapStateToProps, {
	getAuthor,
	updateAuthorData
})(Author);
