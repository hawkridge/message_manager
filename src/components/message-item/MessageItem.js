import React from 'react'
import { NavLink } from "react-router-dom"
import { parseDate, parseTime, getPrettyDate } from '../../utils/index'
import './index.sass'

function MessageItem(props) {
	const { removeMessage } = props;
	
	return (
		<div className='Message-list-item'>
			{ getTemplate(props) }
			
			<div className='remove-btn' onClick={removeMessage}>remove</div>
		</div>
	)
}

function getTemplate(props) {
	const { type } = props;
	const { author, date, text } = props.message;
	
	const commonTemplate = <>
		<div className="avatar">
			<div className="user-image">
				<span>
					{ author ? author[0].toUpperCase() : 'G' }
				</span>
			</div>
		</div>
		
		<div className="message-body">
			<div className='author' >
				<NavLink to={`/info/:${author}`} > { author } </NavLink>
			</div>
			
			<div className='date-block'>
				<span className='date'>{ parseDate(date) }</span>
				<span> at </span>
				<span className='time'>{ parseTime(date) }</span>
			</div>
			
			<div className="content">
				{ text }
			</div>
		</div>
	</>;
	
	const authorTemplate = <>
			<header className='date-block'>
				<span className='date'> { getPrettyDate(date) } </span>
			</header>
			<div className="content">
				{ text }
			</div>
		</>;
	
	const templatesMap = {
		'common': commonTemplate,
		'author': authorTemplate
	};
	
	return templatesMap[type]
}

export default MessageItem;
