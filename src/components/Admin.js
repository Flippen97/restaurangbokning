import React, { Component } from "react";
import "./../App.css";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /*** Booking: ***/
      allBookings: [],
      newBooking: {
        bdate: "",
        btime: "",
        numberOfGuests: "",
        name: "",
        email: "",
        telephone: ""
      },

      //isNewBookingAdded: false
      isBookingInfoVisible: true,
      isAddNewGuestFormVisible: false,
      isEditFieldVisible: false
    };

    this.clickHandlerUpdateBooking = this.clickHandlerUpdateBooking.bind(this);

    this.onClickDeleteHandler = this.onClickDeleteHandler.bind(this);
  }

  fetchAllBookings = () => {
    fetch("https://www.idabergstrom.se/restaurant-api/fetchAll.php")
      .then(response => response.json())
      .then(data => {
        this.setState({ allBookings: data });
      });
  };

  componentDidMount() {
    this.fetchAllBookings();
    /*     fetch("https://www.idabergstrom.se/restaurant-api/fetchAll.php")
      .then(response => response.json())
      .then(data => {
        this.setState({ allBookings: data });
      }); */
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

  postBooking = event => {
    fetch(`https://www.idabergstrom.se/restaurant-api/create.php`, {
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
    fetch("https://www.idabergstrom.se/restaurant-api/update.php", {
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
  }

  deleteBooking = bid => {
    fetch("https://www.idabergstrom.se/restaurant-api/deleteBooking.php", {
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
    this.fetchAllBookings();
  };

  /*  onShowClick = e => {
    this.setState({ isBookingInfoVisible: !this.state.isBookingInfoVisible });
  }; */

  clickHandlerUpdateBooking = item => {
    this.updateBooking(
      item.id,
      item.name,
      item.email,
      item.telephone,
      item.bdate,
      item.btime,
      item.numberOfGuests
    );

    this.fetchAllBookings();
  };

  render() {
    if (!this.state.allBookings) {
      return <div>Loading...</div>;
    }
    // console.log(this.state.allBookings);
    const { isBookingInfoVisible } = this.state;
    const { isAddNewGuestFormVisible } = this.state;
    const { isEditFieldVisible } = this.state;
    let test = "testDiv";
    console.log(test);
    let list = this.state.allBookings.map((item, index) => (
      <div key={item.bid}>
        <h3>Input fields to change info</h3>
        {index + 1} &nbsp; Customer ID: {item.bid} &nbsp; <br />
        Name: {item.name}{" "}
        <i
          onClick={() =>
            this.setState({
              isEditFieldVisible: !this.state.isEditFieldVisible
            })
          }
          className="fas fa-pencil-alt"
        />{" "}
        &nbsp;
        <i
          onClick={this.onClickDeleteHandler.bind(this, item.bid)}
          className="fas fa-times"
        />{" "}
        &nbsp;{" "}
        <i
          onClick={() =>
            this.setState({
              isBookingInfoVisible: !this.state.isBookingInfoVisible
            })
          }
          className="fas fa-sort-down"
        />
        {isBookingInfoVisible ? (
          <div className="all-bookings">
            &nbsp;{" "}
            <div className="fullBookingInfo">
              {isEditFieldVisible ? (
                <input
                  name="name"
                  type="text"
                  value={item.name}
                  onChange={event =>
                    this.onInputChange(
                      event.target.name,
                      event.target.value,
                      index
                    )
                  }
                />
              ) : null}{" "}
              &nbsp;Email: {item.email} &nbsp;{" "}
              <i className="fas fa-pencil-alt" /> &nbsp;
              <input
                type="text"
                name="email"
                value={item.email}
                onChange={event =>
                  this.onInputChange(
                    event.target.name,
                    event.target.value,
                    index
                  )
                }
              />
              &nbsp;Telephone: {item.telephone} &nbsp;{" "}
              <i className="fas fa-pencil-alt" /> &nbsp;
              <input
                type="text"
                value={item.telephone}
                name="telephone"
                onChange={event =>
                  this.onInputChange(
                    event.target.name,
                    event.target.value,
                    index
                  )
                }
              />
              &nbsp; Date: {item.bdate} &nbsp;{" "}
              <i className="fas fa-pencil-alt" /> &nbsp;
              <input
                type="text"
                value={item.bdate}
                name="bdate"
                onChange={event =>
                  this.onInputChange(
                    event.target.name,
                    event.target.value,
                    index
                  )
                }
              />{" "}
              &nbsp; Time: {item.btime} &nbsp;{" "}
              <i className="fas fa-pencil-alt" /> &nbsp;
              <input
                type="text"
                value={item.btime}
                name="btime"
                onChange={event =>
                  this.onInputChange(
                    event.target.name,
                    event.target.value,
                    index
                  )
                }
              />
              &nbsp; Number of Guests: {item.numberOfGuests} &nbsp;{" "}
              <i className="fas fa-pencil-alt" /> &nbsp;
              <input
                type="text"
                value={item.numberOfGuests}
                name="numberOfGuests"
                onChange={event =>
                  this.onInputChange(
                    event.target.name,
                    event.target.value,
                    index
                  )
                }
              />
            </div>
            <button onClick={this.clickHandlerUpdateBooking.bind(this, item)}>
              Update!
            </button>
          </div>
        ) : null}
      </div>
    ));

    return (
      <React.Fragment>
        <h1>{this.props.header}</h1>
        <h2>List of bookings: </h2>
        <div>{list}</div>

        <div className="newGuestInfoInput">
          <h2>
            Add Guest: &nbsp;{" "}
            <i
              onClick={() =>
                this.setState({
                  isAddNewGuestFormVisible: !this.state.isAddNewGuestFormVisible
                })
              }
              className="fas fa-sort-down"
            />
          </h2>
          {isAddNewGuestFormVisible ? (
            <form>
              <ul>
                <li>
                  <h3>Name</h3>
                  <input
                    type="text"
                    name="name"
                    onChange={
                      event => this.onCreateNewGuestInputInfo(event)
                      //this.setState({ [event.target.name]: event.target.value })
                    }
                  />
                </li>
                <li>
                  <h3>Email</h3>
                  <input
                    type="text"
                    name="email"
                    onChange={event =>
                      //this.setState({ [event.target.name]: event.target.value })
                      this.onCreateNewGuestInputInfo(event)
                    }
                  />
                </li>
                <li>
                  <h3>Telephone</h3>
                  <input
                    type="text"
                    name="telephone"
                    onChange={event =>
                      //this.setState({ [event.target.name]: event.target.value })
                      this.onCreateNewGuestInputInfo(event)
                    }
                  />
                </li>
                <li>
                  <h3>Date</h3>
                  <input
                    type="text"
                    name="bdate"
                    onChange={event =>
                      //this.setState({ [event.target.name]: event.target.value })
                      this.onCreateNewGuestInputInfo(event)
                    }
                  />
                </li>
                <li>
                  <h3>Time</h3>
                  <input
                    type="text"
                    name="btime"
                    onChange={event =>
                      // this.setState({ [event.target.name]: event.target.value })
                      this.onCreateNewGuestInputInfo(event)
                    }
                  />
                </li>
                <li>
                  <h3>Number Of Guests</h3>
                  <input
                    type="text"
                    name="numberOfGuests"
                    onChange={event =>
                      // this.setState({ [event.target.name]: event.target.value })
                      this.onCreateNewGuestInputInfo(event)
                    }
                  />
                </li>
              </ul>
              <button onClick={this.postBooking}>Create new record</button>
            </form>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}
export default Admin;
