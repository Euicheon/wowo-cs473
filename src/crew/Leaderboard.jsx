import React, { useEffect, useState } from 'react';

const Leaderboard = (props) => {
    var data = props.crewdata;
    const [sdata, setSdata] = useState(null);
    useEffect(() => {
        setTimeout(() => {
            data.sort(function (a, b) {
                return a.points < b.points
            });
            setSdata(data);
        }, 300);
    }, [setSdata,data]);
    // console.log("!data is :", sdata);

    return (
        <div className='leaderboard'>
            {sdata &&
                <>
                    <ul>
                        {sdata.map(item => (
                            <li key={item.username}>
                                <div>{item.username} : {item.points}</div>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => props.onSubmit(false)}>Close</button>
                </>
            }
        </div>
    );
}

export default Leaderboard;