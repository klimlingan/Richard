import Table from "react-bootstrap/Table";
import moment from "moment";
import React, { useEffect } from "react";

import { useShift } from "../context/shifts";

function ShiftTable() {
  const { morningShift, afternoonShift, nightShift, shifts, fetchShifts } =
    useShift();

  useEffect(() => {
    fetchShifts();
  }, []);

  const renderShifts = (index, shiftTime) => {
    const shift_date = moment().add(index, "days").format(" YYYY-MM-DD");
    let shift_start_time = null;

    if (shiftTime === "Morning") {
      shift_start_time = shift_date + morningShift.start_time.slice(10);
    } else if (shiftTime === "Afternoon") {
      shift_start_time = shift_date + afternoonShift.start_time.slice(10);
    } else if (shiftTime === "Night") {
      shift_start_time = shift_date + nightShift.start_time.slice(10);
    }

    const shift = shifts.find((shift) => {
      // shifts_Date = moment(shift.shift_start_time).format("YYYY-MM-DD") ;
      const shifts_start_time = moment(shift.start_time).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      let shift_date = moment(shift_start_time).get("date");
      let shift_month = moment(shift_start_time).get("month");
      let shift_year = moment(shift_start_time).get("year");
      let shift_hour = moment(shift_start_time).get("hour");
      let shift_minute = moment(shift_start_time).get("minute");

      let shifts_date = moment(shifts_start_time).get("date");
      let shifts_month = moment(shifts_start_time).get("month");
      let shifts_year = moment(shifts_start_time).get("year");
      let shifts_hour = moment(shifts_start_time).get("hour");
      let shifts_minute = moment(shifts_start_time).get("minute");

      if (
        shift_date === shifts_date &&
        shift_month === shifts_month &&
        shift_year === shifts_year &&
        shift_hour === shifts_hour &&
        shift_minute === shifts_minute
      ) {
        return shift;
      }
    });
    if (shift) {
      return (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          {shift.first_name} {shift.last_name}
        </p>
      );
    } else {
      return <p>Available</p>;
    }
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Shifts</th>
          {Array.from({ length: 8 }).map((_, index) => (
            <th key={index}>
              {moment().add(index, "days").format("MMMM Do YYYY")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Morning</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>{renderShifts(index, "Morning")}</td>
          ))}
        </tr>
        <tr>
          <td>Afternoon</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>{renderShifts(index, "Afternoon")}</td>
          ))}
        </tr>
        <tr>
          <td>Night</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>{renderShifts(index, "Night")}</td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}
export default ShiftTable;
