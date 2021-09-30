import React from 'react';
import Card from './Card';
import NewCard from './NewCard';
import '../App.css';

class App extends React.Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    //TODO Connect to SERVER and update State
    this.fetchUsers();
    console.log('Component loaded');
  }
  addUserHandler = (event) => {
    this.modifyStateAndDB('add', ' ', event);
  };

  updateUserHandler = (id, event) => {
    this.modifyStateAndDB('update', id, event);
  };

  deleteUserHandler = (id, event) => {
    this.modifyStateAndDB('delete', id, event);
  };

  modifyStateAndDB = async (action, id, event) => {
    event.preventDefault();
    let users = [...this.state.users];

    if (action === 'add') {
      const data = {
        name: event.target.name.value,
        email: event.target.email.value,
        address: event.target.address.value,
      };
      event.target.reset();
      await fetch('/user', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached,
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((response) => {
          console.log(response);
          alert('Successfully added new user');
          this.fetchUsers();
        })
        .catch((err) => {
          alert('Cound not add new user');
          console.log('error using fetch', err);
        });
      console.log('Added user');
    }

    if (action === 'update') {
      const data = {
        name: event.target.name.value,
        email: event.target.email.value,
        address: event.target.address.value,
      };
      const userIndex = users.findIndex((item) => {
        return item._id === id;
      });

      if (userIndex === -1) {
        console.log('Error while updating: id not found in state');
        return;
      }
      data._id = id;
      console.log(data);
      users[userIndex] = data;

      await fetch('/user', {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(users[userIndex]),
      })
        .then((response) => {
          console.log(response);
          alert('Updated user successfully');
          this.fetchUsers();
        })
        .catch((err) => {
          alert('Unable to update user');
          console.log('error using fetch', err);
        });
    }

    if (action === 'delete') {
      await fetch('/user', {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ _id: id }),
      })
        .then((response) => {
          console.log(response);
          alert('Deleted user successfully');
          this.fetchUsers();
        })
        .catch((err) => {
          alert('Unable to delete user');
          console.log('error using fetch', err);
        });
    }
  };

  async fetchUsers() {
    let users = [];
    await fetch('/users', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
      .then((response) => {
        return response.json();
      })
      .then((docs) => {
        users = docs;
        this.setState({ users: [...users] });
      })
      .catch((err) => {
        alert('Unable to fetch all users');
        console.log('error using fetch', err);
      });
  }

  render() {
    return (
      <>
        {this.state.users.map((user) => {
          return (
            <Card
              index={user._id}
              key={user._id}
              name={user.name}
              address={user.address}
              email={user.email}
              updateUser={this.updateUserHandler}
              deleteUser={this.deleteUserHandler}
            />
          );
        })}

        <NewCard addUser={this.addUserHandler} />
      </>
    );
  }
}
export default App;
