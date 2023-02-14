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
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments });
      });
  }

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      refreshData();
    });
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
    deleteInterview
  };
};