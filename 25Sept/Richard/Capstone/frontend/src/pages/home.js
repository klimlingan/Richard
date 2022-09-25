import React, { useState } from "react";
import Calendar from "react-calendar";

import moment from "moment";

import ShiftTable from "./Shifts_Table";
import BookingShift from "./Booking_Shift";

import "../App1.css";

import { useAuth } from "../context/auth";
import { ShiftProvider } from "../context/shifts";

function Home() {
  const { auth, firstName } = useAuth();

  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };
  return (
    <div>
      <p>
        Hi, <b>{auth && firstName ? `${firstName}` : ""}!</b> Please take time
        to pick your desired date in the calendar.
      </p>
      <ShiftProvider>
        <div className="Main">
          <div>
            <Calendar
              tileDisabled={({ date, view }) =>
                view === "month" && date < new Date() - 24 * 60 * 60 * 1000
              }
              value={dateState}
              onChange={changeDate}
            />
          </div>
          <div className="Book">
            <p>
              Please pick the shift you want on{" "}
              <b>{moment(dateState).format("MMMM Do YYYY")}</b>
            </p>
            <BookingShift date={dateState} />
          </div>
        </div>
        <ShiftTable />
      </ShiftProvider>
    </div>
  );
}

export default Home;
