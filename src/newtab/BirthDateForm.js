import React from 'react';
import { actions, Control, Form } from 'react-redux-form';

export class BirthDateForm extends React.Component {
  handleSubmit(user) {
    // Do whatever you like in here.
    // If you connect the BirthDateForm to the Redux store,
    // you can dispatch actions such as:
    // dispatch(actions.submit('user', somePromise));
    this.props.dispatch(actions.merge('user', user))
  }

  render() {
    return (
      <Form
        model="user"
        onSubmit={(user) => this.handleSubmit(user)}
      >
        <label htmlFor="user.firstName">Birth Date:</label>
        <Control.text model="user.birthDate" id="user.birthDate" type="date"/>

        <button type="submit">
          Update
        </button>
      </Form>
    );
  }
}


export class LifeExpectancyForm extends React.Component {
  handleSubmit(user) {
    // Do whatever you like in here.
    // If you connect the BirthDateForm to the Redux store,
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
        <label htmlFor="user.lifeExpectancy">Life Expectancy:</label>
        <Control.text model="user.lifeExpectancy" id="user.lifeExpectancy" type="number"/>

        <button type="submit">
          Update
        </button>
      </Form>
    );
  }
}
