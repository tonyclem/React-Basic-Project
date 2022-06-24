import React from "react";

class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <article>
        <div>
          <h1>Hello Maria</h1>
          <p>It Christmas day soon {this.state.count} </p>
          <button
            onClick={() => this.setState({ count: this.state.count + 1 })}
          >
            Click Here to know When
          </button>
        </div>
      </article>
    );
  }
}

export default Apps;
