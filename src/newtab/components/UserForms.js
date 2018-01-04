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
      <div className="vh100 row align-items-center justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group align-items-center">
              <label htmlFor="field">
                {this.props.label}
              </label>

              <input className="form-control form-control-lg"
                     id="field"
                     type={this.props.type}
                     value={this.state.value}
                     onChange={this.handleChange}/>
            </div>

            <input className="btn btn-lg btn-primary"
                   role="button" type="submit"
                   value="Next"/>
          </form>
        </div>
      </div>
    );
  }
}

export class LifeExpectancyForm extends Component {
  render() {
    return <SimpleValueForm label="Life Span Estimation"
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
