
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-75"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-225"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loader;
