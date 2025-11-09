import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">⚠️ OOps!!!!!!!</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Something went wrong
      </h2>
      <h3 className="text-lg text-gray-600">
        {err.status} : {err.statusText}
      </h3>

      {/* Button to go Home */}
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg 
                   shadow-md hover:bg-orange-600 transition font-medium"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default Error; // this is standard way to export a component
