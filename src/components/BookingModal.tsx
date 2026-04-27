import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ChevronDown, MapPin, Home, Layout, Palette, Clock, CreditCard, Layers } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity?: string;
}

interface FormData {
  city: string;
  community: string;
  area: string;
  roomType: string;
  houseCategory: string;
  styles: string[];
  timeline: string;
  budget: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, currentCity }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    city: currentCity || '',
    community: '',
    area: '',
    roomType: '',
    houseCategory: '',
    styles: [],
    timeline: '',
    budget: ''
  });

  useEffect(() => {
    if (isOpen && currentCity) {
      setFormData(prev => ({ ...prev, city: currentCity }));
    }
  }, [isOpen, currentCity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => setIsSubmitted(false), 300);
  };

  const toggleStyle = (style: string) => {
    setFormData(prev => {
      const isSelected = prev.styles.includes(style);
      if (isSelected) {
        return { ...prev, styles: prev.styles.filter(s => s !== style) };
      } else {
        return { ...prev, styles: [...prev.styles, style] };
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="bg-white rounded-[40px] w-full max-w-[480px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-black text-gray-900 tracking-tight leading-tight pr-8"> 了解您的需求是我们提供专业服务的开始 </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors absolute right-8 top-8"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 1. Location */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="font-bold text-base">1. 所在城市</span>
                    </div>
                    <div className="relative">
                      <input 
                        required
                        type="text"
                        placeholder="请输入城市"
                        className="w-full h-14 px-4 bg-gray-50 border-none rounded-2xl text-[15px] focus:ring-2 focus:ring-amber-500/20 transition-all font-medium placeholder:text-gray-300"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </section>

                  {/* 2. Community Name */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Home className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-bold text-base">2. 小区名称</span>
                    </div>
                    <input 
                      required
                      type="text"
                      placeholder="填充小区名称"
                      className="w-full h-14 px-4 bg-gray-50 border-none rounded-2xl text-[15px] focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder:text-gray-300"
                      value={formData.community}
                      onChange={e => setFormData({ ...formData, community: e.target.value })}
                    />
                  </section>

                  {/* 3. House Category */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                        <Home className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-bold text-base">3. 房屋类型</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                         {['平层', '复式', '叠拼别墅', '联排别墅', '独栋别墅'].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setFormData({...formData, houseCategory: val})}
                              className={cn(
                                "h-11 rounded-xl text-[12px] font-bold transition-all border-2",
                                formData.houseCategory === val 
                                  ? "bg-purple-50 border-purple-500 text-purple-700" 
                                  : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                              )}
                            >
                              {val}
                            </button>
                         ))}
                      </div>
                  </section>

                  {/* 4. House Area */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <Layout className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-bold text-base">4. 房屋面积</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {['100-150平米', '150-200平米', '200-300平米', '300平米以上'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setFormData({...formData, area: val})}
                            className={cn(
                              "h-12 rounded-xl text-[13px] font-bold transition-all border-2",
                              formData.area === val 
                                ? "bg-emerald-50 border-emerald-500 text-emerald-700" 
                                : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                            )}
                          >
                            {val}
                          </button>
                      ))}
                    </div>
                  </section>

                  {/* 5. House Type (Room count) */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                        <Layers className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="font-bold text-base">5. 户型</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {['一居', '两居', '三居', '四居及以上'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setFormData({...formData, roomType: val})}
                            className={cn(
                              "h-11 rounded-xl text-[13px] font-bold transition-all border-2",
                              formData.roomType === val 
                                ? "bg-orange-50 border-orange-500 text-orange-700" 
                                : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                            )}
                          >
                            {val}
                          </button>
                        ))}
                    </div>
                  </section>

                  {/* 6. Style - Multi-select */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
                        <Palette className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="font-bold text-base">6. 风格喜好 (可多选)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                       {['中式风格', '现代风格', '简约风格', '轻奢风格', '法式风格', '欧式风格'].map((val) => {
                          const isSelected = formData.styles.includes(val);
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => toggleStyle(val)}
                              className={cn(
                                "h-11 rounded-xl text-[12px] font-bold transition-all border-2",
                                isSelected 
                                  ? "bg-teal-50 border-teal-500 text-teal-700" 
                                  : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                              )}
                            >
                              {val}
                            </button>
                          );
                       })}
                    </div>
                  </section>

                  {/* 7. Timeline */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-rose-600" />
                      </div>
                      <span className="font-bold text-base">7. 工期需求</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       {['1-3个月', '3-6个月', '6-9个月', '9-12个月'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setFormData({...formData, timeline: val})}
                            className={cn(
                              "h-12 rounded-xl text-[13px] font-bold transition-all border-2",
                              formData.timeline === val 
                                ? "bg-rose-50 border-rose-500 text-rose-700" 
                                : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                            )}
                          >
                            {val}
                          </button>
                       ))}
                    </div>
                  </section>

                  {/* 8. Budget */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="font-bold text-base">8. 预算需求</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       {[
                         '2000-3000/平米', 
                         '3000-5000/平米', 
                         '5000-7000/平米', 
                         '7000/平米以上'
                       ].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setFormData({...formData, budget: val})}
                            className={cn(
                              "h-12 rounded-xl text-[13px] font-bold transition-all border-2",
                              formData.budget === val 
                                ? "bg-indigo-50 border-indigo-500 text-indigo-700" 
                                : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                            )}
                          >
                            {val}
                          </button>
                       ))}
                    </div>
                  </section>

                  <div className="pt-4 sticky bottom-0 bg-white/80 backdrop-blur-md pb-0">
                    <button
                      type="submit"
                      className="w-full h-16 bg-zinc-900 hover:bg-black text-white font-black text-lg rounded-2xl shadow-xl shadow-zinc-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      提交需求材料
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 mx-auto bg-green-50 rounded-[28px] flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">提交成功</h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed max-w-[280px] mx-auto mb-10 font-medium">
                    您的项目需求已同步至良造家专家库，专属大宅顾问将在24小时内与您联系。
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full max-w-[200px] bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-xl transition-all active:scale-95"
                  >
                    回到首页
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
