import { useAuthChecker } from "@/hooks/useAuthChecker";
import { LucideToggleLeft } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";


export default function Settings() {
  const { isAuthenticated } = useAuthChecker();

  if (!isAuthenticated) return null;

  return (
    <div className="py-4 px-2 md:px-6 lg:px-18">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your application settings here. Use the sidebar to navigate
          back to the dashboard.
        </p>
      </section>
      <div className="flex justify-between border border-gray-300 rounded-md py-4 px-4 md:px-8 mt-6">
        <p className="text-xl font-medium">Notification Settings</p>
        <LucideToggleLeft />
      </div>
      <div className="border border-gray-300 rounded-md py-4 px-4 md:px-8 mt-6">
        <p className="text-xl font-medium">Workshop Details</p>
       <div className="flex flex-col lg:flex-row gap-4 mt-2">
         <div className="grid w-full items-center gap-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" className="w-full"/>
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="address">Address</Label>
          <Input id="address" type="text" />
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="contactInfo">Contact Information</Label>
          <Input id="contactInfo" type="text" />
        </div>
       </div>
      </div>
    </div>
  );
}
