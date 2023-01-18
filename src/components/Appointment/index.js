import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import Status from './Status';


import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const { time, id, interview, dailyInterviewers, bookInterview } = props;
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
    .bookInterview(id, interview)
      .then(() => transition(SHOW));
  }

  return (
    <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show
           student={props.interview.student}
           interviewer={props.interview.interviewer}
         />
    )}
    {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
    {mode === EDIT && (        <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={() => back()} />
      )}
    </article>
    )
    };    

export default Appointment;