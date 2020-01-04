import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Mentoradd extends Component {
  state = {
    tasks: [],
    selectedOption: null
  };
  handleRadioChange = changeEvent => {
    // debugger;
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };
  handleChange = (i, event) => {
    const values = [...this.state.tasks];
    values[i].title = event.target.value;
    this.setState({ tasks: values });
  };
  handleAdd = e => {
    // debugger;
    let values = [...this.state.tasks];
    values.push({ title: null });
    this.setState({ tasks: values });
  };

  handleRemove = i => {
    // debugger;
    let values = [...this.state.tasks];
    values.splice(i, 1);
    this.setState({ tasks: values });
  };

  addMentor = async event => {
    event.preventDefault();

    let mentor = {
      name: event.target.nameid.value,
      email: event.target.emailid.value,
      age: event.target.ageid.value,
      sex: this.state.selectedOption,
      image: new FormData().append("img", event.target.imageid.files[0]),
      tasks: this.state.tasks,
      mobile: event.target.mobileid.value,
      dateadded: new Date().toString()
    };

    const response = await fetch("http://localhost:3005/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mentor)
    });
    const resdata = await response.json();
    alert(resdata.message);
    if (response.status === 200) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="card mt-2 container mt-5">
        <form className="m-2 mt-4" onSubmit={this.addMentor}>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input id="nameid" type="text" class="form-control" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Email address</label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="emailid"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Age</label>
            <div class="col-sm-10">
              <input id="ageid" type="text" class="form-control" />
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
              <input id="mobileid" type="text" class="form-control" />
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
              {this.state.tasks.map((task, idx) => (
                <div class="entry input-group col-xs-3 m-2">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Type something"
                    id={`taskid_${idx}`}
                    onChange={e => this.handleChange(idx, e)}
                  />
                  <button
                    class="btn btn-outline-danger ml-2"
                    type="button"
                    onClick={() => this.handleRemove(idx)}
                  >
                    x
                  </button>
                </div>
              ))}
              <small class="m-2">Press + to add Tasks :)</small>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-info btn-lg btn-block m-2">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }

  styles = {};
}
export default withRouter(Mentoradd);
