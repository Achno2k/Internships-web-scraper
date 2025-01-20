const Preview = ({ jobs }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-300 shadow-xl bg-white max-w-6xl w-full">
      <table className="w-full text-sm text-center text-gray-700">
        <thead className="bg-gray-200 text-gray-600 uppercase font-bold">
          <tr>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Company</th>
            <th className="px-6 py-4">Location</th>
            <th className="px-6 py-4">Duration</th>
            <th className="px-6 py-4">Stipend</th>
            <th className="px-6 py-4">Time Posted</th>
            <th className="px-6 py-4">Link</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition-all`}
            >
              <th className="px-6 py-4 font-medium text-gray-800">
                {job.Title}
              </th>
              <td className="px-6 py-4">{job.Company}</td>
              <td className="px-6 py-4">{job.Location}</td>
              <td className="px-6 py-4">{job.Duration}</td>
              <td className="px-6 py-4">{job.Stipend}</td>
              <td className="px-6 py-4">{job.Posted_time}</td>
              <td className="px-6 py-4">
                <a
                  href={job.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                >
                  Apply
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Preview;