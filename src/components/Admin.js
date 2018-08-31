import React, { Component } from "react";
import "./../App.css";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /*** Booking: ***/
      allBookings: [],
      newBooking: {
        name: "",
        email: "",
        telephone: "",
        tables: "",
        bdate: "",
        btime: "",
        numberOfGuests: ""
      }
    };

    this.clickHandlerPostNewBooking = this.clickHandlerPostNewBooking.bind(
      this
    );

    this.onClickDeleteHandler = this.onClickDeleteHandler.bind(this);
  }

  componentDidMount() {
    fetch("https://www.idabergstrom.se/restaurant-api/fetchAll.php")
      .then(response => response.json())
      .then(data => {
        this.setState({ allBookings: data });
      });
  }

  onInputChange(eventTargetName, newValue, index) {
    console.log("Event name: " + eventTargetName);
    let newBookings = this.state.allBookings; // create the copy of state array
    switch (eventTargetName) {
      case "name":
        newBookings[index].name = newValue;
        break;
      case "email":
        newBookings[index].email = newValue;
        break;
      case "telephone":
        newBookings[index].telephone = newValue;
        break;
      case "bdate":
        newBookings[index].bdate = newValue;
        break;
      case "btime":
        newBookings[index].btime = newValue;
        break;
      case "numberOfGuests":
        newBookings[index].numberOfGuests = newValue;
        break;
      default:
        console.log("fel i switch");
    }

    this.setState({ allBookings: newBookings }); //update the value
  }

  /*  deleteBooking = bid => {
    fetch("https://www.idabergstrom.se/restaurant-api/product/delete.php", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        bid: bid
      })
    })
      .then(response => response.json())
      .then(fetched => {
        console.log(fetched);
      })
      .catch(error => {
        console.log(error);
      });
  }; */

  postBooking = event => {
    fetch(`https://www.idabergstrom.se/restaurant-api/product/create.php`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        name: this.state.newBooking.name,
        email: this.state.newBooking.email,
        telephone: this.state.newBooking.telephone,
        bdate: this.state.newBooking.bdate,
        btime: this.state.newBooking.btime,
        numberOfGuests: this.state.newBooking.numberOfGuests
      })
    })
      .then(response => response.json())
      .then(fetched => {
        console.log(fetched);
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateBooking = (
    id,
    name,
    email,
    telephone,
    bdate,
    btime,
    numberOfGuests
  ) => {
    fetch("https://www.idabergstrom.se/restaurant-api/product/update.php", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        id: id,
        name: name,
        email: email,
        telephone: telephone,
        bdate: bdate,
        btime: btime,
        numberOfGuests: numberOfGuests
      })
    })
      .then(response => response.json())
      .then(fetched => {
        console.log(fetched);
      })
      .catch(error => {
        console.log(error);
      });
  };

  /*   onCreateNewGuest = (targetName, targetValue) => {
    this.setState({
      newBooking: {
        [targetName]: targetValue
      }
    });
  }; */

  onCreateNewGuestInputInfo(e) {
    const updateNewBooking = {
      [e.target.name]: e.target.value
    };

    const updatedBooking = Object.assign(
      this.state.newBooking,
      updateNewBooking
    );
    this.setState({
      newBooking: updatedBooking
    });

    //this.updateBookingsState();

    /*    const updatedAllBookings = Object.assign(
      this.state.allBookings,
      updateNewBooking
    ); */
  }

  /*  updateBookingsState = () => {
    //this.state.allBookings[50] = {test : 'ho'}
    // console.log(this.state.allBookings[50]);
    const addNewBookingToAllBookings = Object.assign(
      this.state.allBookings,
      this.newBooking
    );

    this.setState(prevState => ({
      allBookings: [...prevState.allBookings, addNewBookingToAllBookings]
    }));
  }; */

  deleteBooking = bid => {
    fetch("https://www.idabergstrom.se/restaurant-api/product/delete.php", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        bid: bid
      })
    })
      .then(response => response.json())
      .then(fetched => {
        console.log(fetched);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onClickDeleteHandler = bid => {
    this.deleteBooking(bid);
  };

  /*   updateAllBookingsWithNewBooking = e => {
    // let tempAllBookings = this.state.allBookings.slice(0);
    let tempAllBookings = [...this.state.allBookings];
    tempAllBookings.push(this.state.newBooking);
    this.setState({
      allBookings: tempAllBookings
    });
  }; */

  render() {
    if (!this.state.allBookings) {
      return <div>Loading...</div>;
    }
    // console.log(this.state.allBookings);

    const list = this.state.allBookings.map((item, index) => (
      <div key={item.bid}>
        <div className="all-bookings">
          <h3>Input fields to change info</h3>
          {index + 1} &nbsp; Customer ID: {item.bid} <br />
          &nbsp; Name: {item.name} &nbsp;{" "}
          <input
            name="name"
            type="text"
            value={item.name}
            onChange={event =>
              this.onInputChange(event.target.name, event.target.value, index)
            }
          />
          <button onClick={this.onClickDeleteHandler.bind(this, item.bid)}>
            Delete!
          </button>
          &nbsp;Email: {item.email} &nbsp;{" "}
          <input
            type="text"
            name="email"
            value={item.email}
            onChange={event =>
              this.onInputChange(event.target.name, event.target.value, index)
            }
          />
          &nbsp;Telephone: {item.telephone} &nbsp;{" "}
          <input
            type="text"
            value={item.telephone}
            name="telephone"
            onChange={event =>
              this.onInputChange(event.target.name, event.target.value, index)
            }
          />
          &nbsp; Date: {item.bdate} &nbsp;{" "}
          <input
            type="text"
            value={item.bdate}
            name="bdate"
            onChange={event =>
              this.onInputChange(event.target.name, event.target.value, index)
            }
          />{" "}
          &nbsp; Time: {item.btime} &nbsp;{" "}
          <input
            type="text"
            value={item.btime}
            name="btime"
            onChange={event =>
              this.onInputChange(event.target.name, event.target.value, index)
            }
          />
          &nbsp; Number of Guests: {item.numberOfGuests} &nbsp;{" "}
          <input
            type="text"
            value={item.numberOfGuests}
            name="numberOfGuests"
            onChange={event =>
              this.onInputChange(event.target.name, event.target.value, index)
            }
          />
        </div>
        <button onClick={this.clickHandlerPostNewBooking.bind(this, item)}>
          Update!
        </button>
      </div>
    ));

    return (
      <React.Fragment>
        <h1>{this.props.header}</h1>
        <h2>List of bookings: </h2>
        <div>{list}</div>
        <div className="newGuestInfoInput">
          <h2>Add Guest:</h2>
          <div>
            <h3>Name</h3>
            <input
              type="text"
              name="name"
              onChange={
                event => this.onCreateNewGuestInputInfo(event)
                //this.setState({ [event.target.name]: event.target.value })
              }
            />
          </div>
          <div>
            <h3>Email</h3>
            <input
              type="text"
              name="email"
              onChange={event =>
                //this.setState({ [event.target.name]: event.target.value })
                this.onCreateNewGuestInputInfo(event)
              }
            />
          </div>
          <div>
            <h3>Telephone</h3>
            <input
              type="text"
              name="telephone"
              onChange={event =>
                //this.setState({ [event.target.name]: event.target.value })
                this.onCreateNewGuestInputInfo(event)
              }
            />
          </div>
          <div>
            <h3>Date</h3>
            <input
              type="text"
              name="bdate"
              onChange={event =>
                //this.setState({ [event.target.name]: event.target.value })
                this.onCreateNewGuestInputInfo(event)
              }
            />
          </div>
          <div>
            <h3>Time</h3>
            <input
              type="text"
              name="btime"
              onChange={event =>
                // this.setState({ [event.target.name]: event.target.value })
                this.onCreateNewGuestInputInfo(event)
              }
            />
          </div>
          <div>
            <h3>Number Of Guests</h3>
            <input
              type="text"
              name="numberOfGuests"
              onChange={event =>
                // this.setState({ [event.target.name]: event.target.value })
                this.onCreateNewGuestInputInfo(event)
              }
            />
          </div>
          <button onClick={this.postBooking}>Create new record</button>
        </div>
      </React.Fragment>
    );
  }

  clickHandlerPostNewBooking(item) {
    return this.updateBooking(
      item.id,
      item.name,
      item.email,
      item.telephone,
      item.bdate,
      item.btime,
      item.numberOfGuests
    );
  }
}
export default Admin;
