import { motion } from "framer-motion";
import Preview from "./Preview";
export const PreviewPage = ({ jobs, preview, success, handleDownload }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {jobs.length > 0 && <Preview jobs={jobs} />}

      {preview && (
        <button
          className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center mt-6"
          onClick={handleDownload}
        >
          <svg
            className="fill-current w-5 h-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download</span>
        </button>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-md"
        >
          File downloaded successfully!
        </motion.div>
      )}
    </div>
  );
};