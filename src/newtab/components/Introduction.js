import React, { Component } from 'react';

class Introduction extends Component {
  render() {
    return (
      <div className="row introduction vh100 justify-content-center align-items-center">
        <div className="col-12 col-md-6">
          <h2>Welcome</h2>
          {this.props.completed ?
            (<p>see you</p>)
            :
            (
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultricies convallis elementum. Nam
                  consequat ornare augue ut posuere.
                </p>

                <p>
                  Cras volutpat tincidunt ex eget congue. Donec vel erat sagittis, feugiat libero vel, scelerisque dui.
                  Donec maximus massa massa, eget fermentum nunc varius sed. Cras tempus metus sit amet tristique
                  interdum. Nam tempor dui odio, eu placerat est volutpat non.
                </p>
                <button role='button'
                        className="btn btn-primary"
                        onClick={() => this.props.complete()}>
                  Got it
                </button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default Introduction
