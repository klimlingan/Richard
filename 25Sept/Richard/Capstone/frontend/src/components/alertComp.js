import React from "react";

import Alert from "react-bootstrap/Alert";

function AlertComp({ showAlert, alertMessage, hideAlert }) {
  return (
    <div>
      {showAlert && (
        <>
          <Alert variant="danger" onClose={hideAlert} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{alertMessage}</p>
          </Alert>
        </>
      )}
    </div>
  );
}

export default AlertComp;
