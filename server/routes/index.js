const router = require('express').Router();
const uniqid = require('uniqid');
let { messages, authors } = require('../stub/data');


router.get('/getMessages', (req, res, next) => {
	
	res.status(200).send(messages);
	
	// setTimeout(() => {
	// 	res.status(200).send(messages)
	// }, 500)
});

router.post('/addMessage', (req, res, next) => {
	const id = uniqid.time();
	const { author } = req.body.message;
	const existingAuthor = authors.find(item => item.name === author);
	
	if(existingAuthor) {
		existingAuthor.commentsID.push(id);
	} else {
		const newAuthor = {
			name: author,
			info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto beatae, cumque est expedita explicabo fuga incidunt iusto necessitatibus nihil omnis qui reiciendis voluptates. Accusamus adipisci commodi dolorem nisi non, provident quasi, quisquam, quod sapiente soluta temporibus tenetur. Aliquam aspernatur consequatur corporis culpa distinctio dolore doloremque eius eos eveniet, exercitationem hic id illo ipsa ipsam laborum, mollitia nam natus necessitatibus nisi odio pariatur quasi quia quidem quo sequi, soluta suscipit tenetur voluptate voluptatem voluptatum. Ducimus ex excepturi expedita, libero natus nisi quas sunt voluptates? Aperiam atque consequuntur, corporis culpa eius, est eum fugiat id nemo, quo quos veniam vitae voluptatum.',
			commentsID: [id]
		};
		
		authors.push(newAuthor);
	}
	
	const newMessage = {
		id,
		...req.body.message
	};
	
	messages.push(newMessage);
	
	res.status(200).send(messages)
	
	// setTimeout(() => {
	// 	res.status(200).send(messages)
	// }, 1000)
});

router.get('/getAuthor:authorName', (req, res, next) => {
	const authorName = req.params.authorName.slice(1);
	
	const author = authors.find(item => item.name === authorName);
	
	if(!author) res.status(404).send({errCode: '0001', errDescription: 'user not found'});
	
	const userMessages = [];
	
	author.commentsID.forEach(id => {
		messages.forEach(message => {
			if(id === message.id) {
				userMessages.push({
					text: message.text,
					date: message.date,
					id: message.id
				})
			}
		})
	});
	
	author.messages = userMessages;
	
	res.status(200).send(author);
	
	// setTimeout(() => {
	// 	res.status(200).send(author);
	// }, 500)
	
});

router.get('/removeMessage:id', (req, res, next) => {
	const messageId = req.params.id.slice(1);
	
	
	messages = messages.filter(message => message.id !== messageId);
	
	authors.forEach(author => {
		if(author.commentsID.includes(messageId)) {
			author.commentsID = author.commentsID.filter(item => item !== messageId)
		}
	});
	
	res.status(200).send(messages);
});

router.get('/changeUserData:id', (req, res, next) => {
	const messageId = req.params.id.slice(1);
	let user = {};
	
	messages = messages.filter(message => message.id !== messageId);
	
	authors.forEach(author => {
		if(author.commentsID.includes(messageId)) {
			author.commentsID = author.commentsID.filter(item => item !== messageId);
			
			user = {
				name: author.name,
				info: author.info,
				commentsID: author.commentsID,
				messages: []
			};
			
			author.commentsID.forEach(id => {
				messages.forEach(message => {
					if(id === message.id) {
						user.messages.push({
							text: message.text,
							date: message.date,
							id: message.id
						})
					}
				})
			});
		}
	});
	
	res.status(200).send(user);
});

module.exports = router;
