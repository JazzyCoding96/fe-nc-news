import React from 'react'

function ErrorPage({ error = { status: 404, data: { msg: 'Page Not Found' } } }) {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h2>Error!</h2>
      <h3>
        {error.status}: {error.data.msg}
      </h3>
    </div>
  );
}

export default ErrorPage