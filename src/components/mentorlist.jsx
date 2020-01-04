import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Mentorlist extends Component {
  render() {
    return (
      <div className="container mt-5 ">
        <div className="container d-flex justify-content-between">
          <h3>Mentor List</h3>
          <Link to={"/add"}>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm mb-2 align-content-right"
            >
              Add
            </button>
          </Link>
        </div>
        <ul class="list-group">
          {this.props.mentors.map(mentor => (
            <Link
              to={"/read/" + mentor._id}
              class="list-group-item d-flex list-group-item-action justify-content-between align-items-center"
            >
              {mentor.name}
              <div>
                <span class="badge badge-warning mr-2 badge-pill">
                  {mentor.tasks.length}
                </span>
                <Link to={"/edit/" + mentor._id}>
                  <button
                    type="button"
                    class="btn btn-outline-secondary ml-2 btn-sm align-content-right"
                  >
                    Edit
                  </button>
                </Link>
                <Link to={"/"}>
                  <button
                    type="button"
                    class="btn btn-outline-danger ml-2 btn-sm align-content-right"
                    onClick={() => {
                      this.props.deleteMentor(mentor._id);
                    }}
                  >
                    Delete
                  </button>
                </Link>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}
