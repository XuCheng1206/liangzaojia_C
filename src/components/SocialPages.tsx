import React from 'react';
import { ChevronLeft, UserPlus, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FollowersPage = ({ onBack }: { onBack: () => void }) => {
  const followers = [
    { id: 1, name: '装修达人小王', avatar: 'https://i.pravatar.cc/150?u=1', bio: '专注北欧风装修分享', isFollowing: true },
    { id: 2, name: '极简主义者', avatar: 'https://i.pravatar.cc/150?u=2', bio: '少即是多', isFollowing: false },
    { id: 3, name: '家居博主Momo', avatar: 'https://i.pravatar.cc/150?u=3', bio: '分享生活美学', isFollowing: true },
    { id: 4, name: '设计狮阿强', avatar: 'https://i.pravatar.cc/150?u=4', bio: '专业室内设计10年', isFollowing: false },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">粉丝</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {followers.map(user => (
          <div key={user.id} className="px-4 py-4 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="text-sm font-bold text-gray-900">{user.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{user.bio}</p>
              </div>
            </div>
            <button className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
              user.isFollowing ? "bg-gray-100 text-gray-500" : "bg-gray-900 text-white"
            )}>
              {user.isFollowing ? '互相关注' : '关注'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FollowingPage = ({ onBack }: { onBack: () => void }) => {
  const following = [
    { id: 1, name: '装修达人小王', avatar: 'https://i.pravatar.cc/150?u=1', bio: '专注北欧风装修分享' },
    { id: 3, name: '家居博主Momo', avatar: 'https://i.pravatar.cc/150?u=3', bio: '分享生活美学' },
    { id: 5, name: '老房改造家', avatar: 'https://i.pravatar.cc/150?u=5', bio: '让老房子焕发新生' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">关注</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {following.map(user => (
          <div key={user.id} className="px-4 py-4 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="text-sm font-bold text-gray-900">{user.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{user.bio}</p>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">
              已关注
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
