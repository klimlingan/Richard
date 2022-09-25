import Nav from 'react-bootstrap/Nav';

function Navi() {
  return (
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Account</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Logout</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          </Nav.Item>
      </Nav>
    </>
  );
}

export default Navi;