import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../../ducks/journal'
import { withRouter } from 'react-router-dom'
import './index.sass'

class MessageAddForm extends Component {
	constructor() {
		super();
		this._maxSymbolsAmount = 120;
	}
	
	state = {
		author: '',
		text: ''
	};
	
	handleChange = fieldName => ev => {
		if(ev.target.value.length - 1 >= this._maxSymbolsAmount) return;
		
		this.setState({
			[fieldName]: ev.target.value
		})
	};
	
	handleSubmit = ev => {
		ev.preventDefault();
	
		const { addMessage } = this.props;
		const { goBack } = this.props.history;
		const message = this.state;
		
		message.date = new Date();
		
		addMessage(message);
		
		goBack();
	};

	render() {
		return (
			<section className='Message-add-form'>
				<form onSubmit={this.handleSubmit} id={'form'} ref={this.el}>
					<input
						type="text"
						required={true}
						placeholder={'Your name'}
						value={this.state.author}
						onChange={this.handleChange('author')}
						className='new-author-field'
						maxLength={30}/>
					
					<div className='textarea-box'>
						<textarea
							required={true}
							placeholder={'Message text'}
							value={this.state.text}
							onChange={this.handleChange('text')}
							className='new-message-field' />
						
						<span className='counter'>{ this.state.text.length } / { this._maxSymbolsAmount }</span>
					</div>
					
					<input
						type="submit"
						value={'ADD'}
						className='new-message-add-btn'/>
				</form>
			</section>
		);
	}
}

export default withRouter(connect(null, {
	addMessage
})(MessageAddForm));
