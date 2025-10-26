import { useAuthChecker } from "@/hooks/useAuthChecker"

export default function Settings() {
  const { isAuthenticated } = useAuthChecker()

  if (!isAuthenticated) return null

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground">
        Configure your application settings here. Use the sidebar to navigate back to the dashboard.
      </p>
    </div>
  )
}
