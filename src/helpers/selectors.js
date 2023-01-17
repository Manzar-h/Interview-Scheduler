export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(d => d.name === day);
  if (!selectedDay) {
    return [];
  }
  const appointments = selectedDay.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(d => d.name === day);
  if (!selectedDay) {
    return [];
  }
  const interviewers = selectedDay.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;
}