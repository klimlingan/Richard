import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";
import { useShift } from "../context/shifts";

function BookingShift({ date }) {
  const { morningShift, afternoonShift, nightShift, shifts, addShift, deleteShift } =
    useShift();

  const haldleAdd = (shiftTime) => {
    const shift = {
      shift_date: moment(date).format("MM/DD/YYYY"),
      start_time: shiftTime.start_time.slice(11, 16),
      end_time: shiftTime.end_time.slice(11, 16),
    };

    const shift_date = moment(date).format("MM/DD/YYYY");
    const shift_start_time = moment(
      shift_date + " " + shiftTime.start_time.slice(11)
    ).format("MM/DD/YYYY HH:mm:ss");

    addShift(shift);
    alert(`You have booked a shift on ${shift_start_time}`);
  };

  const handleDelete = (shiftTime) => {
    const shift = {
      shift_date: moment(date).format("MM/DD/YYYY"),
      start_time: shiftTime.start_time.slice(11, 16),
      end_time: shiftTime.end_time.slice(11, 16),
    };

    const shift_date = moment(date).format("MM/DD/YYYY");
    const shift_start_time = moment(
      shift_date + " " + shiftTime.start_time.slice(11)
    ).format("MM/DD/YYYY HH:mm:ss");

    deleteShift(shift);
    alert(`You have deleted a shift on ${shift_start_time}. Contact the person if it's not you.`);
  };

  const canAddShift = (start_time) => {
    // check if the shift is already booked
    const shift_date = moment(date).format("MM/DD/YYYY");
    // add start time to shift date
    const shift_start_time = moment(
      shift_date + " " + start_time.slice(11)
    ).format("MM/DD/YYYY HH:mm:ss");

    const shift = shifts.find((shift) => {
      const shifts_start_time = moment(shift.start_time).format(
        "MM/DD/YYYY HH:mm:ss"
      );

      if (shifts_start_time === shift_start_time) {
        return shift;
      }
    });
    if (shift) {
      return true;
    }
    return false;
  };

  const canDeleteShift = (start_time) => {
    // check if the shift is already booked
    const shift_date = moment(date).format("MM/DD/YYYY");
    // add start time to shift date
    const shift_start_time = moment(
      shift_date + " " + start_time.slice(11)
    ).format("MM/DD/YYYY HH:mm:ss");

    const shift = shifts.find((shift) => {
      const shifts_start_time = moment(shift.start_time).format(
        "MM/DD/YYYY HH:mm:ss"
      );

      if (shifts_start_time === shift_start_time) {
        return shift;
      }
    });
    if (shift) {
      return false;
    }
    return true;
  };


  return (
    <ListGroup>
      <ListGroup.Item
        action
        onClick={() => haldleAdd(morningShift)}
        disabled={canAddShift(morningShift.start_time)}
      >
        Book Morning Shift
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => haldleAdd(afternoonShift)}
        disabled={canAddShift(afternoonShift.start_time)}
      >
        Book Afternoon Shift
      </ListGroup.Item>
      <ListGroup.Item
        action
        onClick={() => haldleAdd(nightShift)}
        disabled={canAddShift(nightShift.start_time)}
      >
        Book Night Shift
      </ListGroup.Item>
     <ListGroup.Item
      action
      onClick={() => handleDelete(morningShift)}
      disabled={canDeleteShift(morningShift.start_time)}
     >
      Delete Morning Shift
     </ListGroup.Item>
     <ListGroup.Item
      action
      onClick={() => handleDelete(afternoonShift)}
      disabled={canDeleteShift(afternoonShift.start_time)}
     >
      Delete Afternoon Shift
     </ListGroup.Item>
     <ListGroup.Item
      action
      onClick={() => handleDelete(nightShift)}
      disabled={canDeleteShift(nightShift.start_time)}
     >
      Delete Night Shift
     </ListGroup.Item>
  </ListGroup>
  );
}

export default BookingShift;
