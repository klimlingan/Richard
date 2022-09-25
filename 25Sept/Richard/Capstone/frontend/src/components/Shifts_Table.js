import Table from 'react-bootstrap/Table';
import moment from 'moment';

function ShiftTable() {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Shifts</th>
          {Array.from({ length: 8 }).map((_, index) => (
            <th key={index}>{moment().add(index,"days").format('MMMM Do YYYY')}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Morning</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>Afternoon</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>Night</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}
export default ShiftTable;