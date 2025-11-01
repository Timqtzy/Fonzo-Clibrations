import React, { useState } from 'react';
import { Eye, Check, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type Mechanic = {
  no: number;
  id: string;
  fullName: string;
  role: string;
  jobsCompleted: number;
  currentJobs: number;
  efficiency: string;
};

const initialData: Mechanic[] = [
  {
    no: 1,
    id: "Mech-001",
    fullName: "Spider Man",
    role: "Mechanic",
    jobsCompleted: 25,
    currentJobs: 3,
    efficiency: "90%",
  },
  {
    no: 2,
    id: "Mech-001",
    fullName: "Spider Man",
    role: "Mechanic",
    jobsCompleted: 25,
    currentJobs: 3,
    efficiency: "90%",
  },
  {
    no: 3,
    id: "Mech-001",
    fullName: "Spider Man",
    role: "Mechanic",
    jobsCompleted: 25,
    currentJobs: 3,
    efficiency: "90%",
  },
  {
    no: 4,
    id: "Mech-001",
    fullName: "Spider Man",
    role: "Mechanic",
    jobsCompleted: 25,
    currentJobs: 3,
    efficiency: "90%",
  },
  {
    no: 5,
    id: "Mech-001",
    fullName: "Spider Man",
    role: "Mechanic",
    jobsCompleted: 25,
    currentJobs: 3,
    efficiency: "90%",
  },
  {
    no: 6,
    id: "Mech-001",
    fullName: "Spider Man",
    role: "Mechanic",
    jobsCompleted: 25,
    currentJobs: 3,
    efficiency: "90%",
  },
  {
    no: 7,
    id: "Mech-001",
    fullName: "Spider Man",
    role: "Mechanic",
    jobsCompleted: 25,
    currentJobs: 3,
    efficiency: "90%",
  },
];

export default function MechanicsTable() {
  const [data, setData] = useState<Mechanic[]>(initialData);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== startIndex + index);
    setData(newData);
  };

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <section className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">Mechanics</h1>
          <p className="text-muted-foreground">
            Manage your mechanic team. View performance metrics, job assignments, and efficiency ratings.
          </p>
        </section>

        <div className="flex justify-end gap-3 mb-4">
          <button className="px-6 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-gray-900">
            VIEW PERFORMANCE
          </button>
          <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium">
            CREATE
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Jobs Completed</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Current Jobs</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Efficiency</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((mechanic, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-900">{mechanic.no}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{mechanic.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{mechanic.fullName}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{mechanic.role}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{mechanic.jobsCompleted}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{mechanic.currentJobs}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{mechanic.efficiency}</td>
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
      </div>
    </div>
  );
}