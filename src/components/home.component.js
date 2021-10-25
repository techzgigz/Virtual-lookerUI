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
      <div className="container_" style={{ marginTop: "24px","max-width": "100%;" }}>
        {/* <header className="jumbotron">
          <h4>{this.state.content}</h4>
        </header> */}
        <div className="container-md_" style={{ marginTop: "0px" }}>
          <h4>{this.state.content}</h4>
          <p>{"Favtar Wallet Favtar Wallet Favtar Wallet Favtar Wallet"}</p>
        </div>
      </div>
    );
  }
}
