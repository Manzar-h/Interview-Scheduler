import React from 'react';
import Button from "components/Button";

const Confirm = (props) => {
  return (
<main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">Delete the appointment?</h1>
  <section className="appointment__actions">
  <p className="text--confirm">{props.message}</p>
    <Button danger onClick={props.onCancel}>Cancel</Button>
    <Button danger onClick={props.onConfirm}>Confirm</Button>
  </section>
</main>
  )
};

export default Confirm;