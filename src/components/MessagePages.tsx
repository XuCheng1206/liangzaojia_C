import React from 'react';
import { ChevronLeft, Heart, UserPlus, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LikesAndCollectionsPage = ({ onBack }: { onBack: () => void }) => {
  const items = [
    { id: 1, user: '张三', action: 'like', target: '现代简约风格别墅装修', time: '10分钟前', avatar: 'https://i.pravatar.cc/150?u=zhang' },
    { id: 2, user: '李四', action: 'collect', target: '老房翻新：50平米小户型大变身', time: '1小时前', avatar: 'https://i.pravatar.cc/150?u=li' },
    { id: 3, user: '王五', action: 'like', target: '中式禅意茶室设计', time: '2小时前', avatar: 'https://i.pravatar.cc/150?u=wang' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">赞和收藏</h1>
      </div>
      <div className="flex-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4 px-4 py-4 border-b border-gray-50">
            <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{item.user}</span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <p className="text-sm text-gray-600">
                {item.action === 'like' ? '赞了你的作品' : '收藏了你的作品'} <span className="font-medium text-gray-900">《{item.target}》</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NewFollowersPage = ({ onBack }: { onBack: () => void }) => {
  const followers = [
    { id: 1, name: '赵六', desc: '喜欢简约风格', time: '今天 09:00', avatar: 'https://i.pravatar.cc/150?u=zhao' },
    { id: 2, name: '孙七', desc: '正在装修中', time: '昨天 18:30', avatar: 'https://i.pravatar.cc/150?u=sun' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">新增关注</h1>
      </div>
      <div className="flex-1">
        {followers.map((follower) => (
          <div key={follower.id} className="flex items-center gap-4 px-4 py-4 border-b border-gray-50">
            <img src={follower.avatar} alt={follower.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900">{follower.name}</h3>
              <p className="text-xs text-gray-500">{follower.desc}</p>
              <p className="text-[10px] text-gray-400 mt-1">关注了你 · {follower.time}</p>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
              回关
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CommentsPage = ({ onBack }: { onBack: () => void }) => {
  const comments = [
    { id: 1, user: '周八', content: '设计得真不错，请问这个灯是在哪里买的？', target: '现代简约风格别墅装修', time: '15分钟前', avatar: 'https://i.pravatar.cc/150?u=zhou' },
    { id: 2, user: '吴九', content: '很有参考价值，收藏了！', target: '老房翻新：50平米小户型大变身', time: '2小时前', avatar: 'https://i.pravatar.cc/150?u=wu' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">评论</h1>
      </div>
      <div className="flex-1">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4 px-4 py-4 border-b border-gray-50">
            <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{comment.user}</span>
                <span className="text-xs text-gray-400">{comment.time}</span>
              </div>
              <p className="text-sm text-gray-800 mb-2">{comment.content}</p>
              <div className="bg-gray-50 p-2 rounded-lg text-xs text-gray-500">
                评论了你的作品 《{comment.target}》
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MessagesPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const messages = [
    { id: 1, name: '系统通知', content: '您的案例“现代简约风格”已通过审核', time: '10:30', avatar: 'https://picsum.photos/seed/sys/100/100', unread: 1 },
    { id: 2, name: '陈设计师', content: '你好，看到你发布的案例很感兴趣...', time: '昨天', avatar: 'https://i.pravatar.cc/150?u=chen', unread: 0 },
    { id: 3, name: '装修小助手', content: '欢迎来到良造家！开启您的家装之旅', time: '2024-02-20', avatar: 'https://picsum.photos/seed/bot/100/100', unread: 0 },
  ];

  const quickActions = [
    { id: 'likes', label: '赞和收藏', icon: Heart, color: 'bg-red-50', iconColor: 'text-red-500', target: 'likes-collections' },
    { id: 'followers', label: '新增关注', icon: UserPlus, color: 'bg-blue-50', iconColor: 'text-blue-500', target: 'new-followers' },
    { id: 'comments', label: '评论', icon: MessageCircle, color: 'bg-emerald-50', iconColor: 'text-emerald-500', target: 'comments' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center">
        <h1 className="text-lg font-bold text-gray-900">消息</h1>
      </div>

      {/* Quick Actions Section */}
      <div className="flex items-center justify-around py-6 border-b border-gray-50">
        {quickActions.map((action) => (
          <button 
            key={action.id} 
            onClick={() => onNavigate(action.target)}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-active:scale-95", action.color)}>
              <action.icon className={cn("w-6 h-6", action.iconColor)} />
            </div>
            <span className="text-xs text-gray-600 font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="divide-y divide-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-center gap-4 px-4 py-4 active:bg-gray-50 transition-colors">
            <div className="relative">
              <img src={msg.avatar} alt={msg.name} className="w-12 h-12 rounded-full object-cover" />
              {msg.unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {msg.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[15px] font-bold text-gray-900 truncate">{msg.name}</h3>
                <span className="text-[10px] text-gray-400">{msg.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
