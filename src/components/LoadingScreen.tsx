const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-charcoal text-white">
      <span className="loader"></span>
      <p className="text-lg font-semibold mt-35 pl-15 text-center">
        Loading data...
      </p>
      <p className="text-md font-semibold pl-15 text-center">
        it might take a while
      </p>
    </div>
  );
};

export default LoadingScreen;
