import { useAuthChecker } from "@/hooks/useAuthChecker";
import { ChartAreaInteractive } from "../components/charts/areaChart";
import { ChartBarInteractive } from "../components/charts/barChart";

export default function Dashboard() {
  const { isAuthenticated } = useAuthChecker();

  if (!isAuthenticated) return null;

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="py-2">
          <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
          <p className="text-muted-foreground">
            This is your main dashboard. Use the sidebar to navigate between
            different sections.
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-2">
          <ChartAreaInteractive />
          <ChartBarInteractive />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-2">
          <ChartBarInteractive />
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  );
}
