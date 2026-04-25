import React, { useState } from 'react';
import { ChevronLeft, Heart, FileText, Box, Home, User } from 'lucide-react';
import { motion } from 'motion/react';

const MyFavoritesPage = ({ onBack }: { onBack: () => void }) => {
  const [favoriteItems] = useState([
    {
      id: 1,
      title: '极简原木风全屋定制',
      type: '装修笔记',
      time: '2024-03-08 14:30',
      cover: 'https://picsum.photos/seed/fav1/300/400'
    },
    {
      id: 2,
      title: '120平现代轻奢落地',
      type: '真实装修',
      time: '2024-03-08 11:15',
      cover: 'https://picsum.photos/seed/fav2/300/400'
    },
    {
      id: 3,
      title: '老房翻新预算规划',
      type: '项目推演',
      time: '2024-03-07 18:20',
      cover: 'https://picsum.photos/seed/fav3/300/400'
    },
    {
      id: 4,
      title: '法式复古风软装搭配',
      type: '装修笔记',
      time: '2024-03-06 21:10',
      cover: 'https://picsum.photos/seed/fav5/300/400'
    }
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '装修笔记': return <FileText className="w-3 h-3" />;
      case '项目推演': return <Box className="w-3 h-3" />;
      case '真实装修': return <Home className="w-3 h-3" />;
      case '良匠推荐': return <User className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '装修笔记': return 'bg-blue-500/80 text-white';
      case '项目推演': return 'bg-purple-500/80 text-white';
      case '真实装修': return 'bg-emerald-500/80 text-white';
      case '良匠推荐': return 'bg-orange-500/80 text-white';
      default: return 'bg-gray-500/80 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的收藏</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Content Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {favoriteItems.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group cursor-pointer flex flex-col gap-2"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-200 shadow-sm border border-gray-100">
                <img 
                  src={item.cover} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Type Badge */}
                <div className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md backdrop-blur-md flex items-center gap-1 text-[9px] font-medium ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                  <span>{item.type}</span>
                </div>
                {/* Favorite Icon */}
                <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              </div>
              
              {/* Info */}
              <div className="px-0.5">
                <h3 className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        {favoriteItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Heart className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">暂无收藏记录</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavoritesPage;
