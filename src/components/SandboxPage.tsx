import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Send, Bot, User, Loader2, Paintbrush, Hammer, Square, Copy, Check } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

type Scenario = 'design' | 'construction' | 'material' | null;

const DESIGN_SUGGESTIONS = [
  "大平层如何设计才能避免空间显得空旷？",
  "别墅地下室防潮设计有哪些好方案？",
  "大平层客餐厅一体化设计，如何划分功能区？",
  "别墅挑高客厅的灯光和软装该怎么搭配？"
];

const CONSTRUCTION_SUGGESTIONS = [
  "别墅地下室防水施工有哪些关键步骤？",
  "大平层全屋智能布线需要注意什么？",
  "大面积铺贴大板瓷砖，如何防止空鼓和脱落？",
  "别墅中央空调和新风系统的管道该如何规划？"
];

const MATERIAL_SUGGESTIONS = [
  "全屋智能系统，KNX和无线方案怎么选？",
  "别墅地下室防潮，用什么材料最靠谱？",
  "进口岩板和大理石，哪个更适合做背景墙？",
  "高端实木地板和三层实木，选哪个更好打理？"
];

export default function SandboxPage({ onBack }: { onBack: () => void }) {
  const [scenario, setScenario] = useState<Scenario>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isCancelledRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleStop = () => {
    isCancelledRef.current = true;
    setIsLoading(false);
    setIsThinking(false);
  };

  const handleSelectScenario = (selected: 'design' | 'construction' | 'material') => {
    setScenario(selected);
    let content = '';
    if (selected === 'design') {
      content = '哈喽！我是造梦人，你的私享美学顾问✨。想把别墅打造成什么理想模样？不管是纠结空间布局、挑材质，还是高定软装搭配，随时跟我探讨呀！';
    } else if (selected === 'construction') {
      content = '嗨！我是手艺人，你的专属工程管家🛠️。大宅施工细节多、怕踩坑？不知道选什么高端材料？或者全屋智能、机电系统怎么规划最合理？把顾虑都交给我，我帮你严格把关！';
    } else {
      content = '哈喽！我是寻材人，你的全球选材管家💎。大宅装修挑花眼？无论是进口大理石、奢华木作，还是高端智能家电，告诉我你的需求和预算，我帮你万里挑一！';
    }
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: 'model',
      content
    };
    setMessages([welcomeMessage]);
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading || !scenario) return;

    isCancelledRef.current = false;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText
    };

    setMessages(prev => [...prev, userMessage]);
    if (!text) setInput('');
    setIsLoading(true);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let systemInstruction = "";
      if (scenario === 'design') {
        systemInstruction = "你叫造梦人，是用户的朋友兼私享美学顾问（女性设定），主要服务别墅和大宅用户。你擅长解答关于大宅空间布局、高端风格搭配、材质选择、高定软装布置等设计相关的问题。请用像朋友一样亲切、自然、热情且带有高级审美的语气回答，拉近距离，展现专业与品味。";
      } else if (scenario === 'construction') {
        systemInstruction = "你叫手艺人，是用户的朋友兼专属工程管家（男性设定），主要服务别墅和大宅用户。你经验丰富，擅长解答关于大宅精工工艺、高端材料选择、全屋智能、机电及隐蔽工程等施工相关的问题，帮用户避坑。请用像老朋友一样实在、靠谱、专业、沉稳的语气回答，拉近距离，展现大宅施工的严谨与匠心。";
      } else {
        systemInstruction = "你叫寻材人，是用户的朋友兼全球选材管家（中性或女性设定），主要服务别墅和大宅用户。你精通各类高端建材、进口家具、智能家电的品牌、材质、优缺点及市场行情。请用像朋友一样热情、专业、品味卓绝的语气回答，帮用户甄选最适合大宅的顶级材料，避免智商税。";
      }

      const contents = [
        ...messages.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        })),
        {
          role: 'user',
          parts: [{ text: userMessage.content }]
        }
      ];

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: contents as any,
        config: {
          systemInstruction,
        }
      });

      const modelMessageId = (Date.now() + 1).toString();
      let isFirstChunk = true;

      for await (const chunk of responseStream) {
        if (isCancelledRef.current) {
          break;
        }
        
        if (isFirstChunk) {
          setIsThinking(false);
          setMessages(prev => [...prev, {
            id: modelMessageId,
            role: 'model',
            content: chunk.text || ''
          }]);
          isFirstChunk = false;
        } else {
          setMessages(prev => prev.map(msg => 
            msg.id === modelMessageId ? { ...msg, content: msg.content + (chunk.text || '') } : msg
          ));
        }
      }
    } catch (error) {
      if (isCancelledRef.current) return;
      console.error("Failed to generate response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: '抱歉，我遇到了一些问题，暂时无法回答。请稍后再试。'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      if (!isCancelledRef.current) {
        setIsLoading(false);
        setIsThinking(false);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-gray-50 flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-100 shadow-sm">
        <button 
          onClick={() => {
            if (scenario) {
              setScenario(null);
            } else {
              onBack();
            }
          }} 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">
            {scenario === 'design' ? '造梦人 - 设计顾问' : scenario === 'construction' ? '手艺人 - 施工顾问' : scenario === 'material' ? '寻材人 - 材料买手' : '决策沙盘'}
          </h1>
          <p className="text-[10px] text-gray-500">AI 智能装修顾问</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {!scenario ? (
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full gap-8">
            <div className="text-center space-y-2">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" alt="造梦人" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="手艺人" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="寻材人" className="w-full h-full object-cover" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900">欢迎来到决策沙盘</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                哈喽！我们是你的专属大宅定制团队。关于空间美学与设计灵感，找“造梦人”聊聊；关于精工落地与材料把关，找“手艺人”问问；关于高端建材与家居选购，找“寻材人”把关。别客气，随时探讨！
              </p>
            </div>

            <div className="w-full space-y-4">
              <p className="text-xs font-bold text-gray-400 text-center uppercase tracking-widest">请选择咨询场景</p>
              <button 
                onClick={() => handleSelectScenario('design')}
                className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" alt="造梦人" className="w-full h-full object-cover" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">造梦人 <span className="text-xs font-normal text-gray-500 ml-1">私享美学顾问</span></h3>
                  <p className="text-xs text-gray-500">聊聊大宅空间美学，风格、色彩、高定软装</p>
                </div>
              </button>

              <button 
                onClick={() => handleSelectScenario('construction')}
                className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="手艺人" className="w-full h-full object-cover" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">手艺人 <span className="text-xs font-normal text-gray-500 ml-1">专属工程管家</span></h3>
                  <p className="text-xs text-gray-500">聊聊大宅精工落地，材料、工艺、隐蔽工程</p>
                </div>
              </button>

              <button 
                onClick={() => handleSelectScenario('material')}
                className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" alt="寻材人" className="w-full h-full object-cover" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">寻材人 <span className="text-xs font-normal text-gray-500 ml-1">全球选材管家</span></h3>
                  <p className="text-xs text-gray-500">聊聊高端建材选购，品牌、材质、优缺点</p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {messages.map((msg, index) => (
              <div key={msg.id} className="flex flex-col gap-2">
                <div 
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className="flex-shrink-0 mt-1">
                    {msg.role === 'user' ? (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm flex-shrink-0">
                        <img 
                          src={scenario === 'design' 
                            ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
                            : scenario === 'construction'
                            ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
                            : "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100"
                          } 
                          alt={scenario === 'design' ? '造梦人' : scenario === 'construction' ? '手艺人' : '寻材人'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap shadow-sm relative group",
                    msg.role === 'user' 
                      ? "bg-[#07c160] text-white rounded-tr-sm" 
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm"
                  )}>
                    {msg.content}
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className={cn(
                        "absolute -bottom-8 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border border-gray-100",
                        msg.role === 'user' ? "right-0" : "left-0"
                      )}
                      title="复制"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                {index === 0 && msg.role === 'model' && messages.length === 1 && (
                  <div className="ml-11 mt-2 flex flex-col gap-2 items-start">
                    {(scenario === 'design' ? DESIGN_SUGGESTIONS : scenario === 'construction' ? CONSTRUCTION_SUGGESTIONS : MATERIAL_SUGGESTIONS).map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(suggestion)}
                        className="text-left px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:border-[#07c160] hover:text-[#07c160] transition-colors shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isThinking && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm flex-shrink-0">
                    <img 
                      src={scenario === 'design' 
                        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
                        : scenario === 'construction'
                        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
                        : "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100"
                      } 
                      alt={scenario === 'design' ? '造梦人' : scenario === 'construction' ? '手艺人' : '寻材人'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white border border-gray-100 rounded-tl-sm shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                  <span className="text-sm text-gray-500">正在思考...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {scenario && (
        <div className="bg-white border-t border-gray-100 p-4 pb-safe">
          <div className="flex items-end gap-2 bg-gray-50 rounded-2xl p-2 border border-gray-200 focus-within:border-[#07c160] focus-within:ring-1 focus-within:ring-[#07c160] transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={scenario === 'design' ? "描述你的设计需求或疑问..." : "描述你的施工疑问或材料问题..."}
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[40px] py-2 px-2 text-sm text-gray-900 placeholder:text-gray-400"
              rows={1}
            />
            {isLoading ? (
              <button 
                onClick={handleStop}
                className="p-2.5 bg-red-500 text-white rounded-xl transition-colors shrink-0 mb-0.5"
                title="停止生成"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-2.5 bg-[#07c160] text-white rounded-xl disabled:opacity-50 disabled:bg-gray-300 transition-colors shrink-0 mb-0.5"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
