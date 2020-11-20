import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

import Chatbox from './ChatBox';
import './CrewPage.css';

var db = firebase.firestore();
var user = firebase.auth().currentUser;

const styles = {
	align: {
		backgroundColor: 'skyblue',
		textAlign: 'center',
		height: '650px',
		width: '400px',
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
};

// Set 'general' for real mode.
// Change chatRefType to 'test' for testing mode.
// const chatRefType = 'general' 


const CrewPage = (props) => {
	const [message, setMessage] = useState('');
	const [crew, setCrew] = useState(props.crew);
	const [crewList, setCrewList] = useState([]);
	const [chatRefType, setchatRefType] = useState('');


	const handleChange = e => {
		setMessage(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault();
		if (message !== '') {
			const chatRef = firebase.database().ref(chatRefType);
			const chat = {
				message: message,
				user: props.user.displayName,
				timestamp: new Date().getTime()
			}

			chatRef.push(chat);
			setMessage('');
		}
	}

	const CrewItem = ({ item }) => (
		<li>
			<div>{item.crewID}</div>
			<button onClick={() => crewSignUp(item.crewID)}>JOIN</button>
		</li>
	);

	const CrewListUI = ({ list }) => (
		<ul>
			{list.map(item => (
				<CrewItem item={item}></CrewItem>
			))}
		</ul>
	);

	// handleCrewItemClick = e => {
	// 	e.preventDefault();
	// 	crewSignUp(e.crewID)
	// }

	const crewSignUp = (crewID) => {
		//user의 crew 정보 업데이
		const user = firebase.auth().currentUser;

		db.collection("users").doc(user.uid).update({
			crew: crewID
		})
			.then(function () {
				console.log("Document updated");
			})
			.catch(function (error) {
				console.error("Error adding document: ", error);
			});

		setCrew(crewID)
		setchatRefType(crewID)
	};

	const getCrewList = () => {
		var docRef = db.collection("crews");
		docRef.get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
				setCrewList(crewList.concat({ crewID: doc.data().crewid }))
			});
		});
	};
	useEffect(() => {
		getCrewList();
		if(props.crew){
			setchatRefType(props.crew)
			setCrew(props.crew)
		}
		console.log('컴포넌트가 화면에 나타남', crew);
		return () => {
		  console.log('컴포넌트가 화면에서 사라짐');
		};
	  }, []);
	console.log("??",props.crew, crew, props.user.uid,chatRefType)
	if((props.crew||crew)&&(!chatRefType)){
		setchatRefType(props.crew)
	}
	return (
		<div className="home--container">
			<h1>Welcome to the chat!</h1>
			{props.user && crew||props.crew &&
				<div className="allow-chat">
					<form className="send-chat" onSubmit={handleSubmit}>
						<input type="text" name="message" id="message" value={message} onChange={handleChange} placeholder='Leave a message...' />
					</form>

					<Chatbox chatRefType={chatRefType} />
				</div>
			}
			{props.user && !(crew||props.crew) &&
				<div className="disallow-chat">
					<CrewListUI list={crewList}></CrewListUI>
				</div>
			}
			{!props.user &&
				<div className="disallow-chat">
					<p><Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start chatting!</p>
				</div>
			}
		</div>
	);
}

export default CrewPage;