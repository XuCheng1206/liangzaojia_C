import React from 'react';
import { ChevronLeft, ArrowRight, ShieldCheck, AlertTriangle, CheckCircle, BarChart3, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ModeIntroPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[200] bg-white flex flex-col overflow-y-auto"
    >
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center border-b border-gray-100">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
      </div>

      <div className="pb-32 bg-white">
        {/* ① Hero Screen */}
        <section className="relative min-h-[100svh] flex flex-col justify-end items-center text-center p-8 overflow-hidden bg-black/90">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80" 
            alt="大宅实景"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          <div className="relative z-10 w-full max-w-lg mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-[56px] md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1]"
            >
              装修，<br />不该靠运气
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-white/80 mb-12 font-medium tracking-wide"
            >
              一套把结果变成确定性的工程体系
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white text-black px-8 py-5 rounded-full font-bold text-[17px] w-full flex items-center justify-center gap-2 hover:bg-gray-100 active:scale-95 transition-all"
            >
              立即做一次装修推演 <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </section>

        {/* ② Pain Points */}
        <section className="py-32 bg-white">
          <div className="px-6 mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[40px] md:text-5xl font-bold tracking-tighter text-gray-900 leading-tight"
            >
              大多数装修，<br />从一开始就错了
            </motion.h2>
          </div>
          
          <div className="flex gap-5 overflow-x-auto px-6 pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
            {[
              { title: '预算失控', desc: '你以为是30万，最后变成50万', bg: 'bg-[#FFF9F9]', text: 'text-[#8C1D18]', icon: 'text-red-400' },
              { title: '过程失控', desc: '每个人说法都不一样，你不知道听谁的', bg: 'bg-[#FFFBF5]', text: 'text-[#8C4A18]', icon: 'text-orange-400' },
              { title: '结果失控', desc: '效果图很好看，落地完全不同', bg: 'bg-[#FCFAFA]', text: 'text-[#5C5C5C]', icon: 'text-gray-400' },
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn("snap-center shrink-0 w-[82vw] max-w-[320px] aspect-[4/5] rounded-[32px] p-8 flex flex-col justify-end shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] relative overflow-hidden", card.bg)}
              >
                <div className="absolute top-8 left-8">
                  <AlertTriangle className={cn("w-10 h-10 opacity-40", card.icon)} />
                </div>
                <h3 className={cn("text-[32px] font-bold mb-4 tracking-tight leading-none", card.text)}>{card.title}</h3>
                <p className={cn("text-[17px] font-medium leading-relaxed opacity-80", card.text)}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-4 text-[13px] font-bold tracking-[0.2em] uppercase">不是你不懂，是这个行业没有标准</p>
        </section>

        {/* ③ Cognitive Reframing */}
        <section className="py-32 bg-[#FBFBFD] px-6">
          <div className="max-w-lg mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[40px] md:text-5xl font-bold tracking-tighter text-center text-gray-900 mb-20 leading-[1.1]"
            >
              你不该选“公司”<br />你应该选“系统”
            </motion.h2>
            <div className="grid grid-cols-2 gap-3 relative">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="pt-10 pb-12 px-6 bg-white rounded-[32px] text-gray-400 border border-gray-100 shadow-sm flex flex-col items-center text-center mt-4"
              >
                <h4 className="font-bold text-gray-900 mb-10 tracking-widest uppercase text-[11px] opacity-40">传统装修</h4>
                <ul className="space-y-8 text-[17px] font-bold w-full">
                  <li className="pb-8 border-b border-gray-50">靠人</li>
                  <li className="pb-8 border-b border-gray-50">靠经验</li>
                  <li>靠信任</li>
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="pt-12 pb-14 px-6 bg-[#0A0A0A] rounded-[32px] text-white flex flex-col items-center text-center shadow-[0_20px_40px_rgb(0,0,0,0.12)] scale-105 origin-center z-10 border border-white/10"
              >
                <h4 className="font-bold text-[#D4AF37] mb-10 tracking-widest uppercase text-[11px]">良知工程</h4>
                <ul className="space-y-8 text-[17px] font-bold w-full">
                  <li className="pb-8 border-b border-white/10">靠标准</li>
                  <li className="pb-8 border-b border-white/10">靠系统</li>
                  <li className="text-[#D4AF37]">靠数据</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ④ Core Solutions */}
        <section className="py-32 bg-white overflow-hidden">
          <div className="px-6 mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[40px] md:text-5xl font-bold tracking-tighter text-gray-900 leading-[1.1]"
            >
              良知工程交付体系
            </motion.h2>
          </div>
          
          <div className="flex gap-5 overflow-x-auto px-6 pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pl-6">
            {[
              { 
                title: '所有钱，都看得见', 
                subtitle: '预算 / 材料 / 利润 全透明',
                img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
              },
              { 
                title: '不靠低价竞争', 
                subtitle: '明确利润，杜绝偷工减料',
                img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
              },
              { 
                title: '每一步都有标准', 
                subtitle: '16个关键节点可验证',
                img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80'
              },
              { 
                title: '你的房子，有完整档案', 
                subtitle: '终身可追溯',
                img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80'
              },
            ].map((mod, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="snap-center shrink-0 w-[85vw] max-w-[320px] aspect-[4/5] rounded-[32px] relative overflow-hidden bg-gray-900 group"
              >
                <img src={mod.img} alt={mod.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                  <h4 className="text-[28px] font-bold text-white mb-3 tracking-tight leading-[1.1]">{mod.title}</h4>
                  <p className="text-[14px] font-medium text-white/70 tracking-wide">{mod.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ⑤ Risk Nodes */}
        <section className="py-32 bg-[#FBFBFD] px-6">
          <div className="max-w-lg mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[36px] md:text-5xl font-bold tracking-tighter text-center text-gray-900 mb-16 leading-[1.1]"
            >
              帮你盯住<br />最容易出问题的16个地方
            </motion.h2>
            <div className="space-y-4">
                {['水电隐蔽工程', '防水防潮工程', '结构承重与加固', '竣工终验与交付'].map((node, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="p-6 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex justify-between items-center text-[19px] font-bold text-gray-900 active:scale-95 transition-all cursor-pointer"
                    >
                        {node}
                        <ArrowRight className="w-5 h-5 text-gray-300" />
                    </motion.div>
                ))}
            </div>
            <p className="text-center font-bold mt-16 text-[17px] text-gray-500 tracking-tight">你不需要懂装修，也能判断好坏</p>
          </div>
        </section>
        
        {/* ⑥ Results */}
        <section className="py-32 bg-black px-6 text-white text-center">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-[40px] md:text-5xl font-bold tracking-tighter mb-20 leading-[1.1] text-white/90"
            >
              最终<br />你会得到什么？
            </motion.h2>
            <div className="grid grid-cols-2 gap-4">
                {['不超预算', '不靠运气', '不怕被坑', '不用盯现场'].map((res, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-10 bg-white/5 rounded-[32px] text-[22px] font-bold tracking-tight border border-white/10 shadow-2xl backdrop-blur-sm"
                    >
                        {res}
                    </motion.div>
                ))}
            </div>
        </section>

        {/* ⑦ Audience Filter */}
        <section className="py-32 bg-white px-6">
          <div className="max-w-lg mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[32px] font-bold tracking-tighter text-center text-gray-900 mb-12"
            >
              这套体系，不适合所有人
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[15px] font-bold">
                <div className="p-8 bg-[#F5F9F5] text-[#2C5E2E] rounded-[32px] border border-[#2C5E2E]/10">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <span className="text-xl">✔</span>
                  </div>
                  <h4 className="text-xl mb-4">适合</h4>
                  <ul className="space-y-3 font-medium opacity-80">
                    <li>• 大宅 / 别墅</li>
                    <li>• 在意长期品质</li>
                    <li>• 不想反复折腾</li>
                  </ul>
                </div>
                <div className="p-8 bg-[#FFF9F9] text-[#8C1D18] rounded-[32px] border border-[#8C1D18]/10">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <span className="text-xl">✘</span>
                  </div>
                  <h4 className="text-xl mb-4">不适合</h4>
                  <ul className="space-y-3 font-medium opacity-80">
                    <li>• 只想最低价</li>
                    <li>• 能接受不确定性</li>
                  </ul>
                </div>
            </div>
          </div>
        </section>

        {/* ⑧ CTA */}
        <section className="py-32 bg-[#FBFBFD] px-6 text-center border-t border-gray-100">
          <div className="max-w-lg mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[40px] md:text-5xl font-bold tracking-tighter mb-6 text-gray-900 leading-[1.1]"
            >
              在你装修之前<br />先做一件更重要的事
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-gray-500 mb-16 text-[19px] font-medium"
            >
              用一套标准，推演一遍你的房子怎么装
            </motion.p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-10 py-6 rounded-full font-bold text-[19px] w-full shadow-[0_20px_40px_rgb(0,0,0,0.2)] hover:bg-gray-900 transition-colors"
            >
              立即预约「装修沙盘推演」
            </motion.button>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-8 flex items-center justify-center gap-6 text-gray-400 text-[13px] font-bold tracking-wide"
            >
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> 已有 3,524 位业主选择</div>
              <div>顾问 1 对 1</div>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ModeIntroPage;

