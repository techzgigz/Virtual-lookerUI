import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Key from "./components/key.component";
import Wallet from "./components/document.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser} = this.state;

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand navbar-dark bg-light ">
          <Link to={"/"} className="navbar-brand text-dark">
            FavAvtar
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item text-dark">
              <Link to={"/home"} className="nav-link text-dark">
                Home
              </Link>
            </li>
 

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/document"} className="nav-link text-dark">
                  Virtual Docs
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link text-dark">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/key"} className="nav-link text-dark">
                  Key
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link text-dark" onClick={this.logOut}>
                  LogOut Wallet
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link text-dark">
                  Login Wallet
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link text-dark">
                Register Wallet
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container" style={{margin:"0px",'max-width': "100%"}}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {currentUser && <>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/key" component={Key} />
            <Route exact path="/document" component={Wallet} />
            </>
            }
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;
