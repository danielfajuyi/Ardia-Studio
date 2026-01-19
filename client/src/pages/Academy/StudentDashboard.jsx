import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Welcome back, Creator.</h1>
        
        {/* Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-medium mb-2 text-gray-300">In Progress</h3>
            <div className="text-4xl font-bold mb-1">2</div>
            <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-white w-2/3" />
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-medium mb-2 text-gray-300">Certificates</h3>
            <div className="text-4xl font-bold text-gray-500">0</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center space-x-6 hover:border-purple-500/50 transition-colors cursor-pointer">
          <div className="w-32 h-20 bg-purple-900 rounded-lg flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">AI Video Mastery</h3>
            <p className="text-gray-400 text-sm mb-3">Lesson 5: Prompt Engineering 101</p>
            <div className="flex items-center space-x-3 text-sm">
              <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-1/4" />
              </div>
              <span className="text-purple-400">25% Complete</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
