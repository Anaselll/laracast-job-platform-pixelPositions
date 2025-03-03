import { useContext, useEffect, useState } from "react";
import NoChatSelected from "../components/noChatSelected";
import { axiosInstance } from "../lib/axios";
import { AuthContext } from "../context/AuthContext";
interface Choice{
  role: string;
  userId: string;
  status: string
}
interface Session{
  _id: string;
  subject: string;
  
}
export default function Session() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const { user } = useContext(AuthContext);
  const [choices, setChoices] = useState<Choice>({
    role: "student",
    userId: user._id,
    status: "scheduled",
  });

  useEffect(() => {
    const fetchSessions = async () => {
      await axiosInstance
        .get("sessions", {
          params: choices,
        })
        .then((res) => {
          console.log(res.data);
          setSessions(res.data);
        })
        .catch(() => {
          console.log("error fetch sessions");
        });
    };
    fetchSessions();
  }, [choices]);

  const handleStatusChange = (status: string) => {
    setChoices({ ...choices, status });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-50">
      {/* Left Panel - Sessions List */}
      <div className="border-r border-gray-200 overflow-hidden flex flex-col">
        {/* Header with Filters */}
        <div className="bg-gray-300- p-4 border-b border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-xl font-semibold text-gray-800">My Sessions</h1>

            <div className="relative">
              <select
                value={choices.role}
                onChange={(e) =>
                  setChoices({ ...choices, role: e.target.value })
                }
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
              >
                <option value="student">I'm a Student</option>
                <option value="tutor">I'm a Tutor</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex space-x-2 border-b border-gray-200">
            <button
              onClick={() => handleStatusChange("scheduled")}
              className={`px-4 py-2 font-medium text-sm ${
                choices.status === "scheduled"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Scheduled
            </button>
            <button
              onClick={() => handleStatusChange("completed")}
              className={`px-4 py-2 font-medium text-sm ${
                choices.status === "completed"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => handleStatusChange("closed")}
              className={`px-4 py-2 font-medium text-sm ${
                choices.status === "closed"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Closed
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                onClick={() => {
                  if(session==selectedSession){
                    setSelectedSession(null)
                  }else{
                  setSelectedSession(session);

                  }
                }}
                className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition duration-150 cursor-pointer ${
                  selectedSession?._id === session._id
                    ? "border-indigo-500 ring-2 ring-indigo-200"
                    : "border-gray-200"
                }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-medium text-gray-800">
                      {session.offer_id.subject}
                    </h2>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        session.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : session.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Student</p>
                      <p className="font-medium text-gray-900">
                        {session.student_id.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tutor</p>
                      <p className="font-medium text-gray-900">
                        {session.tutor_id.fullName}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                    <div>
                      <span>Date: </span>
                      <span className="font-medium text-gray-700">
                        {formatDate(session.offer_id.date)}
                      </span>
                    </div>
                    <div>
                      <span>Duration: </span>
                      <span className="font-medium text-gray-700">
                        {session.offer_id.dure}{" "}
                        {session.offer_id.dure === 1 ? "hour" : "hours"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-gray-500 text-lg">No sessions found</p>
              <p className="text-gray-400 text-sm mt-1">
                Try changing your filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Session Details */}
      <div className="bg-white overflow-hidden">
        {selectedSession ? (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedSession.offer_id.subject}
              </h2>
              <div className="mt-2 text-gray-600">
                {selectedSession.offer_id.description}
              </div>
            </div>
            <div className="p-6 flex-grow overflow-y-auto">
              {/* Session details content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Student
                  </h3>
                  <p className="text-gray-800">
                    {selectedSession.student_id.fullName}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {selectedSession.student_id.email}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Tutor
                  </h3>
                  <p className="text-gray-800">
                    {selectedSession.tutor_id.fullName}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {selectedSession.tutor_id.email}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg col-span-full">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Session Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">
                        {formatDate(selectedSession.offer_id.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium">
                        {selectedSession.offer_id.dure}{" "}
                        {selectedSession.offer_id.dure === 1 ? "hour" : "hours"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedSession.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : selectedSession.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedSession.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500">Category</p>
                      <p className="font-medium">
                        {selectedSession.offer_id.tags?.join(", ") ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
          </div>
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
}
