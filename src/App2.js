import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service1";
import { useCookies } from 'react-cookie';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import { withCookies, Cookies } from 'react-cookie';
var _this=null;
class App extends Component {
   
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    const { cookies } = props;
    
    this.state = {
      currentUser: undefined,
      name: cookies.get('name') || 'Ben'
    };
    _this=this;
  }

  componentDidMount() {
    const user = null//AuthService.getCurrentUser();

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
  getCurrentUser() {
    // console.log(_this.props)
     const { cookies } = _this.props;

   
    console.log(cookies.get('dhs'))
    cookies.set('dhss', "dhs", { path: '/', httpOnly: 'true' });
    _this.setState({ name :"name"});
    AuthService.getCurrentUser(cookies);
     
  }
  postCurrentUser() {
    AuthService.postCurrentUser();
    // this.setState({
    //   showModeratorBoard: false,
    //   showAdminBoard: false,
    //   currentUser: undefined,
    // });
  }
  render() {
    const { currentUser} = this.state;

    return (
      <div className="container">
        <nav className="navbar navbar-expand navbar-dark bg-light ">
          {/* <Link to={"/"} className="navbar-brand text-dark">
            FavAvtar
          </Link> */}
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item text-dark">
              <Link to={"/home"} className="nav-link text-dark">
                Home
              </Link>
            </li> */}
 

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} onClick={this.getCurrentUser} className="nav-link text-dark">
                  GET
                </Link>
                <Link to={"/"} onClick={this.postCurrentUser} className="nav-link text-dark">
                  POST
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link to={"/register"} className="nav-link text-dark">
                Register Wallet
                </Link>
              </li> */}
            </div>
         
        </nav>

        {/* <div className="container">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div> */}

        { /*<AuthVerify logOut={this.logOut}/> */ }

        
      </div>
    );
  }
}

export default withCookies(App);
