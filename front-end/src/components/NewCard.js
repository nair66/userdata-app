import React from 'react';

class NewCard extends React.Component {
  render() {
    return (
      <form className="card" onSubmit={(event) => this.props.addUser(event)}>
        <div className="card-header"> Add New User </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="inputName">Name</label>
            <input
              type="text"
              id="inputName"
              name="name"
              className="form-control"
              defaultValue={this.props.name}
              placeholder="Jane"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              id="inputEmail"
              name="email"
              className="form-control"
              defaultValue={this.props.email}
              placeholder="Jane@gmail.com"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            id="inputAddress"
            name="address"
            className="form-control"
            defaultValue={this.props.address}
            placeholder="1234 Main St"
          />
        </div>
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary">
            Add new user
          </button>
        </div>
      </form>
    );
  }
}

export default NewCard;
