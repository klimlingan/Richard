import React from 'react';
import $ from 'jquery';

export default class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      firstName: "",
      lastName: "",
      designation: "",
      email: "",
      password: "",
      contactNumber: "",
    }
  }

  updateFirstName(event) {
    this.setState({
      firstName: event.target.value 
    });
  }

  updateLastName(event) {
    this.setState({
      lastName: event.target.value 
    });
  }

  updateDesignation(event) {
    this.setState({
      designation: event.target.value 
    });
  }

  save() {
    var context = this;

    $.ajax({
      url: "http://localhost:9000/api/account/user",
      method: "POST",
      data: {
        id: context.state.id,
        firstName: context.state.firstName,
        lastName: context.state.lastName,
        designation: context.state.designation,
        email: context.state.email,
        password: context.state.password,
        contactNumber: context.state.contactNumber,
      },
      success: function(response) {
        alert("Successfully saved record!");
      },
      error: function(response) {
        alert("Error in saving record!");
      }
    });
  }

  render() {
    // todo: change the select to input select
    return (
      <div>
        First Name:
        <input type="text" value={this.state.firstName} onChange={this.updateFirstName(this)} />
        Last Name:
        <input type="text" value={this.state.lastName} onChange={this.updateLastName(this)} />
        Designation:
        <select  value={this.state.designation} onChange={this.updateDesignation(this)} >
            <option value="1">AIN</option>
            <option value="2">EEN</option>
            <option value="3">RN</option>
            <option value="4">NUM</option>
        </select>
        Email:
        <input type="text" value={this.state.email} onChange={this.updateEmail(this)} />
        Password:
        <input type="text" value={this.state.password} onChange={this.updatePassword(this)} />
        Contact Number:
        <input type="text" value={this.state.contactNumber} onChange={this.updateContactNumber(this)} />
        <hr/>

        <button onClick={this.save(this)}>
          Save
        </button>
      </div>
    );
  }
}