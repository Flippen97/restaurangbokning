import React, { Component } from "react";
import "./../../App.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import moment from "moment";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleDayChangeUpdate = this.handleDayChangeUpdate.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.onDayClick = this.onDayClick.bind(this);

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

      /*** Booking: ***/
      //bdate is today - booknings day
      bdate: "",
      availableAt18: true,
      availableAt21: true,
      disabledDates: [],

      isAddNewGuestFormVisible: false,
      isEditFieldVisible: false,

      indexFromEditButton: ""
    };

    this.clickHandlerUpdateBooking = this.clickHandlerUpdateBooking.bind(this);
    this.onClickDeleteHandler = this.onClickDeleteHandler.bind(this);
  }

  fetchAllBookings = () => {
    fetch("https://www.idabergstrom.se/restaurant-api/fetchAll.php")
      .then(response => response.json())
      .then(data => {
        this.setState({ allBookings: data });
        this.disabledDates();
      });
  };

  disabledDates = () => {
    let bookingsArray = this.state.allBookings;
    var counts = {};
    let disabledDatesArray = [];
    /* This counts how many times a specific date has occured in the bookingsArray: */
    bookingsArray.forEach(function(x) {
      counts[x.bdate] = (counts[x.bdate] || 0) + 1;
    });
    /* This takes bookings that has over 30 counts (= restaurant fully booked) and push them into disabledDates state: */
    for (var key in counts) {
      if (counts[key] >= 30) {
        disabledDatesArray.push(key);
      }
    }
    this.setState({ disabledDates: disabledDatesArray });
  };

  isSittingAvailable = () => {
    let selectedDate = this.state.bdate;
    let bookingsArray = this.state.allBookings;
    const bookingsAt18 = bookingsArray.filter(
      day => new Date(day.bdate).getTime() === new Date(selectedDate).getTime()
    );
    const bookingsAt21 = bookingsArray.filter(
      day => day.bdate === selectedDate && day.btime === "21"
    );
    /* There are 15 tables, but we have to count with 14 here because of how array works: */
    if (bookingsAt18.length >= 15) {
      this.setState({ availableAt18: false });
    }
    if (bookingsAt21.length >= 15) {
      this.setState({ availableAt21: false });
    }
  };

  componentDidMount() {
    this.fetchAllBookings();
    if (this.state.allBookings.length) {
      this.state.allBookings.map((item, index) => this.disabledDates());
    }
  }

  onInputChange(eventTargetName, newValue, index) {
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

    //this.fetchAllBookings();
    this.setState({ isEditFieldVisible: false });
  };

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    const updateNewBooking = {
      bdate: input.value
    };

    const updatedBooking = Object.assign(
      this.state.newBooking,
      updateNewBooking
    );
    this.setState({
      newBooking: updatedBooking,
      selectedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true
    });

    this.onDayClick();
  }

  handleDayChangeUpdate(selectedDay, modifiers, dayPickerInput) {
    let newBookings = this.state.allBookings; // create the copy of state array
    const input = dayPickerInput.getInput();
    let index = input.name;

    newBookings[index].bdate = input.value;

    this.setState({
      //   newBooking: updatedBooking,
      allBookings: newBookings,
      selectedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true
    });

    this.onDayClick();
  }

  onDayClick = (event, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }

    this.setState({ selectedDate: event });
    let selectedDate = event;
    /* Date is formatted to be compatible with disable date-function in calender: */
    selectedDate = moment(selectedDate).format("YYYY[-]MM[-]DD");

    this.setState({ bdate: selectedDate }, () => {
      /* If a date is selected, we need to check which times are available on that date, 
               so we are running another function to check that: isSittingAvailable() */
      this.isSittingAvailable();
    });
  };

  render() {
    if (!this.state.allBookings) {
      return <div>Loading...</div>;
    }

    const { selectedDay, isDisabled, isEmpty } = this.state;
    const { disabledDates } = this.state;
    const { isAddNewGuestFormVisible } = this.state;
    const { isEditFieldVisible } = this.state;
    const { indexFromEditButton } = this.state;
    const { availableAt18, availableAt21 } = this.state;

    let list = this.state.allBookings.map((item, index) => (
      <tr key={item.bid}>
        {/* <td> {index + 1} </td> */}
        <td>{item.bid}</td>
        <td>{item.customerId}</td>
        <td>
          {isEditFieldVisible && indexFromEditButton === index ? (
            <input
              name="name"
              type="text"
              value={item.name}
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value, index)
              }
            />
          ) : (
            <div>{item.name}</div>
          )}
        </td>
        <td>
          {isEditFieldVisible && indexFromEditButton === index ? (
            <input
              type="number"
              max="999999999999"
              value={item.telephone}
              name="telephone"
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value, index)
              }
            />
          ) : (
            <div>{item.telephone}</div>
          )}
        </td>
        <td>
          {isEditFieldVisible && indexFromEditButton === index ? (
            <input
              type="text"
              name="email"
              value={item.email}
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value, index)
              }
            />
          ) : (
            <div>{item.email}</div>
          )}
        </td>
        <td>
          {isEditFieldVisible && indexFromEditButton === index ? (
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
                onDayChange={this.handleDayChangeUpdate}
                inputProps={{ name: index }}
                dayPickerProps={{
                  selectedDays: selectedDay,
                  disabledDays: disabledDates.map(date => new Date(date))
                }}
              />
            </div>
          ) : (
            <div>{item.bdate}</div>
          )}
        </td>
        <td>
          <div>
            {isEditFieldVisible && indexFromEditButton === index ? null : (
              <div>{item.btime}</div>
            )}
            {isEditFieldVisible &&
            availableAt18 &&
            indexFromEditButton === index ? (
              <div>
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
                18.00
              </div>
            ) : null}
            {isEditFieldVisible &&
            availableAt21 &&
            indexFromEditButton === index ? (
              <div>
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
                21.00
              </div>
            ) : null}
          </div>
        </td>
        <td>
          {isEditFieldVisible && indexFromEditButton === index ? (
            <select
              className="selectNumberOfGuests"
              name="numberOfGuests"
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value, index)
              }
            >
              {
                <option value={item.numberOfGuests}>
                  {item.numberOfGuests}
                </option>
              }
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          ) : (
            <div>{item.numberOfGuests}</div>
          )}
        </td>
        <td>
          <button
            onClick={e =>
              this.setState({
                isEditFieldVisible: !this.state.isEditFieldVisible,
                indexFromEditButton: index
              })
            }
          >
            <i className="fas fa-pencil-alt" />
          </button>
        </td>
        <td>
          <button
            className="updateButton"
            onClick={this.clickHandlerUpdateBooking.bind(this, item)}
          >
            Update! <i className="fas fa-check" />
          </button>
        </td>
        <td>
          <button onClick={this.onClickDeleteHandler.bind(this, item.bid)}>
            <i className="fas fa-times" />
          </button>
        </td>
      </tr>
    ));

    return (
      <React.Fragment>
        <div className="adminPanel">
          <h2>Admin Panel</h2>

          <h3 className="subheader">List of bookings: </h3>
          <table className="tableListABooking">
            <thead>
              <tr>
                <th>Booknings ID</th>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Telephone</th>
                <th>Email</th>
                <th>Date</th>
                <th>Time</th>
                <th>Number Of Guests</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </table>
          <div className="newGuestInfoInput">
            <h2>
              Add Guest: &nbsp;{" "}
              <button
                onClick={() =>
                  this.setState({
                    isAddNewGuestFormVisible: !this.state
                      .isAddNewGuestFormVisible
                  })
                }
              >
                <i className="fas fa-plus-circle" />
              </button>
            </h2>
            {isAddNewGuestFormVisible ? (
              <form>
                <ul>
                  <li>
                    <h3>Name</h3>
                    <input
                      type="text"
                      name="name"
                      onChange={event => this.onCreateNewGuestInputInfo(event)}
                    />
                  </li>
                  <li>
                    <h3>Email</h3>
                    <input
                      type="text"
                      name="email"
                      onChange={event => this.onCreateNewGuestInputInfo(event)}
                    />
                  </li>
                  <li>
                    <h3>Telephone</h3>
                    <input
                      type="text"
                      name="telephone"
                      onChange={event => this.onCreateNewGuestInputInfo(event)}
                    />
                  </li>
                  <li>
                    <h3>Date</h3>
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
                          disabledDays: disabledDates.map(
                            date => new Date(date)
                          )
                        }}
                      />
                    </div>
                  </li>
                  <li>
                    <h3>Time</h3>
                    {availableAt21 ? (
                      <div>
                        <input
                          type="radio"
                          value="18"
                          name="btime"
                          onChange={event =>
                            this.onCreateNewGuestInputInfo(event)
                          }
                        />
                        18.00
                      </div>
                    ) : null}
                    {availableAt21 ? (
                      <div>
                        <input
                          type="radio"
                          value="21"
                          name="btime"
                          onChange={event =>
                            this.onCreateNewGuestInputInfo(event)
                          }
                        />
                        21.00
                      </div>
                    ) : null}
                  </li>
                  <li>
                    <h3>Number Of Guests</h3>
                    <select
                      className="selectNumberOfGuests"
                      name="numberOfGuests"
                      onChange={event => this.onCreateNewGuestInputInfo(event)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </li>
                </ul>
                <button onClick={this.postBooking}>Create new record</button>
              </form>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Admin;
