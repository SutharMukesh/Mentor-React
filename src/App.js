import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Mentorlist from "./components/mentorlist";
import Mentordetail from "./components/mentordetail";
import Mentoradd from "./components/mentoradd";
import Mentoredit from "./components/mentoredit";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends Component {
  state = {
    mentors: []
  };

  async componentWillReceiveProps(){
    
    const mentors = await fetch("http://localhost:3005/");
    const mentorsdata = await mentors.json();
    this.setState({ mentors: mentorsdata });
  
  }

  refreshMentors=async ()=>{
    const mentors = await fetch("http://localhost:3005/");
    const mentorsdata = await mentors.json();
    this.setState({ mentors: mentorsdata });
  }

  async componentDidMount() {
    const mentors = await fetch("http://localhost:3005/");
    const mentorsdata = await mentors.json();
    this.setState({ mentors: mentorsdata });
  }

  deleteMentor = async(id)=>{
    if(window.confirm("you sure?")){
      const deleteres = await fetch("http://localhost:3005/"+id,{
         method: "DELETE"
      });
      const deleteresdata = await deleteres.json();
      alert(deleteresdata.message)
       const mentors = await fetch("http://localhost:3005/");
      const mentorsdata = await mentors.json();
      this.setState({ mentors: mentorsdata });
    }
  }
  
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <div className="App">
            <Switch>
              <Route
                path="/read/:id"
                render={props => (
                  <Mentordetail {...props} mentors={this.state.mentors} />
                )}
              />
              <Route
                exact
                path="/"
                render={props => (
                  <Mentorlist {...props} mentors={this.state.mentors} deleteMentor={this.deleteMentor} />
                )}
              />
               <Route
                exact
                path="/add"
                render={props => (
                  <Mentoradd {...props} addMentor={this.addMentor} refreshMentors={this.refreshMentors}/>
                )}
              />
              <Route
                exact
                path="/edit/:id"
                render={props => (
                  <Mentoredit {...props} mentors={this.state.mentors} refreshMentors={this.refreshMentors}/>
                )}
              />
              <Route render={props => <h3>Not Found</h3>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
