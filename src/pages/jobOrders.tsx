import { useState } from 'react';
import { Eye, Check, Trash2, ChevronDown } from "lucide-react";

type Customer = {
  no: number;
  id: string;
  fullName: string;
  contactNo: string;
  carBrand: string;
  color: string;
  plate: string;
  date: string;
  status: "Pending" | "Completed";
};

const initialData: Customer[] = [
  {
    no: 1,
    id: "Cus-001",
    fullName: "Hello kitty",
    contactNo: "09229684132",
    carBrand: "Tesla",
    color: "White",
    plate: "123 ABC",
    date: "Oct 12, 2025",
    status: "Pending",
  },
  {
    no: 2,
    id: "Cus-002",
    fullName: "Hello kitty",
    contactNo: "09229684132",
    carBrand: "Tesla",
    color: "White",
    plate: "123 ABC",
    date: "Oct 12, 2025",
    status: "Completed",
  },
  {
    no: 3,
    id: "Cus-003",
    fullName: "Hello kitty",
    contactNo: "09229684132",
    carBrand: "Tesla",
    color: "White",
    plate: "123 ABC",
    date: "Oct 12, 2025",
    status: "Pending",
  },
  {
    no: 4,
    id: "Cus-004",
    fullName: "Hello kitty",
    contactNo: "09229684132",
    carBrand: "Tesla",
    color: "White",
    plate: "123 ABC",
    date: "Oct 12, 2025",
    status: "Completed",
  },
  {
    no: 5,
    id: "Cus-005",
    fullName: "Hello kitty",
    contactNo: "09229684132",
    carBrand: "Tesla",
    color: "White",
    plate: "123 ABC",
    date: "Oct 12, 2025",
    status: "Pending",
  },
  {
    no: 6,
    id: "Cus-006",
    fullName: "Hello kitty",
    contactNo: "09229684132",
    carBrand: "Tesla",
    color: "White",
    plate: "123 ABC",
    date: "Oct 12, 2025",
    status: "Pending",
  },
  {
    no: 7,
    id: "Cus-007",
    fullName: "Hello kitty",
    contactNo: "09229684132",
    carBrand: "Tesla",
    color: "White",
    plate: "123 ABC",
    date: "Oct 12, 2025",
    status: "Pending",
  },
  {
    no: 8,
    id: "Cus-008",
    fullName: "Hello kitty",
    contactNo: "09229684132",
    carBrand: "Tesla",
    color: "White",
    plate: "123 ABC",
    date: "Oct 12, 2025",
    status: "Pending",
  },
];

export default function CustomerDataTable() {
  const [data, setData] = useState<Customer[]>(initialData);
  const [filter, setFilter] = useState("");

  const filteredData = data.filter(customer =>
    customer.fullName.toLowerCase().includes(filter.toLowerCase()) ||
    customer.id.toLowerCase().includes(filter.toLowerCase()) ||
    customer.contactNo.includes(filter)
  );

  const handleStatusChange = (index: number, newStatus: "Pending" | "Completed") => {
    const newData = [...data];
    newData[index].status = newStatus;
    setData(newData);
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">Job Orders</h1>
          <p className="text-muted-foreground">
            Manage customer job orders and track their status. Search and filter orders to find what you need.
          </p>
        </section>

        <div className="flex justify-end mb-4">
          <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium">
            Add Order
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header with search */}
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search by name, ID, or contact..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Full Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Car Brand</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Color</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Plate #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.no}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.fullName}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.contactNo}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.carBrand}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.color}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.plate}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{customer.date}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="relative inline-block">
                        <select
                          value={customer.status}
                          onChange={(e) => handleStatusChange(index, e.target.value as "Pending" | "Completed")}
                          className={`appearance-none px-3 py-1.5 pr-8 rounded border ${
                            customer.status === "Completed"
                              ? "bg-green-50 border-green-200 text-green-700"
                              : "bg-yellow-50 border-yellow-200 text-yellow-700"
                          } text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
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
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-sm text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredData.length} of {data.length} entries
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
