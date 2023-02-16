import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    interviewer: 2,
    days: [],
    appointments: {},
    interviewers: [],
    bookInterview: [],
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      refreshData();
      updateSpots(state, state.day, state.appointments);
    });
  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      refreshData();
      updateSpots(state, state.day, state.appointments);
    });
  }

  function updateSpots(state, day, appointments) {
    let count = 0;
    const filterDay = state.days.filter((days) => days.name === day);
    const filterAppointments = filterDay[0].appointments;

    for (const appointmentKey in filterAppointments) {
      if (!appointments[filterAppointments[appointmentKey]].interview) {
        count += 1;
      }
    }

    state.days.map((days) => {
      if (days.name === day) {
        days.spots = count;
      }
      return "count changed";
    });

    return count;
  }
  
  const refreshData = () => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(refreshData, []);

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
}
