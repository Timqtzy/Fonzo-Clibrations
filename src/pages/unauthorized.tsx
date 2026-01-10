import { ShieldX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <ShieldX className="h-16 w-16 text-red-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        You don't have permission to access this page. Please contact your administrator if you believe this is an error.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
