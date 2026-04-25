import React, { useState } from 'react';
import { ChevronLeft, Share2, MessageCircle, MessageSquare, Link, Bookmark, Heart, X, Building2, Maximize2, MapPin, CreditCard, Users, CheckCircle2, FileText, ChevronRight, Wand2, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GraphicDetailPage = (props: { item: any; onBack: () => void; key?: React.Key }) => {
  const { item, onBack } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes || '0');
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [comments, setComments] = useState([
    { id: 1, author: '装修达人', avatar: 'https://i.pravatar.cc/150?u=u1', text: '这个设计太棒了！', time: '10分钟前' },
    { id: 2, author: '业主小王', avatar: 'https://i.pravatar.cc/150?u=u2', text: '请问这个瓷砖是什么牌子的？', time: '2小时前' },
  ]);
  const [commentInput, setCommentInput] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Simple mock like count update
    const count = parseInt(likeCount.replace('k', '000'));
    setLikeCount(isLiked ? (count - 1).toString() : (count + 1).toString());
  };

  const handleComment = () => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      author: '我',
      avatar: 'https://i.pravatar.cc/150?u=me',
      text: commentInput,
      time: '刚刚'
    };
    setComments([newComment, ...comments]);
    setCommentInput('');
  };

  const images = item.images || [item.image];

  const shareOptions = [
    { id: 'wechat', label: '微信好友', icon: MessageCircle, color: 'bg-[#07c160]' },
    { id: 'message', label: '私信好友', icon: MessageSquare, color: 'bg-blue-500' },
    { id: 'link', label: '复制链接', icon: Link, color: 'bg-gray-600' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <div className="flex items-center gap-2">
            <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full border border-gray-100" />
            <span className="text-sm font-bold text-gray-900">{item.author}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[#07c160] text-xs font-bold px-3 py-1.5 rounded-full border border-[#07c160]/30 bg-[#07c160]/5">
            关注
          </button>
          <button className="text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">
            私聊
          </button>
          <button 
            onClick={() => setShowShare(true)}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-24">
        {/* Image Section - Carousel */}
        <div className="relative w-full bg-gray-50 aspect-square overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out h-full"
            style={{ transform: `translateX(-${imgIndex * 100}%)` }}
          >
            {images.map((img: string, i: number) => (
              <div key={i} className="w-full h-full flex-shrink-0">
                <img 
                  src={img} 
                  alt={`${item.title} ${i + 1}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_: any, i: number) => (
                <div 
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === imgIndex ? "w-4 bg-white" : "w-1 bg-white/50"
                  )}
                />
              ))}
            </div>
          )}

          {/* Swipe Controls (Simplified for demo) */}
          {images.length > 1 && (
            <>
              <button 
                onClick={() => setImgIndex(prev => Math.max(0, prev - 1))}
                className={cn(
                  "absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/10 text-white backdrop-blur-sm",
                  imgIndex === 0 && "opacity-0 pointer-events-none"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setImgIndex(prev => Math.min(images.length - 1, prev + 1))}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/10 text-white backdrop-blur-sm",
                  imgIndex === images.length - 1 && "opacity-0 pointer-events-none"
                )}
              >
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </>
          )}
        </div>

        {/* Text Content */}
        <div className="px-5 py-6">
          <h1 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
            {item.title}
          </h1>
          <div className="space-y-4">
            <p className="text-gray-700 text-[15px] leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
            
            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag: string) => (
                  <span key={tag} className="text-[#07c160] text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Project Information Section */}
            {item.projectName && (
              <div className="mt-8 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4 text-[#5D2E2E]" />
                  <h3 className="text-sm font-bold text-gray-900">项目信息</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">项目名称</span>
                    <span className="text-xs font-medium text-gray-900">{item.projectName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">房屋面积</span>
                    <span className="text-xs font-medium text-gray-900">{item.area}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs text-gray-500 whitespace-nowrap">房屋位置</span>
                    <span className="text-xs font-medium text-gray-900 text-right">{item.houseLocation}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Cost Information Section */}
            {item.costs && (
              <div className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-4 h-4 text-[#5D2E2E]" />
                  <h3 className="text-sm font-bold text-gray-900">费用信息</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200/50">
                    <span className="text-xs text-gray-500">装修总费用</span>
                    <span className="text-sm font-bold text-[#5D2E2E]">¥{item.costs.decoration}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">人工费</span>
                      <span className="text-[11px] font-medium text-gray-900">¥{item.costs.labor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">辅材费</span>
                      <span className="text-[11px] font-medium text-gray-900">¥{item.costs.auxiliary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">主材费</span>
                      <span className="text-[11px] font-medium text-gray-900">¥{item.costs.main}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">其他费用</span>
                      <span className="text-[11px] font-medium text-gray-900">¥{item.costs.other}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Practitioner Information Section */}
            {item.practitioner && (
              <div className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-[#5D2E2E]" />
                  <h3 className="text-sm font-bold text-gray-900">服务团队信息</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={item.practitioner.avatar} alt={item.practitioner.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                      {item.practitioner.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#07c160]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-sm font-bold text-gray-900">{item.practitioner.name}</span>
                        <span className="bg-[#07c160]/10 text-[#07c160] text-[9px] px-1.5 py-0.5 rounded-sm font-bold">已认证</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500">
                        <FileText className="w-3 h-3" />
                        <span>数字档案: {item.practitioner.digitalArchive}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-[#5D2E2E] text-xs font-bold">
                    查看档案
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Completion Photos Section */}
            {item.completionPhotos && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-[#5D2E2E] rounded-full" />
                  <h3 className="text-base font-bold text-gray-900">装修完工图</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {item.completionPhotos.map((photo: string, idx: number) => (
                    <img 
                      key={idx} 
                      src={photo} 
                      alt={`完工图 ${idx + 1}`} 
                      className="w-full rounded-2xl object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Site Photos Section */}
            {item.sitePhotos && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-[#5D2E2E] rounded-full" />
                  <h3 className="text-base font-bold text-gray-900">施工现场图</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {item.sitePhotos.map((photo: string, idx: number) => (
                    <img 
                      key={idx} 
                      src={photo} 
                      alt={`现场图 ${idx + 1}`} 
                      className="w-full aspect-[4/3] rounded-xl object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Design Challenges Section */}
            {item.designChallenges && (
              <div className="mt-8 bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/50">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 className="w-4 h-4 text-[#07c160]" />
                  <h3 className="text-base font-bold text-gray-900">设计难点及解决方案</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">设计难点</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.designChallenges.difficulty}</p>
                  </div>
                  <div className="pt-3 border-t border-emerald-100/50">
                    <div className="text-[11px] font-bold text-[#07c160] uppercase tracking-wider mb-1">解决方案</div>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{item.designChallenges.solution}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Construction Challenges Section */}
            {item.constructionChallenges && (
              <div className="mt-4 bg-amber-50/50 rounded-2xl p-5 border border-amber-100/50">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardCheck className="w-4 h-4 text-amber-600" />
                  <h3 className="text-base font-bold text-gray-900">施工难点及解决方案</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">施工难点</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.constructionChallenges.difficulty}</p>
                  </div>
                  <div className="pt-3 border-t border-amber-100/50">
                    <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">解决方案</div>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{item.constructionChallenges.solution}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-[11px] text-gray-400 pt-6">
              发布于 2024-02-25 22:42
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gray-100 my-8" />

          {/* Comments Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">共 {comments.length} 条评论</h3>
            </div>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img src={comment.avatar} alt={comment.author} className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">{comment.author}</span>
                      <span className="text-[10px] text-gray-400">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interaction Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 px-4 py-3 pb-safe flex items-center gap-4 z-30">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="说点什么..." 
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
        <div className="flex items-center gap-5 pr-2">
          <button 
            onClick={handleLike}
            className="flex flex-col items-center gap-0.5"
          >
            <Heart className={cn("w-6 h-6", isLiked ? "text-red-500 fill-current" : "text-gray-700")} />
            <span className="text-[10px] text-gray-500 font-medium">{likeCount}</span>
          </button>
          <button 
            onClick={() => setIsFavorited(!isFavorited)}
            className="flex flex-col items-center gap-0.5"
          >
            <Bookmark className={cn("w-6 h-6", isFavorited ? "text-yellow-500 fill-current" : "text-gray-700")} />
            <span className="text-[10px] text-gray-500 font-medium">{item.favorites}</span>
          </button>
          <button className="flex flex-col items-center gap-0.5">
            <MessageCircle className="w-6 h-6 text-gray-700" />
            <span className="text-[10px] text-gray-500 font-medium">{comments.length}</span>
          </button>
        </div>
      </div>

      {/* Share Sheet */}
      <AnimatePresence>
        {showShare && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShare(false)}
              className="absolute inset-0 bg-black/60 z-[110]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl z-[120] px-6 pt-8 pb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900">分享到</h3>
                <button onClick={() => setShowShare(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-8">
                {shareOptions.map((option) => (
                  <button 
                    key={option.id}
                    onClick={() => setShowShare(false)}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", option.color)}>
                      <option.icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowShare(false)}
                className="w-full mt-10 py-4 bg-gray-50 rounded-2xl text-gray-900 font-bold text-sm"
              >
                取消
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GraphicDetailPage;
