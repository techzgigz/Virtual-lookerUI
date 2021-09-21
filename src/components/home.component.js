import React, { Component } from "react";

// import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Favtar Wallet."
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container" style={{ marginTop: "20px" }}>
        <header className="jumbotron">
          <h4>{this.state.content}</h4>
        </header>
        <div className="container-md" style={{ marginTop: "20px" }}>
          <p>{"Favtar Wallet Favtar Wallet Favtar Wallet Favtar Wallet"}</p>
        </div>
      </div>
    );
  }
}
