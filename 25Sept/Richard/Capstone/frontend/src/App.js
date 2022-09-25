import "./App1.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/auth";

import AlertComp from "./components/alertComp";

import Navi from "./pages/Navigation";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedRoute = () => {
  const { auth } = useAuth();
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
function App() {
  const { auth, showAlert, alertMessage, hideAlert } = useAuth();
  return (
    <div>
      <AlertComp
        showAlert={showAlert}
        alertMessage={alertMessage}
        hideAlert={hideAlert}
      />
      {auth && <Navi />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

{
  /* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */
}

export default App;
