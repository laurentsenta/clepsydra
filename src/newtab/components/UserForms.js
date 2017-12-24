import React, { Component } from 'react';


export class SimpleValueForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.props.label}
          <input type={this.props.type} value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export class LifeExpectancyForm extends Component {
  render() {
    return <SimpleValueForm label="Life Expectancy"
                            type="number"
                            value={this.props.value}
                            submit={(x) => this.props.submit(parseInt(x))}/>
  }
}

export class BirthDateForm extends Component {
  render() {
    return <SimpleValueForm label="Birth Date" type="date" value={this.props.value} submit={this.props.submit}/>
  }
}
