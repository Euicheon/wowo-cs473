import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import Leaderboard from './Leaderboard';
import Chatbox from './ChatBox';
import './CrewPage.css';

var db = firebase.firestore();
// var user = firebase.auth().currentUser;

const styles = {
	background: {
		position: 'fixed',
		zIndex: '1',
		width: '100%',
		height: '600px',
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
	},
	popup: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'white',
		position: 'absolute',
		top: '20%',
		left: '30%',
		width: '40%',
		padding: '20px',
		borderRadius: '5px',
	},
};

// Set 'general' for real mode.
// Change chatRefType to 'test' for testing mode.
// const chatRefType = 'general' 


const CrewPage = (props) => {
	const [message, setMessage] = useState('');
	const [crew, setCrew] = useState(props.crew);
	const [crewList, setCrewList] = useState([]);
	const [chatRefType, setChatRefType] = useState('');
	const [showLeaderboard, setShowLeaderboard] = useState(false);
	const [crewdata, setCrewdata] = useState([]);
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
		// this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	const alertPopup = () => {
		alert("Selected crew is full now!")
	}

	const CrewItem = ({ item }) => (
		<article className='mini-card' onClick={() => item.availability ? crewSignUp(item.crewID) : alertPopup()}>
			<div>{item.crewID}</div>
			<div>{item.members.length} / {item.member_limit} </div>
		</article>
	);

	const CrewListUI = ({ list }) => (
		<>
			{list.map(item => (
				<CrewItem item={item}></CrewItem>
			))}
		</>
	);

	const toggleLeaderboard = () => {
		updateCrewdata(crew);
		// console.log("showLeaderboard", showLeaderboard);
	}

	const updateCrewdata = (crewid) => {
		const userRef = db.collection("users");
		var tempcrewdata = []
		db.collection("crews").doc('test').get()
			.then(function (doc) {
				const members = doc.data().members;
				members.forEach(function (uid) {
					userRef.doc(uid).get().then(e =>
						tempcrewdata.push({ username: e.data().username, points: e.data().points })
					)
				});
				setCrewdata(tempcrewdata);
				setShowLeaderboard(!showLeaderboard);
			}
			)
		// console.log('hihi', tempcrewdata);
	}
	// handleCrewItemClick = e => {
	// 	e.preventDefault();
	// 	crewSignUp(e.crewID)
	// }
	//리더보드를 팝업으로 구성 -> css에서 팝업 디자인으로 해주면 됨
	const LeaderboardPopup = (props) => (
		<div style={styles.background}>
			<div style={styles.popup}>
				<Leaderboard onSubmit={props.closePopup} crewdata={props.crewdata}></Leaderboard>
			</div>
		</div>
	);

	const crewSignUp = (crewID) => {
		//user의 crew 정보 업데이트
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

		var crewRef = db.collection("crews").doc(crewID);
		crewRef.update({
			members: firebase.firestore.FieldValue.arrayUnion(user.uid)
		})
		setCrew(crewID)
		setChatRefType(crewID)
	};

	// const getCrewList = () => {
	// 	var docRef = db.collection("crews");
	// 	docRef.get().then(function (querySnapshot) {
	// 		querySnapshot.forEach(function (doc) {
	// 			// doc.data() is never undefined for query doc snapshots
	// 			// console.log(doc.id, " => ", doc.data());
	// 			setCrewList(crewList.concat({ crewID: doc.data().crewid }))
	// 		});
	// 	});
	// };
	useEffect(() => {
		const getCrewList = async () => {
			var docRef = db.collection("crews");
			docRef.get().then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, " => ", doc.data());
					var availability = true;
					if(doc.data().member_limit === doc.data().members.length){
						availability = false
					}
					setCrewList(crewList => [...crewList,{ crewID: doc.data().crewid, member_limit: doc.data().member_limit ,members: doc.data().members, availability: availability}])
				});
			});
		};
		getCrewList();
		if (props.crew) {

			setChatRefType(props.crew)
			setCrew(props.crew)
		}
		// console.log('컴포넌트가 화면에 나타남', crew);
		return () => {
			// console.log('컴포넌트가 화면에서 사라짐');
		};
	},[]);
	// console.log("!@!",crewList);

	// console.log("??", props.crew, crew, props.user.uid, chatRefType)
	if ((props.crew || crew) && (!chatRefType)) {
		setChatRefType(props.crew)
	}
	return (
		<div className="home--container">
			{showLeaderboard &&
				<LeaderboardPopup
					closePopup={setShowLeaderboard}
					crewdata={crewdata}
				/>
			}
			{(props.user && (crew || props.crew)) &&
				<div className="allow-chat">
					<button onClick={toggleLeaderboard}>
						Go to Leaderboard
					</button>
					<Chatbox chatRefType={chatRefType} currentUserName={props.user.displayName} />
					<form className="send-chat" onSubmit={handleSubmit}>
						<input type="text" name="message" id="message" value={message} onChange={handleChange} placeholder='Leave a message...' />
					</form>
				</div>
			}
			{(props.user && !(crew || props.crew)) &&
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
