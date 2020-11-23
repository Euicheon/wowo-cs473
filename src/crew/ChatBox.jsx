import React from 'react';
import firebase from '../firebase';

import './ChatBox.css';

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
						date: getChats[chat].timestamp,
						isMe: getChats[chat].user === this.props.currentUserName,
					});
				}
			}
			const chats = ascChats;
			this.setState({chats});
		});
	}

	render(){
		return(
			<div className="chatbox" style={{height: '450px', overflow: 'auto'}}>
				<ul className='chat-list'>
					{this.state.chats.map(chat => {
						const postDate = new Date(chat.date);
						return(
							<li key={chat.id}>
								<div className={chat.isMe ? "mymsg" : "othermsg"}>
									{chat.message}
								</div>
								{/* <em>{postDate.getDate() + '/' + (postDate.getMonth()+1)}</em>
								<strong>{chat.user}:</strong> 
								{chat.message} */}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default Chatbox;