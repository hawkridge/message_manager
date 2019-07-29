import React from 'react'
import MessageItem from "../message-item/MessageItem"
import Preloader from "../preloader/Preloader"
import NoContent from '../no-content/NoContent'
import { generateID, sortByDate } from '../../utils/index'
import './index.sass'

const MessageList = props => {
	let { messages, type, match, loading, filter, removeMessage } = props;
	let messageItems = [];
	
	if(filter) {
		const lowercasedFilter = filter.toLowerCase();
		messages = messages.filter(item => {
			return Object.keys(item).some(key =>
				key !== 'id' && item[key].toLowerCase().includes(lowercasedFilter)
			);
		});
	}
	
	if(messages && messages.length) {
		
		messages.sort(sortByDate);
		
		messageItems = messages.map(item => (
			<li key={ generateID() }>
				<MessageItem message={item} match={match} type={type} removeMessage={removeMessage(item.id)}/>
			</li>))
	}
	
	if(loading) return <Preloader />;
	
	if(messages && !messages.length && !loading) return <NoContent />;
	
	return (
		<section className='Message-list'>
			{ messageItems }
		</section>
	);
};

export default MessageList;
