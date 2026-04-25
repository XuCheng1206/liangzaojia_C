import React, { useState } from 'react';
import { ChevronLeft, AlertCircle, ClipboardCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MyRequirementsPage = ({ onBack }: { onBack: () => void }) => {
  const [activeStatus, setActiveStatus] = useState<'reviewing' | 'online' | 'rejected' | 'offline'>('reviewing');
  
  const statuses = [
    { id: 'reviewing', label: '审核中' },
    { id: 'online', label: '已上线' },
    { id: 'rejected', label: '未通过' },
    { id: 'offline', label: '已下线' },
  ];

  const requirements = [
    { id: 1, title: '三室两厅现代简约装修需求', area: 120, budget: 20, time: '2024-03-01 10:00', status: 'reviewing' },
    { id: 2, title: '老房翻新：北欧风格改造', area: 85, budget: 15, time: '2024-02-28 15:30', status: 'online' },
    { id: 3, title: '别墅整装设计需求', area: 350, budget: 100, time: '2024-02-25 09:00', status: 'rejected', reason: '预算与面积不符' },
    { id: 4, title: '单身公寓软装搭配', area: 45, budget: 5, time: '2024-02-20 14:00', status: 'offline' },
  ];

  const filteredRequirements = requirements.filter(req => req.status === activeStatus);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的需求</h1>
      </div>

      <div className="bg-white px-4 flex items-center justify-between border-b border-gray-50 sticky top-[61px] z-40">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => setActiveStatus(status.id as any)}
            className={cn(
              "py-4 text-sm font-medium relative transition-colors",
              activeStatus === status.id ? "text-[#07c160]" : "text-gray-500"
            )}
          >
            {status.label}
            {activeStatus === status.id && (
              <motion.div 
                layoutId="statusTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07c160]" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 space-y-4">
        {filteredRequirements.length > 0 ? (
          filteredRequirements.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-bold text-gray-900">{req.title}</h3>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                  req.status === 'reviewing' ? "bg-blue-50 text-blue-500" :
                  req.status === 'online' ? "bg-emerald-50 text-emerald-500" :
                  req.status === 'rejected' ? "bg-red-50 text-red-500" :
                  "bg-gray-100 text-gray-500"
                )}>
                  {statuses.find(s => s.id === req.status)?.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-gray-400">房屋面积</span>
                  <span className="text-sm font-bold text-gray-700">{req.area} m²</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-gray-400">装修预算</span>
                  <span className="text-sm font-bold text-gray-700">{req.budget} 万元</span>
                </div>
              </div>
              {req.status === 'rejected' && (req as any).reason && (
                <div className="mb-4 p-3 bg-red-50 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 leading-relaxed">未通过原因：{(req as any).reason}</p>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-[10px] text-gray-400">{req.time}</span>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-1.5 text-xs font-bold text-gray-600 bg-gray-50 rounded-full border border-gray-100">
                    {req.status === 'rejected' ? '编辑' : '查看详情'}
                  </button>
                  {req.status === 'online' && (
                    <button className="px-4 py-1.5 text-xs font-bold text-white bg-gray-400 rounded-full shadow-sm">
                      下线
                    </button>
                  )}
                  {req.status === 'offline' && (
                    <button className="px-4 py-1.5 text-xs font-bold text-white bg-[#07c160] rounded-full shadow-sm shadow-[#07c160]/20">
                      上线
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <ClipboardCheck className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm">暂无相关需求</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequirementsPage;
