import React, { Component } from 'react';

class Introduction extends Component {
  render() {
    return (
      <div className="introduction">
        <h2>Welcome</h2>
        {this.props.completed ?
          (<p>see you</p>)
          :
          (
            <div>
              <p>
                This is something that is cool, I'll explain later.
              </p>
              <button onClick={() => this.props.complete()}>
                Got it
              </button>
            </div>
          )
        }
      </div>
    )
  }
}

export default Introduction
