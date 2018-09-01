import React, { Component } from "react";
import "./../App.css";
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import CalendarInputDayPicker from "./CalendarInputDayPicker";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);
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
      //Calendar
      selectedDay: undefined,
      isEmpty: true,
      isDisabled: false,

      disabledDates: [
        new Date(2018, 8, 12),
        new Date(2018, 8, 15),
        new Date(2018, 9, 16)
      ],

      availableAt18: true,
      availableAt21: true,

      //isNewBookingAdded: false
      isBookingInfoVisible: false,
      isAddNewGuestFormVisible: false,
      islistOfBookingsVisible: true,
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

  /*  handleDayChange(day) {
    this.setState({ selectedDay: day });
  } */

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    console.log(input.value);
    //this.onCreateNewGuestInputInfo(event)
    const updateNewBooking = {
      bdate: input.value
    };

    const updatedBooking = Object.assign(
      this.state.newBooking,
      updateNewBooking
    );
    /*       this.setState({
        newBooking: updatedBooking
      }); */

    this.setState({
      newBooking: updatedBooking,
      selectedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true
    });
  }

  render() {
    if (!this.state.allBookings) {
      return <div>Loading...</div>;
    }
    const { selectedDay, isDisabled, isEmpty } = this.state;
    const { disabledDates } = this.state;
    //const { selectedDay } = this.state;
    // console.log(this.state.allBookings);
    const { isBookingInfoVisible } = this.state;
    const { isAddNewGuestFormVisible } = this.state;
    const { isEditFieldVisible } = this.state;
    const { islistOfBookingsVisible } = this.state;

    let list = this.state.allBookings.map((item, index) => (
      <div key={item.bid}>
        <br />
        {index + 1} &nbsp; Customer ID: {item.bid} &nbsp;{" "}
        <i
          onClick={() =>
            this.setState({
              isEditFieldVisible: !this.state.isEditFieldVisible,
              islistOfBookingsVisible: !this.state.islistOfBookingsVisible
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
        />{" "}
        <br />
        <br />
        Name:{" "}
        {(islistOfBookingsVisible && !isEditFieldVisible) ||
        (isBookingInfoVisible && !isEditFieldVisible) ? (
          <span> {item.name} </span>
        ) : null}
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
              <br />
              <div>Email: </div>
              {islistOfBookingsVisible ? <div> {item.email} </div> : null}
              {isEditFieldVisible ? (
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
              ) : null}
              <br />
              <div>Telephone: </div>
              {islistOfBookingsVisible ? <div> {item.telephone} </div> : null}
              {isEditFieldVisible ? (
                <input
                  type="number"
                  max="999999999999"
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
              ) : null}{" "}
              <br />
              <div>Date: </div>
              {islistOfBookingsVisible ? <div> {item.bdate} </div> : null}
              {isEditFieldVisible ? (
                <CalendarInputDayPicker />
              ) : /*                 <input
                  type="date"
                  min="2018-09-01"
                  value={item.bdate}
                  name="bdate"
                  onChange={event =>
                    this.onInputChange(
                      event.target.name,
                      event.target.value,
                      index
                    )
                  }
                /> */
              null}{" "}
              <br />
              <div> Time: </div>
              {islistOfBookingsVisible ? <div> {item.btime} </div> : null}
              {isEditFieldVisible ? (
                <div>
                  <input
                    type="number"
                    min="18"
                    max="21"
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
                  <input
                    type="radio"
                    value="18"
                    name="btime"
                    onChange={event =>
                      this.onInputChange(
                        event.target.name,
                        event.target.value,
                        index
                      )
                    }
                  />
                  18
                  <input
                    type="radio"
                    value="21"
                    name="btime"
                    onChange={event =>
                      this.onInputChange(
                        event.target.name,
                        event.target.value,
                        index
                      )
                    }
                  />
                  21
                </div>
              ) : null}{" "}
              <br />
              <div>Number of Guests: </div>
              {islistOfBookingsVisible ? (
                <div> {item.numberOfGuests} </div>
              ) : null}
              {isEditFieldVisible ? (
                <input
                  type="number"
                  min="1"
                  max="6"
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
              ) : null}
            </div>{" "}
            <br />
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
                  {/*                  <div>
                    {selectedDay && (
                      <p>Day: {selectedDay.toLocaleDateString()}</p>
                    )}
                    {!selectedDay && <p>Choose a day</p>}
                    <DayPickerInput
                      dayPickerProps={{
                        month: new Date(2018, 10),
                        showWeekNumbers: true,
                        todayButton: "Today"
                      }}
                      disabledDays={disabledDates.map(date => new Date(date))}
                      onDayChange={this.handleDayChange}
                      onChange={event =>
                        //this.setState({ [event.target.name]: event.target.value })
                        this.onCreateNewGuestInputInfo(event)
                      }
                    />
                  </div> */}

                  <div>
                    <p>
                      {isEmpty && "Please type or pick a day"}
                      {!isEmpty && !selectedDay && "This day is invalid"}
                      {selectedDay && isDisabled && "This day is disabled"}
                      {selectedDay &&
                        !isDisabled &&
                        `You chose ${selectedDay.toLocaleDateString()}`}
                    </p>
                    <DayPickerInput
                      value={selectedDay}
                      onDayChange={this.handleDayChange}
                      dayPickerProps={{
                        selectedDays: selectedDay,
                        disabledDays: disabledDates.map(date => new Date(date))
                        /*               disabledDays: {
                daysOfWeek: [0, 6]
              } */
                      }}
                    />
                  </div>

                  {/*                   <input
                    type="text"
                    name="bdate"
                    onChange={event =>
                      //this.setState({ [event.target.name]: event.target.value })
                      this.onCreateNewGuestInputInfo(event)
                    }
                  /> */}
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
