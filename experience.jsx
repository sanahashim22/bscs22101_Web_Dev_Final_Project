

const Experiences = () => {
  return (
    <div className="experiences-page mt-10 px-8 pb-16">
      <h1 className="text-4xl font-bold text-center mb-6">Unique Experiences</h1>
      <p className="text-gray-700 text-lg text-center mb-8">
        Join us for amazing experiences that you won’t forget.
      </p>
      <div className="experience-detail bg-gray-100 border border-gray-400 rounded-md p-4 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Cooking Class
        </h2>
        <p className="text-gray-600">
          Learn to cook traditional dishes with local chefs.
        </p>
      </div>
      <div className="experience-detail bg-gray-100 border border-gray-400 rounded-md p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          City Tour
        </h2>
        <p className="text-gray-600">
          Explore the city with a local guide and discover hidden gems.
        </p>
      </div>
    </div>
  );
};

export default Experiences;
