import { Component } from "react";
import "./Navbar.css";
import {Link} from "react-router-dom"

class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <>
        <nav>
          <a className="logo" href="/">
            {/* <img src="./images/lgo.svg" />x */}
          </a>

          <div>
            <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>

              <li>
                <a className="active" href="/">
                  Home
                </a>
              </li>


              <li>
                <a href="try">Stories</a>
              </li>


              <li>
                <a href="abt">About</a>
              </li>


              {/* <button className="log" >Login</button> */}
              <Link className="log" to="/land" >Login</Link>

              
            </ul>
          </div>
          <div id="mobile" onClick={this.handleClick}>
            <i
              id="bar"
              className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
