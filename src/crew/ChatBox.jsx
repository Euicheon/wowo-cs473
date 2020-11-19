import React from 'react';
import firebase from '../firebase';

class Chatbox extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			chats: []
		}
	}

	componentDidMount(){
		const chatRef = firebase.database().ref(this.props.chatRefType);
		chatRef.on('value', snapshot => {
			const getChats = snapshot.val();
			let ascChats = [];
			for(let chat in getChats){
				if(getChats[chat].message !== ''){
					ascChats.push({
						id: chat,
						message: getChats[chat].message,
						user: getChats[chat].user,
						date: getChats[chat].timestamp
					});
				}
			}
			const chats = ascChats.reverse();
			this.setState({chats});
		});
	}

	render(){
		return(
			<div className="chatbox">
				<ul className='chat-list'>
					{this.state.chats.map(chat => {
						const postDate = new Date(chat.date);
						return(
							<li key={chat.id}>
								<em>{postDate.getDate() + '/' + (postDate.getMonth()+1)}</em>
								<strong>{chat.user}:</strong> 
								{chat.message}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default Chatbox;