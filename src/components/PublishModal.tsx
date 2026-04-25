import React, { useState, useEffect } from 'react';
import { X, Image, Video, FileText, ArrowRight, Camera, Map, Upload, Sparkles, Minimize2, Maximize2, Bookmark, Plus, Pencil, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PublishModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<'choice' | 'form'>('choice');
  const [type, setType] = useState<'graphic' | 'video' | 'requirement' | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [description, setDescription] = useState('');
  const [isAIWriting, setIsAIWriting] = useState(false);
  const [isFullScreenDescription, setIsFullScreenDescription] = useState(false);
  const [syncToArchive, setSyncToArchive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('choice');
      setType(null);
      setImages([]);
      setTags([]);
      setTagInput('');
      setDescription('');
      setIsAIWriting(false);
      setIsFullScreenDescription(false);
      setSyncToArchive(false);
    }
  }, [isOpen]);

  const handleAIWrite = async () => {
    if (isAIWriting) return;
    setIsAIWriting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "帮我写一段装修需求描述。要求：三室两厅，现代简约风格，预算20万，注重储物空间和环保材料。请用专业且口语化的方式表达。",
        config: {
          systemInstruction: "你是一个专业的装修顾问，帮助用户撰写清晰、专业的装修需求描述。",
        }
      });
      if (response.text) {
        setDescription(response.text);
      }
    } catch (error) {
      console.error("AI Writing failed:", error);
      // Fallback mock if API fails or key is missing
      setDescription("我家是三室两厅的格局，希望能做现代简约风格。装修预算在20万左右，希望能充分利用空间多做一些储物柜，材料一定要环保，尤其是小孩子的房间。");
    } finally {
      setIsAIWriting(false);
    }
  };

  const handleChoice = (t: 'graphic' | 'video' | 'requirement') => {
    setType(t);
    setStep('form');
  };

  const handleBack = () => {
    if (step === 'form') {
      setStep('choice');
    } else {
      onClose();
    }
  };

  const addImage = () => {
    const newImg = `https://picsum.photos/seed/${Math.random()}/800/800`;
    setImages(prev => [...prev, newImg]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleEditTag = (tag: string) => {
    if (tagInput.trim()) {
      addTag(); // Save current input if not empty
    }
    setTagInput(tag);
    removeTag(tag);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white"
          />
          
          <div className="relative flex-1 flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50 bg-white sticky top-0 z-10">
              <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-800" />
              </button>
              <h2 className="text-lg font-bold text-gray-900">
                {step === 'choice' ? '我的需求' : (
                  type === 'graphic' ? '图文档案' : 
                  type === 'video' ? '项目影像档案' : 
                  '我的需求'
                )}
              </h2>
              {step === 'form' ? (
                <button 
                  onClick={onClose}
                  className="px-4 py-1.5 bg-[#07c160] text-white text-sm font-bold rounded-full shadow-sm active:scale-95 transition-transform"
                >
                  保存
                </button>
              ) : (
                <div className="w-10" />
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {step === 'choice' ? (
                <div className="space-y-8 pt-4">
                  {/* Category 1: Renovation Diary */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 px-2">
                      <div className="w-1 h-4 bg-[#07c160] rounded-full" />
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">发布装修日记</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleChoice('graphic')}
                        className="bg-emerald-50/50 p-6 rounded-2xl flex items-center justify-between group border border-emerald-100/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <Image className="w-6 h-6" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-base font-bold text-emerald-900">图文案例</h3>
                            <p className="text-emerald-600/60 text-xs mt-0.5">分享装修灵感与避坑经验</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleChoice('video')}
                        className="bg-blue-50/50 p-6 rounded-2xl flex items-center justify-between group border border-blue-100/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <Video className="w-6 h-6" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-base font-bold text-blue-900">视频案例</h3>
                            <p className="text-blue-600/60 text-xs mt-0.5">沉浸式记录装修全过程</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Category 2: Renovation Requirement */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 px-2">
                      <div className="w-1 h-4 bg-orange-500 rounded-full" />
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">我的需求</h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleChoice('requirement')}
                      className="w-full bg-orange-50/50 p-6 rounded-2xl flex items-center justify-between group border border-orange-100/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-base font-bold text-orange-900">我的需求</h3>
                          <p className="text-orange-600/60 text-xs mt-0.5">启动专属项目匹配流程</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {type === 'requirement' ? (
                    <div className="space-y-6">
                      {/* Title at the top */}
                      <div className="border-b border-gray-100 pb-3">
                        <input 
                          type="text" 
                          placeholder="填写需求标题（如：三室两厅精装需求）" 
                          className="w-full bg-transparent border-none outline-none font-bold text-xl placeholder:text-gray-200"
                        />
                      </div>

                      {/* Upload Images/Videos */}
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <Camera className="w-4 h-4 text-gray-400" />
                          房屋照片/视频
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          <AnimatePresence>
                            {images.map((img, index) => (
                              <motion.div 
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative aspect-square rounded-xl overflow-hidden group"
                              >
                                <img src={img} className="w-full h-full object-cover" />
                                <button 
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-2.5 h-2.5" />
                                </button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          {images.length < 9 && (
                            <button 
                              onClick={addImage}
                              className="aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-5 h-5" />
                              <span className="text-[10px]">{images.length}/9</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Upload Floor Plan */}
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <Map className="w-4 h-4 text-gray-400" />
                          上传户型图
                        </label>
                        <div className="p-4 bg-orange-50/50 rounded-2xl border border-dashed border-orange-200 flex items-center justify-center gap-3 text-orange-600 cursor-pointer hover:bg-orange-50 transition-colors">
                          <Upload className="w-5 h-5" />
                          <span className="text-sm font-medium">选择户型图文件或拍照</span>
                        </div>
                      </div>

                      <div className={cn(
                        "space-y-4 transition-all duration-300",
                        isFullScreenDescription ? "fixed inset-0 z-[210] bg-white p-6 flex flex-col" : "relative"
                      )}>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-bold text-gray-900">需求详情描述</label>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={handleAIWrite}
                              disabled={isAIWriting}
                              className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-bold rounded-full shadow-sm active:scale-95 transition-all disabled:opacity-50"
                            >
                              <Sparkles className={cn("w-3 h-3", isAIWriting && "animate-pulse")} />
                              {isAIWriting ? 'AI生成中...' : 'AI帮写'}
                            </button>
                            <button 
                              onClick={() => setIsFullScreenDescription(!isFullScreenDescription)}
                              className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                              title={isFullScreenDescription ? "退出全屏" : "全屏编辑"}
                            >
                              {isFullScreenDescription ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <textarea 
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="请详细描述您的装修需求（如：风格偏好、功能分区要求等）"
                          className={cn(
                            "w-full bg-gray-50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#07c160]/20 border border-transparent focus:border-[#07c160]/30 transition-all resize-none",
                            isFullScreenDescription ? "flex-1 text-base" : "h-32"
                          )}
                        />
                        {isFullScreenDescription && (
                          <button 
                            onClick={() => setIsFullScreenDescription(false)}
                            className="mt-4 w-full py-3 bg-[#07c160] text-white font-bold rounded-xl shadow-lg shadow-[#07c160]/20 active:scale-[0.98] transition-all"
                          >
                            完成编辑
                          </button>
                        )}
                      </div>

                      {/* Tags Section for Requirement */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Bookmark className="w-4 h-4" />
                            <span className="text-sm font-medium">标签</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="bg-orange-50 text-orange-600 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-orange-100"
                            >
                              #{tag}
                              <button onClick={() => removeTag(tag)} className="hover:text-orange-700">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                          <div className="flex-1 flex items-center bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100 focus-within:border-orange-200 transition-colors min-w-[140px]">
                            <span className="text-gray-300 text-xs mr-1">#</span>
                            <input 
                              type="text" 
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={handleTagKeyDown}
                              placeholder="输入标签按回车" 
                              className="bg-transparent border-none outline-none text-xs flex-1 placeholder:text-gray-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500">房屋面积 (m²)</label>
                          <input type="number" placeholder="请输入" className="w-full bg-gray-50 rounded-xl p-3 text-sm focus:outline-none border border-transparent focus:border-[#07c160]/30" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500">装修预算 (万元)</label>
                          <input type="number" placeholder="请输入" className="w-full bg-gray-50 rounded-xl p-3 text-sm focus:outline-none border border-transparent focus:border-[#07c160]/30" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500">联系电话</label>
                        <input type="tel" placeholder="方便设计师与您联系" className="w-full bg-gray-50 rounded-xl p-3 text-sm focus:outline-none border border-transparent focus:border-[#07c160]/30" />
                      </div>

                      {/* Sync to Archive Option */}
                      <div className="pt-4 border-t border-gray-50">
                        <button 
                          onClick={() => setSyncToArchive(!syncToArchive)}
                          className="flex items-center gap-3 group"
                        >
                          <div className={cn(
                            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                            syncToArchive ? "bg-[#07c160] border-[#07c160]" : "border-gray-200 group-hover:border-gray-300"
                          )}>
                            {syncToArchive && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <span className={cn(
                            "text-sm font-medium transition-colors",
                            syncToArchive ? "text-gray-900" : "text-gray-500"
                          )}>
                            同步到私宅装修档案
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : type === 'video' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-[3/4] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Video className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-[11px] font-medium">上传视频</span>
                      </div>
                      <div className="aspect-[3/4] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Image className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="text-[11px] font-medium">上传封面</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      <AnimatePresence>
                        {images.map((img, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative aspect-square rounded-xl overflow-hidden group"
                          >
                            <img src={img} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {images.length < 9 && (
                        <button 
                          onClick={addImage}
                          className="aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                          <Camera className="w-6 h-6 text-emerald-500" />
                          <span className="text-[10px] font-medium">{images.length}/9</span>
                        </button>
                      )}
                    </div>
                  )}

                    <div className="space-y-6">
                      <div className="border-b border-gray-100 pb-3">
                        <input 
                          type="text" 
                          placeholder="填写标题（最多20字）" 
                          className="w-full bg-transparent border-none outline-none font-bold text-xl placeholder:text-gray-200"
                        />
                      </div>

                      {/* Custom Tags Section - Moved up for better visibility */}
                      <div className="space-y-3 py-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Bookmark className="w-4 h-4" />
                            <span className="text-sm font-medium">标签</span>
                          </div>
                          <span className="text-[10px] text-gray-300">点击标签可编辑</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="bg-emerald-50 text-[#07c160] text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-100 group/tag"
                            >
                              <span 
                                onClick={() => handleEditTag(tag)}
                                className="cursor-pointer hover:underline flex items-center gap-1"
                              >
                                #{tag}
                                <Pencil className="w-2.5 h-2.5 opacity-0 group-hover/tag:opacity-100 transition-opacity" />
                              </span>
                              <button onClick={() => removeTag(tag)} className="hover:text-emerald-700 ml-0.5">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                          <div className="flex-1 flex items-center bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100 focus-within:border-emerald-200 transition-colors min-w-[140px]">
                            <span className="text-gray-300 text-xs mr-1">#</span>
                            <input 
                              type="text" 
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={handleTagKeyDown}
                              placeholder="输入标签按回车" 
                              className="bg-transparent border-none outline-none text-xs flex-1 placeholder:text-gray-300"
                            />
                            {tagInput && (
                              <button onClick={addTag} className="ml-1 text-emerald-500 p-0.5 hover:bg-emerald-100 rounded-full transition-colors">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <textarea 
                        placeholder="添加正文，分享你的装修故事..." 
                        rows={6}
                        className="w-full bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-200 resize-none leading-relaxed text-[15px] pt-2 border-t border-gray-50"
                      />
                    </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PublishModal;
