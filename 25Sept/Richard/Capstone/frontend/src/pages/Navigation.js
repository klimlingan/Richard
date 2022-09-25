import Nav from "react-bootstrap/Nav";
import { useAuth } from "../context/auth";

function Navi() {
  const { handleLogout } = useAuth();
  return (
    <>
      <Nav className="justify-content-center" activeKey="/">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Nav.Link>
        </Nav.Item>
        <Nav.Item></Nav.Item>
      </Nav>
    </>
  );
}

export default Navi;
