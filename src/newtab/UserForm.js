import React from 'react';
import { actions, Control, Form } from 'react-redux-form';

class UserForm extends React.Component {
  handleSubmit(user) {
    // Do whatever you like in here.
    // If you connect the UserForm to the Redux store,
    // you can dispatch actions such as:
    // dispatch(actions.submit('user', somePromise));
    let x = actions
    // etc.
  }

  render() {
    return (
      <Form
        model="user"
        onSubmit={(user) => this.handleSubmit(user)}
      >
        <label htmlFor="user.firstName">First name:</label>
        <Control.text model="user.firstName" id="user.firstName"/>

        <label htmlFor="user.lastName">Last name:</label>
        <Control.text model="user.lastName" id="user.lastName"/>

        <button type="submit">
          Finish registration!
        </button>
      </Form>
    );
  }
}

export default UserForm;
