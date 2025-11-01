import { useState } from 'react';
import { Eye, Check, Trash2, Mail } from "lucide-react";

type Appointment = {
  name: string;
  email: string;
  dateTime: string;
  vehicle: string;
  status: string;
  badge: string;
};

export default function AppointmentScheduling() {
  const [appointments] = useState<Appointment[]>([
    {
      name: "Batman Tadeo",
      email: "batman@dnd.com",
      dateTime: "December 2, 2025",
      vehicle: "Nissan Almera",
      status: "Scheduled",
      badge: "Completed"
    },
    {
      name: "Batman Tadeo",
      email: "batman@dnd.com",
      dateTime: "December 2, 2025",
      vehicle: "Nissan Almera",
      status: "Scheduled",
      badge: "Completed"
    }
  ]);

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">
            Schedule and manage customer appointments. View upcoming, past, and pending appointments all in one place.
          </p>
        </section>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
            Upcoming (Scheduled) <span className="ml-2 text-gray-500">2</span>
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
            Past (Canceled/Complete) <span className="ml-2 text-gray-500">2</span>
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
            Pending (Confirmed) <span className="ml-2 text-gray-500">2</span>
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
            All <span className="ml-2 text-gray-500">2</span>
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium ml-auto">
            Add
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
            Application Page
          </button>
        </div>

        {/* Appointment Cards */}
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{appointment.name}</h3>
                  <p className="text-sm text-gray-500">{appointment.email}</p>
                </div>
                <span className="px-4 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                  {appointment.badge}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date and Time</p>
                  <p className="text-sm text-gray-900">{appointment.dateTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Vehicle</p>
                  <p className="text-sm text-gray-900">{appointment.vehicle}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <p className="text-sm text-gray-900">{appointment.status}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm">
                  <Mail className="h-4 w-4" />
                  Message
                </button>
                <div className="flex gap-2">
                  <button className="p-2 rounded bg-blue-100 hover:bg-blue-200 transition-colors">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </button>
                  <button className="p-2 rounded bg-green-100 hover:bg-green-200 transition-colors">
                    <Check className="h-4 w-4 text-green-600" />
                  </button>
                  <button className="p-2 rounded bg-red-100 hover:bg-red-200 transition-colors">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
