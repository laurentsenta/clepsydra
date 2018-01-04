/* global chrome */
import React, { Component } from 'react';

class Introduction extends Component {
  render() {
    const newTab = (e) => {
      chrome.tabs.create({ url: "https://clepsydra.singulareva.com/life_expectancy_calculator/" })
      e.preventDefault()
    }

    return (
      <div className="row introduction vh100 justify-content-center align-items-center">
        <div className="col-12 col-md-6">
          {this.props.completed ?
            (<p>see you</p>)
            :
            (
              <div>
                <div className="text-center">
                  <img className="img-fluid" src="/logo.png"/>
                </div>

                <h1>
                  Welcome!
                </h1>
                <p>
                  Clepsydra is going to ask a few questions about your birth date and your Life Expectancy, then
                  it'll setup itself in your New Tab page.
                </p>

                <p>
                  You can reconfigure the extension or remove it at any time by using the icon on the top right of your
                  browser.
                </p>

                <p>
                  For now, we recommend using the following life expectancy calculator:
                </p>

                <p className="text-center">
                  <a className="btn btn-secondary"
                     onClick={newTab}
                     href="https://clepsydra.singulareva.com/life_expectancy_calculator/">
                    A Life-Expectancy Calculation
                  </a>
                </p>

                <p className="text-center">
                  <button role='button'
                          className="btn btn-lg btn-primary"
                          onClick={() => this.props.complete()}>
                    Got it!
                  </button>
                </p>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default Introduction
