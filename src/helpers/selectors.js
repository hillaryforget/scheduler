export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find((days) => days.name === day);
 
  if (!filteredDay || filteredDay.appointments.length === 0) {
    return [];
  } else {
    return filteredDay.appointments.map((appointmentId) => {
      return state.appointments[appointmentId];
      /**
       * key = 1
       * state.appointments.1 = { id: 1, time: "12pm", interview: null },
       * state.appointments[1] = { id: 1, time: "12pm", interview: null },
       * state.appointments.key = undefined
       * state.appointments['key'] = undefined
       * state.appointments[key] = { id: 1, time: "12pm", interview: null }
       *        */
    });
  }
}