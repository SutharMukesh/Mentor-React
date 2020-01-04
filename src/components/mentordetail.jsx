import React, { Component } from "react";

export default class Mentordetail extends Component {
  getMentor = () => {
    let { id } = this.props.match.params;
    return this.props.mentors.filter(mentor => id === mentor._id)[0];
  };
  render() {
    return (
      <div className="container mt-5">
        <div class="card container" style={this.styles.card}>
          <img
            class="card-img"
            style={this.styles.img}
            src={
              this.getMentor().image
                ? this.getMentor().image
                : "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
            }
            alt=""
          />
          <div class="card-body" style={this.styles.cardbody}>
            <h2 class="card-title">{this.getMentor().name}</h2>
            <p class="card-text">
              <table
                class="table table-borderless table-sm table-responsive"
                style={this.styles.table}
              >
                <tbody>
                  <tr>
                    <td>
                      <strong>Age: </strong>
                    </td>
                    <td>
                      <span>{this.getMentor().age}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Sex: </strong>
                    </td>
                    <td>
                      <span>{this.getMentor().sex}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Mobile No: </strong>
                    </td>
                    <td>
                      <span>{this.getMentor().mobile}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date Added: </strong>
                    </td>
                    <td>
                      <span>{this.getMentor().dateadded}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date Modified: </strong>
                    </td>
                    <td>
                      <span>{this.getMentor().datemodified}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </p>
          </div>
        </div>
        <br />
        <strong class="m-2">Tasks</strong>
        <ul class="list-group">
          {this.getMentor().tasks.map(task => (
            <li class="list-group-item d-flex list-group-item-action justify-content-between align-items-center">
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  styles = {
    card: {
      display: "flex",
      "flex-direction": "row"
    },
    img: {
      width: "10rem",
      height: "10rem",
      margin: "5% 2%",
      "border-bottom-right-radius": "calc(5rem)",
      "border-bottom-left-radius": "calc(5rem)",
      "border-top-left-radius": "calc(5rem)",
      "border-top-right-radius": "calc(5rem)"
    },
    cardbody: {
      width: "60%"
    },
    table: {}
  };
}
