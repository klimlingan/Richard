import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';

function BookingShift({date}) {
  const alertClickedAM = () => {
    alert(`You have booked a morning shift on ${date}`);
  };
  const alertClickedPM = () => {
    alert(`You have booked an afternoon shift on ${date}`);
  };
  const alertClickedND = () => {
    alert(`You have booked a night shift on ${date}`);
  };

  return (
    <ListGroup>
      <ListGroup.Item action onClick={alertClickedAM}>
        Book Morning Shift
      </ListGroup.Item>
      <ListGroup.Item action onClick={alertClickedPM}>
      Book Afternoon Shift
      </ListGroup.Item>
      <ListGroup.Item action onClick={alertClickedND}>
      Book Night Shift
      </ListGroup.Item>
    </ListGroup>
  );
}

export default BookingShift;