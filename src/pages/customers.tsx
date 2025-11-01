import { useState } from 'react';
import { Eye, Check, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type Customer = {
  no: number;
  fullName: string;
  contactNo: string;
  vehicle: string;
  plate: string;
  totalJobs: number;
  lastVisits: string;
};

export default function Customers() {
  const [data, setData] = useState<Customer[]>([
    {
      no: 1,
      fullName: "Hello kitty",
      contactNo: "09229684132",
      vehicle: "Super Honda Civic",
      plate: "123 ABC",
      totalJobs: 4,
      lastVisits: "Oct 12, 2025"
    },
    {
      no: 2,
      fullName: "Hello kitty",
      contactNo: "09229684132",
      vehicle: "Super Honda Civic",
      plate: "123 ABC",
      totalJobs: 4,
      lastVisits: "Oct 12, 2025"
    },
    {
      no: 3,
      fullName: "Hello kitty",
      contactNo: "09229684132",
      vehicle: "Super Honda Civic",
      plate: "123 ABC",
      totalJobs: 4,
      lastVisits: "Oct 12, 2025"
    },
    {
      no: 4,
      fullName: "Hello kitty",
      contactNo: "09229684132",
      vehicle: "Super Honda Civic",
      plate: "123 ABC",
      totalJobs: 4,
      lastVisits: "Oct 12, 2025"
    },
    {
      no: 5,
      fullName: "Hello kitty",
      contactNo: "09229684132",
      vehicle: "Super Honda Civic",
      plate: "123 ABC",
      totalJobs: 4,
      lastVisits: "Oct 12, 2025"
    },
    {
      no: 6,
      fullName: "Hello kitty",
      contactNo: "09229684132",
      vehicle: "Super Honda Civic",
      plate: "123 ABC",
      totalJobs: 4,
      lastVisits: "Oct 12, 2025"
    },
    {
      no: 7,
      fullName: "Hello kitty",
      contactNo: "09229684132",
      vehicle: "Super Honda Civic",
      plate: "123 ABC",
      totalJobs: 4,
      lastVisits: "Oct 12, 2025"
    }
  ]);

  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== startIndex + index);
    setData(newData);
  };

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer database. View customer information, vehicle details, and service history.
          </p>
        </section>

        <div className="flex justify-end mb-4">
          <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium">
            CREATE
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Contact No.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Vehicle</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Plate #</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Jobs</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Last Visits</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.no}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.fullName}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.contactNo}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.vehicle}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.plate}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.totalJobs}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.lastVisits}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2 justify-center">
                        <button className="p-2 rounded bg-blue-100 hover:bg-blue-200 transition-colors">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </button>
                        <button className="p-2 rounded bg-green-100 hover:bg-green-200 transition-colors">
                          <Check className="h-4 w-4 text-green-600" />
                        </button>
                        <button onClick={() => handleDelete(index)} className="p-2 rounded bg-red-100 hover:bg-red-200 transition-colors">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
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
            </select>
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
              <span className="text-sm text-gray-700 px-2">{currentPage} of {totalPages}</span>
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
