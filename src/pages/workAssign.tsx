import { useState } from 'react';
import { Eye, Check, Trash2, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus } from "lucide-react";

type WorkAssignment = {
  no: number;
  workId: string;
  vehicle: string;
  assignedMechanic: string;
  deadline: string;
  status: string;
};

const initialData: WorkAssignment[] = [
  {
    no: 1,
    workId: "Work-003",
    vehicle: "Mitsubishi L300",
    assignedMechanic: "Carlo",
    deadline: "Oct 14, 2025",
    status: "Diagnosing",
  },
  {
    no: 2,
    workId: "Work-003",
    vehicle: "Mitsubishi L300",
    assignedMechanic: "Carlo",
    deadline: "Oct 14, 2025",
    status: "Diagnosing",
  },
  {
    no: 3,
    workId: "Work-003",
    vehicle: "Mitsubishi L300",
    assignedMechanic: "Carlo",
    deadline: "Oct 14, 2025",
    status: "Diagnosing",
  },
  {
    no: 4,
    workId: "Work-003",
    vehicle: "Mitsubishi L300",
    assignedMechanic: "Carlo",
    deadline: "Oct 14, 2025",
    status: "Diagnosing",
  },
  {
    no: 5,
    workId: "Work-003",
    vehicle: "Mitsubishi L300",
    assignedMechanic: "Carlo",
    deadline: "Oct 14, 2025",
    status: "Diagnosing",
  },
];

export default function WorkAssignment() {
  const [data, setData] = useState<WorkAssignment[]>(initialData);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [issueNotes, setIssueNotes] = useState("");
  const [problemNotes, setProblemNotes] = useState("");

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleStatusChange = (index: number, newStatus: string) => {
    const newData = [...data];
    newData[startIndex + index].status = newStatus;
    setData(newData);
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== startIndex + index);
    setData(newData);
  };

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <section className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">Work Assignment</h1>
          <p className="text-muted-foreground">
            Assign and track work orders for your mechanic team. Monitor deadlines, status updates, and job progress.
          </p>
        </section>

        <div className="flex justify-end mb-4">
          <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium">
            ASSIGN JOB
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Work ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Assigned Mechanic</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Deadline</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-900">{item.no}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.workId}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.vehicle}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.assignedMechanic}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.deadline}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="relative inline-block min-w-[140px]">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(index, e.target.value)}
                          className="appearance-none w-full px-3 py-1.5 pr-8 rounded border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="Diagnosing">Diagnosing</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="On Hold">On Hold</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2 justify-center">
                        <button className="p-2 rounded bg-blue-100 hover:bg-blue-200 transition-colors">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </button>
                        <button className="p-2 rounded bg-green-100 hover:bg-green-200 transition-colors">
                          <Check className="h-4 w-4 text-green-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(index)}
                          className="p-2 rounded bg-red-100 hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-700 px-2">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Issue Encountered */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Issue Encountered</h2>
                <p className="text-sm text-gray-500">notes here...</p>
              </div>
              <button className="p-2 rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-colors">
                <Plus className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <textarea
              value={issueNotes}
              onChange={(e) => setIssueNotes(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Enter issue details..."
            />
          </div>

          {/* Problems */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Problems</h2>
              <p className="text-sm text-gray-500">notes here...</p>
            </div>
            <textarea
              value={problemNotes}
              onChange={(e) => setProblemNotes(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-4"
              placeholder="Enter problem details..."
            />
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Assigned Mechanic</h3>
                <p className="text-base text-gray-900">Carlo</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Status</h3>
                <p className="text-base text-gray-900">Diagnosing</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Deadline</h3>
                <p className="text-base text-gray-900">Oct 14, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}