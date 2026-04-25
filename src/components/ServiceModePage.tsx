import React from 'react';
import { ChevronLeft, ArrowRight, ShieldCheck, Diamond, Briefcase, Database, Target, Activity, Award, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ServiceModePage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[200] bg-white flex flex-col overflow-y-auto"
    >
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center border-b border-gray-100">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
      </div>

      <div className="pb-32 bg-white">
        {/* ① Hero Screen */}
        <section className="relative min-h-[90svh] flex flex-col justify-end items-center text-center p-8 overflow-hidden bg-black/90">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80" 
            alt="大宅全案服务"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="relative z-10 w-full max-w-lg mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-[48px] md:text-6xl font-bold tracking-tighter text-white mb-6 leading-[1.1]"
            >
              打碎行业黑盒<br />重建大宅服务范式
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-white/80 mb-12 font-medium tracking-wide"
            >
              告别发包与推诿，我们提供真正的全透明托管。
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white text-black px-8 py-5 rounded-full font-bold text-[17px] w-full flex items-center justify-center gap-2 hover:bg-gray-100 active:scale-95 transition-all"
            >
              开启您的专属定制 <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </section>

        {/* ② The Problem with Traditional Models */}
        <section className="py-24 bg-[#FBFBFD]">
          <div className="max-w-xl mx-auto px-6 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm mb-6"
            >
              为什么传统大宅装修总是失败？
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-16 leading-tight"
            >
              设计、施工、主材<br />永远在互相甩锅
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { title: "设计难落地", desc: "追求视觉效果，无视施工工艺结构。", icon: Target },
                { title: "施工多增项", desc: "低价接单，边做边加钱，毫无预算概念。", icon: Activity },
                { title: "材料以次充好", desc: "合同模糊不清，劣质建材暗中替换。", icon: ShieldCheck }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <item.icon className="w-8 h-8 text-gray-400 mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ③ The Three Service Modes */}
        <section className="py-32 bg-white">
          <div className="max-w-xl mx-auto px-6">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[40px] md:text-5xl font-bold tracking-tighter text-gray-900 mb-6 leading-tight"
              >
                三大服务模式<br />适配您的个性需求
              </motion.h2>
              <p className="text-gray-500 text-lg">无论您处于哪个阶段，我们都有精准对接的专业体系。</p>
            </div>

            <div className="space-y-8">
              {/* Mode 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-[#0A0A0A] text-white p-10 rounded-[32px] relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-amber-500">1</span>
                    <h3 className="text-2xl font-bold tracking-tight">尊享全案托管模式</h3>
                  </div>
                  <p className="text-white/70 mb-8 leading-relaxed font-medium">从顶级设计到金牌施工，再到全球供应链直采。您只需确认方案，其余统统交给我们，实现真正的“所见即所得”。</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm font-bold text-white/90">
                      <CheckCircle className="w-5 h-5 text-amber-500" /> 100% 还原设计效果
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-white/90">
                      <CheckCircle className="w-5 h-5 text-amber-500" /> 预算即决算，零增项
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-white/90">
                      <CheckCircle className="w-5 h-5 text-amber-500" /> 无推诿，单一责任主体
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mode 2 & 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-50 p-10 rounded-[32px] border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">2</span>
                    <h3 className="text-[22px] font-bold text-gray-900 tracking-tight">纯设计与智库</h3>
                  </div>
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">如果您已有信赖的施工团队。我们为您提供顶层方案设计与施工难点指导。</p>
                  <ul className="space-y-3 text-sm font-bold text-gray-700">
                    <li>• 全套深化施工图纸</li>
                    <li>• 关键节点现场交底</li>
                    <li>• 主材预算规划建议</li>
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-50 p-10 rounded-[32px] border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">3</span>
                    <h3 className="text-[22px] font-bold text-gray-900 tracking-tight">严选金牌施工</h3>
                  </div>
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">如果您自带设计图纸。我们将指派最顶尖的工长库与专属管家，提供严苛的德系施工。</p>
                  <ul className="space-y-3 text-sm font-bold text-gray-700">
                    <li>• 严选考核工长库入场</li>
                    <li>• 第三方管家全程品控</li>
                    <li>• 16大关键节点验核</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ④ Core Advantages */}
        <section className="py-32 bg-black text-white px-6">
          <div className="max-w-xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[40px] md:text-5xl font-bold tracking-tighter mb-20 leading-tight text-center"
            >
              无法妥协的四大底线
            </motion.h2>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-12">
              {[
                { icon: Diamond, title: '先试后定', desc: '不满意不付款，把主动权交还给业主。' },
                { icon: Award, title: '管家式监督', desc: '独立第三方监理，不隶属施工方。' },
                { icon: ShieldCheck, title: '无套路增项', desc: '闭口条约，任何非业主导致的增项由我们承担。' },
                { icon: Database, title: '数字档案', desc: '隐蔽工程全纪录，给房子建立终身病历本。' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-start text-left"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ⑤ CTA */}
        <section className="py-32 bg-[#FBFBFD] px-6 text-center border-t border-gray-100">
          <div className="max-w-xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[40px] md:text-5xl font-bold tracking-tighter mb-8 text-gray-900 leading-[1.1]"
            >
              您值得一次没有谎言的装修
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-gray-500 mb-16 text-lg font-medium"
            >
              对谈大宅专家，为您量身定制最合适的托管方案
            </motion.p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-10 py-6 rounded-full font-bold text-[19px] w-full shadow-[0_20px_40px_rgb(0,0,0,0.2)] hover:bg-gray-900 transition-colors"
            >
              免费预约大宅专家评估
            </motion.button>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-8 text-gray-400 text-sm font-bold tracking-wide uppercase"
            >
              极速响应 · 信息绝对保密
            </motion.p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
