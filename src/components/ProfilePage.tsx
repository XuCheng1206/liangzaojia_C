import React, { useState } from 'react';
import { Fingerprint, Share2, Shield, Sparkles, Pencil, Copy, Plus, BookOpen, ArrowRight, LayoutGrid, Heart, Clock, Bell, LogOut, ChevronRight, X, Award, Eye, MessageCircle, Bookmark, UserPlus, Send, MoreHorizontal, Link, MessageSquare, Image, Video, Camera, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ProfilePage = ({ onMenuClick }: { onMenuClick: (label: string) => void }) => {
  const [showStatsModal, setShowStatsModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Top Background & Header - Apple Glassmorphism Style */}
      <div className="bg-gradient-to-br from-slate-100 via-white to-slate-50 pb-8 rounded-b-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden border-b border-gray-100">
         {/* Decorative Background Elements - Soft Apple Style */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
         <div className="absolute top-10 left-0 w-[300px] h-[300px] bg-indigo-100/40 rounded-full blur-[60px] -ml-10 pointer-events-none" />
         
         <div className="px-5 pt-10 relative z-10">
            {/* Header Row: Title */}
            <div className="flex items-center justify-between mb-5 relative z-10">
               <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/60 backdrop-blur-md flex items-center justify-center border border-white/80 shadow-sm">
                    <Fingerprint className="w-4 h-4 text-slate-700" />
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-slate-800">数字身份</span>
               </div>
               <button className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 backdrop-blur-md rounded-full text-slate-600 text-[11px] font-medium border border-white/80 shadow-sm active:scale-95 transition-all hover:bg-white/80 group">
                  <Share2 className="w-3 h-3 group-hover:text-blue-500 transition-colors" />
                  <span className="group-hover:text-blue-500 transition-colors">分享名片</span>
               </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-5 relative z-10">
               <div className="relative group shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white relative">
                     <img src="https://i.pravatar.cc/150?u=shenziyi" alt="Avatar" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[9px] px-1.5 py-0.5 rounded-lg border border-white flex items-center gap-0.5 shadow-sm">
                     <Shield className="w-2.5 h-2.5" />
                     <span className="font-semibold tracking-tight">已认证</span>
                  </div>
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                     <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5 truncate">
                        沈子怡
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                     </h2>
                     <button className="flex items-center gap-1 px-2 py-1 bg-white/60 backdrop-blur-md rounded-full text-slate-500 text-[10px] font-medium border border-white/80 shadow-sm active:scale-95 transition-all hover:bg-white/80 shrink-0">
                        <Pencil className="w-3 h-3" />
                        <span>编辑</span>
                     </button>
                  </div>

               </div>
            </div>


         </div>
      </div>

      <div className="px-4 -mt-6 relative z-20 space-y-4">
         {/* Private Home Archives Module */}
         <div 
            className="bg-white rounded-[24px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-between group cursor-pointer active:scale-[0.98] transition-all" 
            onClick={() => onMenuClick('私宅档案')}
         >
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <LayoutGrid className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-base font-bold text-gray-900 mb-0.5">私宅档案</h3>
                  <p className="text-xs text-gray-500">记录项目全过程 沉淀可追溯档案</p>
               </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
               <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </div>
         </div>

         {/* Footprints Grid */}
         <div className="bg-white rounded-[24px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4 px-1">足迹</h3>
            <div className="grid grid-cols-3 gap-y-4">
               {[
                  { icon: Heart, label: '我的收藏', color: 'text-pink-500', bg: 'bg-pink-50' },
                  { icon: Clock, label: '浏览历史', color: 'text-indigo-500', bg: 'bg-indigo-50' },
               ].map((item, idx) => (
                  <button key={idx} onClick={() => onMenuClick(item.label)} className="flex flex-col items-center gap-2 group active:scale-95 transition-transform">
                     <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-1", item.bg)}>
                        <item.icon className={cn("w-5 h-5", item.color)} />
                     </div>
                     <span className="text-xs font-medium text-gray-700">{item.label}</span>
                  </button>
               ))}
            </div>
         </div>

         {/* Settings / Other List */}
         <div className="bg-white rounded-[24px] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-2 px-3 pt-2">更多服务</h3>
            {[
               { icon: Bell, label: '消息通知', color: 'text-emerald-500', bg: 'bg-emerald-50' },
               { icon: LogOut, label: '退出登录', color: 'text-gray-500', bg: 'bg-gray-50' }
            ].map((item, idx) => (
               <button key={idx} onClick={() => onMenuClick(item.label)} className="w-full p-3 flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", item.bg)}>
                        <item.icon className={cn("w-4 h-4", item.color)} />
                     </div>
                     <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
               </button>
            ))}
         </div>
      </div>

      {/* Stats Modal */}
      <AnimatePresence>
        {showStatsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setShowStatsModal(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[40px] p-8 relative z-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400" />
              
              <h3 className="text-xl font-bold text-gray-900 mb-8 text-center pt-2">获赞与收藏</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-3xl p-6 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">1.2w</div>
                  <div className="text-xs text-gray-500">获赞</div>
                </div>
                <div className="bg-gray-50 rounded-3xl p-6 text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">3.5k</div>
                  <div className="text-xs text-gray-500">收藏</div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">影响力等级</span>
                  </div>
                  <span className="text-sm font-bold text-orange-600">LV.8</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">内容曝光量</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">45.8w</span>
                </div>
              </div>

              <button 
                onClick={() => setShowStatsModal(false)}
                className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-bold active:scale-95 transition-all"
              >
                知道了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
