import { useState } from 'react';
import { Settings, ShoppingCart, Clock, Home, Filter, Plus, Eye, Check, Trash2, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type InventoryItem = {
  no: number;
  partsName: string;
  quantity: string;
  minimumStock: string;
  category: string;
  supplier: string;
  status: string;
};

const initialData: InventoryItem[] = [
  {
    no: 1,
    partsName: "Brake Pad",
    quantity: "12 pcs",
    minimumStock: "5 stock",
    category: "Engine",
    supplier: "Autowork PH",
    status: "Active",
  },
  {
    no: 2,
    partsName: "Brake Pad",
    quantity: "12 pcs",
    minimumStock: "5 stock",
    category: "Engine",
    supplier: "Autowork PH",
    status: "Active",
  },
  {
    no: 3,
    partsName: "Brake Pad",
    quantity: "12 pcs",
    minimumStock: "5 stock",
    category: "Engine",
    supplier: "Autowork PH",
    status: "Active",
  },
  {
    no: 4,
    partsName: "Brake Pad",
    quantity: "12 pcs",
    minimumStock: "5 stock",
    category: "Engine",
    supplier: "Autowork PH",
    status: "Active",
  },
  {
    no: 5,
    partsName: "Brake Pad",
    quantity: "12 pcs",
    minimumStock: "5 stock",
    category: "Engine",
    supplier: "Autowork PH",
    status: "Active",
  },
  {
    no: 6,
    partsName: "Brake Pad",
    quantity: "12 pcs",
    minimumStock: "5 stock",
    category: "Engine",
    supplier: "Autowork PH",
    status: "Active",
  },
  {
    no: 7,
    partsName: "Brake Pad",
    quantity: "12 pcs",
    minimumStock: "5 stock",
    category: "Engine",
    supplier: "Autowork PH",
    status: "Active",
  },
  {
    no: 8,
    partsName: "Brake Pad",
    quantity: "12 pcs",
    minimumStock: "5 stock",
    category: "Engine",
    supplier: "Autowork PH",
    status: "Active",
  },
];

export default function InventorySupplies() {
  const [data, setData] = useState<InventoryItem[]>(initialData);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = ["All Categories", "Engine", "Transmission", "Brakes", "Suspension"];

  const filteredData = selectedCategory === "All Categories"
    ? data
    : data.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleDelete = (index: number) => {
    const actualIndex = data.findIndex(item => item.no === filteredData[startIndex + index].no);
    const newData = data.filter((_, i) => i !== actualIndex);
    setData(newData);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setShowCategoryDropdown(false);
  };

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <section className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">Inventory & Supplies</h1>
          <p className="text-muted-foreground">
            Track and manage your auto parts inventory. Monitor stock levels, suppliers, and categories to ensure availability.
          </p>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Parts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Parts</p>
                <h2 className="text-3xl font-bold text-gray-900">1,260</h2>
              </div>
              <div className="flex gap-1">
                <Settings className="h-6 w-6 text-gray-400" />
                <Settings className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Stock Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Stock Items</p>
                <h2 className="text-3xl font-bold text-gray-900">35</h2>
              </div>
              <ShoppingCart className="h-6 w-6 text-gray-400" />
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
                <h2 className="text-3xl font-bold text-gray-900">23</h2>
              </div>
              <Clock className="h-6 w-6 text-gray-400" />
            </div>
          </div>

          {/* Quantity Available */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Quantity Available</p>
                <h2 className="text-3xl font-bold text-gray-900">2,500</h2>
              </div>
              <Home className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Filter and Add Button */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="relative inline-block">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm">{selectedCategory}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        selectedCategory === category ? 'bg-gray-50 font-medium' : ''
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No.</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Parts Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Minimum Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Supplier</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-900">{item.no}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.partsName}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.minimumStock}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.category}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.supplier}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.status}</td>
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