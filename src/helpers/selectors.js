export const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.find((item) => item.name === day);
  if (!selectedDay) return [];

  return selectedDay.appointments.map((id) => state.appointments[id]);
};

export const getInterview = (state, interview) => {
  const interviewObject = {};
  if (interview === null) {
    return null;
  } else {
    interviewObject.student = interview.student;
    interviewObject.interviewer = state.interviewers[interview.interviewer];
  };
  return interviewObject;
};

export const getInterviewersForDay = (state, day) => {
  const selectedDay = state.days.find((item) => item.name === day);
  if (!selectedDay) return [];

  return selectedDay.interviewers.map((id) => state.interviewers[id]);
};
