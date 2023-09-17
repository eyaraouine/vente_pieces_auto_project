function ErrorPage({ message }: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20%",
        color: "red",
      }}
    >
      <h3> {message ?? "403-Forbidden"} </h3>
    </div>
  );
}

export default ErrorPage;
