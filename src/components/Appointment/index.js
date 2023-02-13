import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  }

  function deleteInterview () {
    transition(DELETING);
    props.deleteInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });
  }

  function showConfirm () {
    transition(CONFIRM);
  }

  function showCreate () {
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props?.interview?.student}
          interviewer={props?.interview?.interviewer}
          onDelete={showConfirm}
          
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === CONFIRM && <Confirm message={'Are you sure you want to delete?'} onConfirm={deleteInterview} onCancel={showCreate}/>}
      { mode === SAVING && <Status message={'Saving'} /> }
      { mode === DELETING && <Status message={'Deleting'} /> }
    </article>
  );
}
