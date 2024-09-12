const Error = ({ errorMessage }: { errorMessage: string }) => {
  if (errorMessage !== "") {
    return <p style={{color: "red"}}>{errorMessage}</p>;
  }
};

export default Error;
