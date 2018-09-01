import React, { Component } from "react";
import "./../App.css";
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
//import CalendarInputDayPicker from "./CalendarInputDayPicker";
import ListOfBookings from "./ListOfBookings";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.handleDayChangeUpdate = this.handleDayChangeUpdate.bind(this);
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
        new Date(
          "Tue Sep 14 2018 12:00:00 GMT+0200 (centraleuropeisk sommartid)"
        ),
        new Date(
          "Tue Sep 15 2018 12:00:00 GMT+0200 (centraleuropeisk sommartid)"
        ),
        new Date("2018-09-1"),
        new Date("2018-09-2"),
        new Date("2018-09-3")
      ],

      availableAt18: true,
      availableAt21: true,

      //isNewBookingAdded: false
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
    //console.log("Event name: " + eventTargetName);
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

    this.fetchAllBookings();
  };

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();

    // console.log(selectedDay);

    const updateNewBooking = {
      bdate: input.value
      //bdate: selectedDay
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
  }

  handleDayChangeUpdate(selectedDay, modifiers, dayPickerInput) {
    //console.log(index);
    //let inp = dayPickerInput.getInput();
    //console.log(inp.name);
    console.log(this.state.allBookings);
    let newBookings = this.state.allBookings; // create the copy of state array
    const input = dayPickerInput.getInput();
    let index = input.name;

    newBookings[index].bdate = input.value;

    // console.log(selectedDay);

    /*     const updateNewBooking = {
      bdate: input.value
      //bdate: selectedDay
    };

    const updatedBooking = Object.assign(
      this.state.newBooking,
      updateNewBooking
    ); */
    this.setState({
      //   newBooking: updatedBooking,
      allBookings: newBookings,
      selectedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true
    });
  }

  render() {
    if (!this.state.allBookings) {
      return <div>Loading...</div>;
    }
    // console.log("this.state.allBookings" + this.state.allBookings);
    const { selectedDay, isDisabled, isEmpty } = this.state;
    const { disabledDates } = this.state;
    const { isAddNewGuestFormVisible } = this.state;
    const { isEditFieldVisible } = this.state;

    let list = this.state.allBookings.map((item, index) => (
      <tr key={item.bid}>
        <td> {index + 1} </td>
        <td>{item.customerId}</td>
        <td>
          {isEditFieldVisible ? (
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
          {isEditFieldVisible ? (
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
          {isEditFieldVisible ? (
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
          {isEditFieldVisible ? (
            <div>
              <p>
                {isEmpty && "Please type or pick a day"}
                {!isEmpty && !selectedDay && "This day is invalid"}
                {selectedDay && isDisabled && "This day is disabled"}
                {selectedDay &&
                  !isDisabled &&
                  `You chose ${selectedDay.toLocaleDateString()}`}
              </p>
              {index}
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
          {isEditFieldVisible ? (
            <div>
              <form action="">
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
              </form>
            </div>
          ) : (
            <div>{item.btime}</div>
          )}
        </td>
        <td>
          {isEditFieldVisible ? (
            <input
              type="number"
              min="1"
              max="6"
              value={item.numberOfGuests}
              name="numberOfGuests"
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value, index)
              }
            />
          ) : (
            <div>{item.numberOfGuests}</div>
          )}
        </td>
        <td>
          <button>
            <i
              onClick={() =>
                this.setState({
                  isEditFieldVisible: !this.state.isEditFieldVisible
                })
              }
              className="fas fa-pencil-alt"
            />{" "}
          </button>
        </td>
        <td>
          <button
            className="updateButton"
            onClick={this.clickHandlerUpdateBooking.bind(this, item)}
            /*             onClick={e => {
              this.clickHandlerUpdateBooking.bind(this, item);
              this.setState({
                isEditFieldVisible: !this.state.isEditFieldVisible
              });
            }} */
          >
            Update! <i className="fas fa-check" />
          </button>
        </td>
        <td>
          <button>
            <i
              onClick={this.onClickDeleteHandler.bind(this, item.bid)}
              className="fas fa-times"
            />
          </button>
        </td>
      </tr>
    ));

    return (
      <React.Fragment>
        <div className="adminPanel">
          <h1>{this.props.header}</h1>
          <h2>List of bookings: </h2>
          <table className="tableListABooking">
            <thead>
              <tr>
                <th>Nr</th>
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
              <i
                onClick={() =>
                  this.setState({
                    isAddNewGuestFormVisible: !this.state
                      .isAddNewGuestFormVisible
                  })
                }
                className="fas fa-plus"
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
        </div>
      </React.Fragment>
    );
  }
}
export default Admin;
