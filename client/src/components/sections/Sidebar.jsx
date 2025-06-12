import { Home } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <div className="relative">
          <div className="absolute left-0 top-0 w-1 h-10 bg-[#8E80FC] rounded-r-sm"></div>
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg ml-1">
            <Home className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}