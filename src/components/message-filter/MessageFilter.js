import React from 'react'
import './index.sass'

const MessageFilter = (props) => {
	const { onChange } = props;
	
	return (
		<section className='Message-filter'>
			<input className='filter-field'
			       type="text"
			       placeholder={'Search'}
			       onChange={onChange} />
		</section>
	);
};

export default MessageFilter;
