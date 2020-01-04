import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Mentoredit extends Component {
  state = {
    id: null,
    mentor: null
  };
  componentWillMount() {
    let { id } = this.props.match.params;
    this.setState({ id });
    const mentor = this.props.mentors.filter(mentor => id === mentor._id)[0];
    this.setState({ mentor });
  }

  handleRadioChange = changeEvent => {
    debugger;
    let mentor = { ...this.state.mentor };
    mentor.sex = changeEvent.target.value;
    this.setState({ mentor });
  };
  handleChange = (i, event) => {
    let mentor = { ...this.state.mentor };
    mentor.tasks[i].title = event.target.value;
    this.setState({ mentor });
  };
  handleAdd = e => {
    // debugger;
    let mentor = { ...this.state.mentor };
    mentor.tasks.push({ title: null });
    this.setState({ mentor });
  };

  handleRemove = i => {
    // debugger;
    let mentor = { ...this.state.mentor };
    mentor.tasks.splice(i, 1);
    this.setState({ mentor });
  };

  updateMentor = async event => {
    debugger;
    event.preventDefault();
    let mentor = {
      name: event.target.nameid.value,
      email: event.target.emailid.value,
      age: event.target.ageid.value,
      sex: this.state.mentor.sex,
      image: "",
      tasks: this.state.mentor.tasks,
      mobile: event.target.mobileid.value,
      datemodified: new Date().toString()
    };
    
    const response = await fetch(
      "http://localhost:3005/update/" + this.state.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mentor)
      }
    );
    const resdata = await response.json();
    alert(resdata.message);
    if (response.status === 200) {
      this.setState(mentor);
      this.props.refreshMentors();
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="card mt-2 container mt-5">
        <form className="m-2 mt-4" onSubmit={this.updateMentor}>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input
                id="nameid"
                type="text"
                defaultValue={this.state.mentor.name}
                class="form-control"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Email address</label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="emailid"
                defaultValue={this.state.mentor.email}
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Age</label>
            <div class="col-sm-10">
              <input
                id="ageid"
                defaultValue={this.state.mentor.age}
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Sex</label>
            <div class="col-sm-10 align-items-center">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="Male"
                  checked={this.state.mentor.sex === "Male"}
                  onChange={this.handleRadioChange}
                />
                <label class="form-check-label" for="inlineRadio1">
                  Male
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="Female"
                  checked={this.state.mentor.sex === "Female"}
                  onChange={this.handleRadioChange}
                />
                <label class="form-check-label" for="inlineRadio2">
                  Female
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Mobile No</label>
            <div class="col-sm-10">
              <input
                id="mobileid"
                defaultValue={this.state.mentor.mobile}
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Image</label>
            <div class="col-sm-10">
              <input id="imageid" type="file" class="form-control" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Tasks</label>
            <div class="col-sm-10">
              <button
                class="btn btn-outline-success btn-add"
                onClick={this.handleAdd}
                type="button"
              >
                +
              </button>
              {this.state.mentor.tasks.map((task, idx) => (
                <div class="entry input-group col-xs-3 m-2">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Type something"
                    id={`taskid_${idx}`}
                    defaultValue={task.title}
                    onChange={e => this.handleChange(idx, e)}
                  />
                  <button
                    class="btn btn-outline-danger btn-del ml-2"
                    type="button"
                    onClick={() => this.handleRemove(idx)}
                  >
                    x
                  </button>
                </div>
              ))}
              <small class="m-2">Press + to add another form field :)</small>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button
              type="submit"
              class="btn btn-secondary btn-lg btn-block m-2"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }

  styles = {};
}
export default withRouter(Mentoredit);
