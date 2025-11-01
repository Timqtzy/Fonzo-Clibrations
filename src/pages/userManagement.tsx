import { useState } from 'react';
import { ChevronDown, FileText, Lightbulb, CheckCircle, User, MessageSquare } from "lucide-react";

type Application = {
  name: string;
  status: string;
  vehicle: string;
  date: string;
  time: string;
  problem: string;
  mechanics: string;
};

export default function UserManagement() {
  const [applications] = useState<Application[]>([
    {
      name: "Hello kitty",
      status: "Approved",
      vehicle: "Mishubibi",
      date: "6/6/2006",
      time: "60606 AM",
      problem: "Lambing",
      mechanics: "Spiderman"
    }
  ]);

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">
            Review and manage customer applications for repair services. Track application status from submission to approval.
          </p>
        </section>

        <div className="flex justify-end mb-4">
          <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium">
            Repair Requests
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                <h2 className="text-3xl font-bold text-gray-900">666</h2>
              </div>
              <FileText className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <h2 className="text-3xl font-bold text-gray-900">6</h2>
              </div>
              <Lightbulb className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <h2 className="text-3xl font-bold text-gray-900">6</h2>
              </div>
              <CheckCircle className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Under Review</p>
                <h2 className="text-3xl font-bold text-gray-900">6</h2>
              </div>
              <User className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Status</label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="">Select status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="review">Under Review</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Per Page</label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="">Select</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Submitted After</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Submitted Before</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium">
            Refresh
          </button>
        </div>

        {/* Application Cards */}
        <div className="space-y-4">
          {applications.map((app, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">
                    {app.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm">
                    View
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm">
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Vehicle</p>
                  <p className="text-sm text-gray-900">{app.vehicle}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-sm text-gray-900">{app.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Problem</p>
                  <p className="text-sm text-gray-900">{app.problem}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Time</p>
                  <p className="text-sm text-gray-900">{app.time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Mechanics</p>
                  <p className="text-sm text-gray-900">{app.mechanics}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
