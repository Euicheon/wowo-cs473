import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

const Leaderboard = (props) => {

    var data = props.crewdata;
    if(!data){
        data.sort(function(a,b){
            return a.point > b.point
        });
    }


    const LeaderboardUI = ({ dataList }) => (
		<ul>
			{dataList.map(item => (
				<LeaderboardItem item={item}></LeaderboardItem>
			))}
		</ul>
    );
	const LeaderboardItem = ({ item }) => (
		<li>
			<div>{item.name}</div>
		</li>
	);

    return (
        <div className='leaderboard'>
            {!data &&
                <LeaderboardUI dataList={data}>

                </LeaderboardUI>       
            }
        </div>
    );
}

export default Leaderboard;