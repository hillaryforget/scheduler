import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
//import "./styles.scss";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />
    )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back}/>}

      {props.interview ? // do I need this
      (<Show student={props.interview.student} interviewer={props.interview.interviewer} />) : (<Empty />)}
    </article>
  );
}