import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./Nav";
import Landing from "./Landing";
import SignUp from "./SignUp";
import About from "./About";
import Login from "./Login";
import Footer from "./Footer";
import Contact from "./Contact";
import Dashboard from "./Dashboard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />

        <div className="container">
          <Route path="/signup" component={SignUp} />
          <Route path="/about" component={About} />
          <Route path="/" exact component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/contact" component={Contact} />
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}
//    ;

export default App;
