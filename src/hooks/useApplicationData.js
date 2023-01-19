import React, { useState , useEffect} from "react";

import axios from "axios";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  //Implemented as per Gary's lecture.
  const updateSpots = (state, appointments) => {
    const dayObj = state.days.find(d => d.name === state.day);

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const day = {...dayObj, spots};
    return state.days.map(d => d.name === state.day ? day: d);
  };


  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const url = `/api/appointments/${id}`;
    return axios.put(url, {interview})
      .then(response => {
        const days = updateSpots(state, appointments, id)
        setState({ ...state, appointments, days });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const url = `/api/appointments/${id}`;
    return axios.delete(url)
      .then(response => {
        const days = updateSpots(state, appointments, id)
        setState({ ...state, appointments, days });
      });
  };
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    }).catch(err => console.log(err));
  }, [setState]);

  return { state, setState, setDay, bookInterview, cancelInterview };
};