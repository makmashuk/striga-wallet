import React from "react";

function ErrorMessage({ error }: any) {
  if (!error) {
    return null;
  }

  let message = "An error occurred.";
  if (error.response && error.response.data && error.response.data.message) {
    message = error.response.data.message;
  } else if (error.message) {
    message = error.message;
  }

  return (
    <div style={{ color: "red" }}>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
