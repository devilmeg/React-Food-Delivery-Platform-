const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
        📞 Contact Us
      </h1>

      <p className="text-gray-600 text-center mb-10">
        Have questions or feedback? We’d love to hear from you.  
        Fill out the form below and we’ll get back to you as soon as possible.
      </p>

      <form className="bg-white shadow-md rounded-xl p-6 md:p-8 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 text-white rounded-lg 
                       shadow-md hover:bg-orange-600 transition font-medium"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact; // this is standard way to export a component
