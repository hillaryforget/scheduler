import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  
  const [selectedDay, setSelectedDay] = useState("Monday"); 
  const [days, setDays] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  useEffect( () => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setDays(all[0].data);
      setAppointments(all[1].data);
      setInterviewers(all[2].data);
    }).catch( (err) => {
      console.log(err.message);
    });
  }, [selectedDay]);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
  days={days}
  value={selectedDay}
  onChange={setSelectedDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {Object.values(appointments).map((app) => {
          return <Appointment key={app.id} {...app} />;
        })}
      </section>
    </main>
  );
}
