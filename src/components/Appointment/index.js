import React from "react";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const FORM = "FORM";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer,
    };
    console.log("Saving");
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log("error saving", ERROR_SAVE);
        transition(ERROR_SAVE, true)
      });
  }

  function deleteInterview(event) {
    transition(DELETING, true);
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT);
  }

  function showCreate() {
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(FORM)} />}
      {mode === SHOW &&  <Show
          student={props?.interview?.student}
          interviewer={props?.interview?.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      }
      {mode === FORM && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === CONFIRM && <Confirm
          message={"Are you sure you want to delete?"}
          onConfirm={deleteInterview}
          onCancel={showCreate}
        />
      }
      {mode === SAVING && <Status message={"Saving"} /> }
      {mode === DELETING && <Status message={"Deleting"} /> }
      {mode === ERROR_SAVE && <Error message={"Can't save appointment!"} onClose={back} /> }
      {mode === ERROR_DELETE && <Error message={"Can't delete appointment!"} onClose={back} /> }
      {mode === EDIT && <Form
          student={props?.interview?.student}
          interviewer={props?.interview?.interviewer?.id}
          interviewers={props?.interviewers}
          onCancel={back}
          onSave={save}
        />
      }
    </article>
  );
}
