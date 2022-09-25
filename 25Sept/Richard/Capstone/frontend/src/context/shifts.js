import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import moment from "moment";

const ShiftContext = createContext();
const useShift = () => useContext(ShiftContext);

function ShiftProvider({ children }) {
  const [shifts, setShifts] = useState([]);

  // morning shift
  const [morningShift, setMorningShift] = useState({
    start_time: moment().format("YYYY-MM-DD 07:00:00"),
    end_time: moment().format("YYYY-MM-DD 15:30:00"),
  });
  // afternoon shift
  const [afternoonShift, setAfternoonShift] = useState({
    start_time: moment().format("YYYY-MM-DD 14:00:00"),
    end_time: moment().format("YYYY-MM-DD 22:30:00"),
  });
  // night shift
  const [nightShift, setNightShift] = useState({
    start_time: moment().format("YYYY-MM-DD 21:30:00"),
    end_time: moment().add(1, "days").format("YYYY-MM-DD 06:00:00"),
  });

  const fetchShifts = async () => {
    try {
      const shift_date = moment().format("MM/DD/YYYY");
      const response = await axios.post("shift/getshift", {
        shift_date,
      });

      setShifts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addShift = async (shift) => {
    console.log(shift);

    try {
      await axios.post("shift/addshift", shift);

      fetchShifts();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteShift = async (shift) => {
    console.log("delete shift");
    console.log(shift);

    try {
      console.log("delete shift context/shift.js")
      await axios.post("shift/deleteshift", shift);

      fetchShifts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ShiftContext.Provider
      value={{
        morningShift,
        afternoonShift,
        nightShift,
        shifts,
        fetchShifts,
        addShift,
        deleteShift
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
}

export { ShiftProvider, useShift };
