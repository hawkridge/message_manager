import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from "react-redux"
import MessageList from "../components/message-list/MessageList"
import JournalMenu from "../components/journal-menu/JournalMenu"
import ModalWindow from "../components/modal/ModalWindow"
import MessageAddForm from "../components/message-add-form/MessageAddForm"
import MessageFilter from "../components/message-filter/MessageFilter"
import { getMessages, removeMessage, loadingSelector, messagesSelector } from "../ducks/journal"
import './index.sass'

class JournalPage extends Component {
	state = {
		filter: ''
	};
	
	updateMessageFilter = ev => {
		this.setState({
			filter: ev.target.value
		})
	};
	
	removeMessage = id => ev => {
		const { removeMessage } = this.props;
		removeMessage(id);
	};
	
	componentDidMount() {
		const { getMessages } = this.props;
		getMessages();
	};
	
	render() {
		const { messages, loading, match } = this.props;
		
		return (
			<section className='Journal-page'>
				<header className="journal-header">
					<Route path={`${match.path}`} component={ JournalMenu } />
					<Route path={`${match.path}`} render={() => (
						<MessageFilter
							onChange={this.updateMessageFilter} /> )}
					/>
				</header>
				<Route path={`${match.path}`} render={() => (
					<MessageList
						messages={messages}
						type={'common'}
						loading={loading}
						match={match}
						filter={this.state.filter}
						removeMessage={ this.removeMessage }/> )}
				/>
				<Route path={`${match.path}/add`} render={ () =>
					<ModalWindow Component={ MessageAddForm } /> }
				/>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: loadingSelector(state),
	messages: messagesSelector(state)
});

export default connect(mapStateToProps, {
	getMessages,
	removeMessage,
	messagesSelector,
	loadingSelector
})(JournalPage);
