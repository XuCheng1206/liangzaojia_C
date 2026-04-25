import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CityModal = ({ isOpen, onClose, onSelect, currentCity }: { isOpen: boolean; onClose: () => void; onSelect: (city: string) => void; currentCity: string }) => {
  const cities = ['北京', '西安', '南阳', '上海', '广州', '深圳', '杭州', '成都'];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 inset-x-0 bg-white rounded-t-[32px] z-[210] px-6 pt-8 pb-12 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">选择城市</h3>
                <p className="text-xs text-gray-400 mt-1">当前定位：{currentCity}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {cities.map((city) => (
                <button 
                  key={city}
                  onClick={() => {
                    onSelect(city);
                    onClose();
                  }}
                  className={cn(
                    "py-3 rounded-2xl text-sm font-medium transition-all duration-200",
                    city === currentCity 
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" 
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-xl text-white">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-900">自动定位</p>
                <p className="text-[10px] text-blue-700 mt-0.5">已为您开启精准定位服务</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CityModal;
