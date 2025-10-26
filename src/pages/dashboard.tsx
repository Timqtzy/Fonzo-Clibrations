import { useAuthChecker } from "@/hooks/useAuthChecker"

export default function Dashboard() {
  const { isAuthenticated } = useAuthChecker()

  if (!isAuthenticated) return null

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
      <p className="text-muted-foreground">
        This is your main dashboard. Use the sidebar to navigate between different sections.
      </p>
    </div>
  )
}