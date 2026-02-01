import React from "react";
import { BarChart, DollarSign, Users as UsersIcon, Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import AdminUpload from "../../components/admin/AdminUpload";

const AdminDashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <Button variant="glow" className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Course</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            label: "Total Revenue",
            value: "$12,450",
            icon: DollarSign,
            color: "text-green-400",
          },
          {
            label: "Active Students",
            value: "843",
            icon: UsersIcon,
            color: "text-blue-400",
          },
          {
            label: "Course Views",
            value: "45.2k",
            icon: BarChart,
            color: "text-purple-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Media Management</h2>
          <AdminUpload />
        </div>

        {/* Recent Enrollments */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-bold mb-4">Recent Enrollments</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                  <div>
                    <div className="font-sm font-medium">
                      User #{i}00{i}
                    </div>
                    <div className="text-xs text-gray-500">
                      AI Mastery Course
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">2 min ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
