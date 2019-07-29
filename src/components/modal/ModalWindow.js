import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'

class ModalWindow extends Component {
	
	goBack = ev => {
		ev.stopPropagation();
		
		const { goBack } = this.props.history;
		
		goBack();
	};
	
	render() {
		const { Component } = this.props;
		
		return (
			<section className='Modal'>
				<div className='modal-background'>
					<div className='modal-position'>
						<Component />
						
						<div className="close-btn" onClick={this.goBack}>Close</div>
					</div>
				</div>
			</section>
		);
	}
}

export default withRouter(ModalWindow);
