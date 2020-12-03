import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const styles = {
  recordTitle: {
    marginRight: '50%',
    marginTop: '10px',
    marginBottom: '10px'
  },
}

const CalendarRecord = () => {
  const [date, setDate] = useState(new Date());
  const [record, setRecord] = useState([]);
  const [durationRecord, setDurationRecord] = useState([]);
  const [isRecord, setIsRecord] = useState(false);

  const formattedDuration = (h, m, s) => {
    var duration = s + " sec";
    if (h === 0 && m === 0) {
      return duration
    }
    if (h === 0) {
      return m + " min " + duration
    }
    return h + " hour " + m + " min " + duration
  }

  useEffect(() => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    if (record.length === 0) {
      db.collection("users").doc(user.uid).get()
        .then((doc) => {
          var durRec = [];
          var isRec = false;
          
          setRecord(doc.data().workoutHistory);
          console.log(doc.data().workoutHistory);

          doc.data().workoutHistory.forEach(({ timestamp, duration }) => {
            const clickedDate = new Date(timestamp)
            if (clickedDate.toDateString() === date.toDateString()) {
              isRec = true;
              durRec.push(duration)
            }
          })
          setDurationRecord(durRec);
          setIsRecord(isRec)
        })
        .catch(function (error) {
          console.error("Error getting document: ", error);
        });
    }
  }, [record])

  const onClick = (value, event) => {
    var durationRecord = []
    setIsRecord(false)
    record.forEach(({ timestamp, duration }) => {
      const clickedDate = new Date(timestamp)
      if (clickedDate.toDateString() === value.toDateString()) {
        setIsRecord(true);
        durationRecord.push(duration)
      }
    })
    setDurationRecord(durationRecord);
  }

  return (
    <>
      <Calendar
        onChange={setDate}
        onClickDay={onClick}
        value={date}
      />
      <p style={styles.recordTitle}>Your Workout Record</p>
      {setIsRecord &&
      durationRecord.map(duration => {
        const dh = parseInt(duration / 1000 / 60 / 60);
        const dm = parseInt(duration / 1000 / 60);
        const ds = parseInt(duration / 1000);
        return (
          <div key={duration}>- {formattedDuration(dh, dm - dh * 60, ds - dm * 60)}</div>
        )
      })
      }
    </>
  )
}

export default CalendarRecord;