import React from 'react';
import { ChevronLeft, FileText, Home, LayoutGrid, Layers, ClipboardCheck, Users, Award, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MyCasesPage = ({ onBack }: { onBack: () => void }) => {
  const archives = [
    { icon: Home, label: '房屋信息', color: 'bg-orange-50', iconColor: 'text-orange-500' },
    { icon: LayoutGrid, label: '图纸信息', color: 'bg-indigo-50', iconColor: 'text-indigo-500' },
    { icon: Layers, label: '管线信息', color: 'bg-cyan-50', iconColor: 'text-cyan-500' },
    { icon: ClipboardCheck, label: '施工信息', color: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { icon: Users, label: '从业者信息', color: 'bg-rose-50', iconColor: 'text-rose-500' },
    { icon: Award, label: '维保服务', color: 'bg-blue-50', iconColor: 'text-blue-500' },
    { icon: MessageSquare, label: '管家服务', color: 'bg-gray-50', iconColor: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-4 border-b border-gray-100">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">私宅档案</h1>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-gray-900">私宅档案</h3>
              <p className="text-[10px] text-gray-400">记录房屋全周期信息</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {archives.map((archive, idx) => (
              <div key={idx} className="p-3 rounded-3xl border border-gray-50 active:scale-95 transition-transform cursor-pointer flex items-center gap-2">
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", archive.color)}>
                  <archive.icon className={cn("w-4 h-4", archive.iconColor)} />
                </div>
                <span className="text-[11px] font-bold text-gray-700 truncate">{archive.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCasesPage;

