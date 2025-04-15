const ErrorMessage = ({message}) => {
  return (
    <div className="text-center text-red-600 text-xl min-h-screen flex items-center justify-center">
      {message}
    </div>
  );
};

export default ErrorMessage;
