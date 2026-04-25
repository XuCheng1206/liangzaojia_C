import React from 'react';
import { ChevronLeft, Search, X, Clock, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const SearchPage = ({ onBack }: { onBack: () => void }) => {
  const hotSearches = ['原木风装修', '89平米三室两厅', '水电改造避坑', '良匠推荐', '现代简约案例'];
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-50">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            autoFocus
            type="text" 
            placeholder="搜索装修灵感、案例、经验..." 
            className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-gray-400"
          />
        </div>
        <button className="text-sm font-bold text-gray-900">搜索</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              最近搜索
            </h3>
            <button className="text-xs text-gray-400 hover:text-gray-600">清除</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['奶油风', '厨房改造', '收纳神器'].map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            热门搜索
          </h3>
          <div className="space-y-4">
            {hotSearches.map((item, idx) => (
              <div key={item} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-black ${idx < 3 ? 'text-orange-500' : 'text-gray-300'}`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">{item}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPage;
