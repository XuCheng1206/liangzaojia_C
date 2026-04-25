/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, LayoutGrid, Users, FileText, Box, MapPin, Flame, Plus, Home, User, ChevronLeft, Heart, Play, Layers, MessageCircle, Bookmark, Share2, X, UserPlus, Send, MoreHorizontal, Link, MessageSquare, Image, Video, Camera, ArrowRight, Pencil, Phone, BookOpen, ClipboardCheck, LogOut, ChevronRight, ChevronDown, Award, Eye, Clock, AlertCircle, CheckCircle2, Power, ArrowUpCircle, Building2, Map, Upload, Sparkles, Wand2, Maximize2, Minimize2, CreditCard, PieChart, Zap, Star, Fingerprint, Shield, Copy, Wallet, Briefcase, Coins, Quote, Check, Filter, Bot, Settings, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import BrowsingHistoryPage from './components/BrowsingHistoryPage';
import SandboxPage from './components/SandboxPage';
import MyFavoritesPage from './components/MyFavoritesPage';
import ModeIntroPage from './components/ModeIntroPage';
import ServiceModePage from './components/ServiceModePage';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---

const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: '良知工程：定义家装新标准',
    subtitle: '良造家 · 匠心工艺 · 透明施工',
    tag: '核心模式',
    location: '全国 · 连锁',
    image: 'https://picsum.photos/seed/liangzao/800/400',
    status: '深度解析'
  },
  {
    id: 2,
    title: '极简主义：重塑生活空间',
    subtitle: '个性化家装 · 灵感集锦',
    tag: '热门案例',
    location: '上海 · 静安',
    image: 'https://picsum.photos/seed/decor1/800/400',
    status: '火热咨询'
  },
  {
    id: 3,
    title: '复古工业风：硬核美学',
    subtitle: '独具匠心 · 空间改造',
    tag: '设计师推荐',
    location: '北京 · 朝阳',
    image: 'https://picsum.photos/seed/decor2/800/400',
    status: '限时优惠'
  },
  {
    id: 4,
    title: '原木自然风：呼吸感家装',
    subtitle: '环保材料 · 舒适生活',
    tag: '绿色家装',
    location: '杭州 · 西湖',
    image: 'https://picsum.photos/seed/decor3/800/400',
    status: '专家点评'
  }
];

const GRID_ITEMS = [
  { id: 'cases', label: '良知档案', sub: '全案履约记录', icon: FileText, color: 'text-amber-600', bg: 'bg-zinc-900' },
  { id: 'craftsman', label: '顶级鲁班', sub: '塔尖工匠库', icon: Award, color: 'text-amber-600', bg: 'bg-zinc-900' },
];

const LIST_ITEMS = [
  {
    id: 1,
    title: '上海檀宫：800㎡法式独栋别墅全案',
    category: '全案定制',
    location: '上海 · 檀宫',
    likes: 3205,
    author: '良造家专家组',
    avatar: 'https://i.pravatar.cc/150?u=studio1',
    tags: ['法式', '独栋别墅', '全案定制'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    type: '项目'
  },
  {
    id: 2,
    title: '深圳湾1号：320㎡现代极简大平层',
    category: '硬装施工',
    location: '深圳 · 南山',
    likes: 2890,
    author: '李明远（金牌工长）',
    avatar: 'https://i.pravatar.cc/150?u=li',
    tags: ['极简', '大平层', '海景'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
    type: '案例'
  },
  {
    id: 3,
    title: '北京九章别墅：新中式传世府邸',
    category: '空间规划',
    location: '北京 · 朝阳',
    likes: 4340,
    author: '王大师',
    avatar: 'https://i.pravatar.cc/150?u=wang',
    tags: ['新中式', '别墅', '园林'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80',
    type: '案例'
  },
  {
    id: 4,
    title: '杭州桃花源：500㎡现代轻奢庄园',
    category: '软装设计',
    location: '浙江 · 杭州',
    likes: 2560,
    author: '陈设计师',
    avatar: 'https://i.pravatar.cc/150?u=chen',
    tags: ['轻奢', '庄园', '智能家居'],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80',
    type: '招募'
  }
];

const CASE_DATA = [
  {
    id: 1,
    title: '上海檀宫800㎡法式独栋别墅全案',
    hookTitle: '传世之作：法式浪漫的极致演绎',
    description: '本案位于上海顶级豪宅区檀宫，建筑面积800平米。设计团队以纯正法式古典风格为基调，结合现代智能家居系统，打造出既有历史厚重感又不失现代舒适的传世府邸。全屋采用进口大理石、手工雕花护墙板，每一处细节都彰显着主人的非凡品味与尊贵身份。',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-4437-large.mp4',
    author: '良造家专家组',
    avatar: 'https://i.pravatar.cc/150?u=studio1',
    likes: '3.2w',
    favorites: '2.8w',
    comments: '1256',
    height: 'h-[210px]',
    contentType: 'video',
    tags: ['法式', '独栋别墅', '全案定制']
  },
  {
    id: 2,
    title: '深圳湾1号320㎡现代极简大平层',
    hookTitle: '云端之上的极简美学',
    description: '坐拥无敌海景的320平米大平层，我们采用了极简主义设计手法，将视觉焦点完全让渡给窗外的壮丽景色。全屋无主灯设计，大面积使用微水泥和木饰面，营造出宁静、内敛的奢华感。智能中控系统将灯光、窗帘、空调完美整合，一键切换多种生活场景。',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    author: '李明远（金牌工长）',
    avatar: 'https://i.pravatar.cc/150?u=li',
    likes: '2.8w',
    favorites: '1.5w',
    comments: '820',
    height: 'h-[160px]',
    contentType: 'text',
    tags: ['极简', '大平层', '海景']
  },
  {
    id: 3,
    title: '北京九章别墅新中式传世府邸',
    hookTitle: '东方意境与现代奢华的交融',
    description: '占地1200平米的九章别墅，设计灵感源自传统园林。室内大量运用金丝楠木、汉白玉等顶级材质，结合现代智能灯光系统，营造出大隐于市的东方禅意空间。私人酒窖、影音室、室内恒温泳池一应俱全。',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-with-a-fireplace-and-a-large-window-4436-large.mp4',
    author: '王大师',
    avatar: 'https://i.pravatar.cc/150?u=wang',
    likes: '4.5w',
    favorites: '3.8w',
    comments: '2200',
    height: 'h-[220px]',
    contentType: 'video'
  },
  {
    id: 4,
    title: '杭州桃花源500㎡现代轻奢庄园',
    hookTitle: '隐于山水的奢华生活',
    description: '位于杭州桃花源的500平米庄园，采用现代轻奢风格。全屋智能中控，大面积落地窗将室外山水景观引入室内。意大利进口家具、定制级艺术陈设，每一个角落都散发着低调的奢华。',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    author: '陈设计师',
    avatar: 'https://i.pravatar.cc/150?u=chen',
    likes: '3.4w',
    favorites: '2.5w',
    comments: '2100',
    height: 'h-[170px]',
    contentType: 'text'
  },
  {
    id: 5,
    title: '广州侨鑫汇悦台400㎡顶复',
    hookTitle: '珠江新城之巅的奢华',
    description: '侨鑫汇悦台400平米顶层复式，拥有270度无敌江景。设计采用现代意式极简风格，全屋B&B Italia家具，Boffi橱柜。私人电梯入户，双挑高客厅，尽显塔尖圈层的尊贵与气度。',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-kitchen-interior-with-white-cabinets-4435-large.mp4',
    author: '良造家专家组',
    avatar: 'https://i.pravatar.cc/150?u=studio1',
    likes: '5.2w',
    favorites: '4.7w',
    comments: '3540',
    height: 'h-[190px]',
    contentType: 'video'
  },
  {
    id: 6,
    title: '成都麓湖生态城600㎡临湖别墅',
    hookTitle: '与自然共生的水上豪宅',
    description: '麓湖生态城600平米临湖独栋，拥有私人游艇码头。设计理念为"引水入室"，大面积玻璃幕墙打破室内外边界。下沉式庭院、星空露台、私人酒窖，打造极致的度假式居住体验。',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    author: '张建国（金牌工长）',
    avatar: 'https://i.pravatar.cc/150?u=zhang',
    likes: '4.8w',
    favorites: '3.4w',
    comments: '1280',
    height: 'h-[200px]',
    contentType: 'text'
  }
];

const CRAFTSMAN_DATA = [
  {
    id: 'c1',
    name: '张建国',
    title: '金牌水电工艺大师',
    experience: '18年经验',
    rating: '5.0',
    tags: ['水电改造', '精工细作', '德系标准'],
    tag: '高端工长',
    avatar: 'https://i.pravatar.cc/150?u=zhang',
    image: 'https://picsum.photos/seed/worker1/800/600',
    description: '专注水电隐蔽工程18年，参与过500+高端住宅项目，坚持德系施工标准。',
    projects: 524,
    verified: true,
    type: 'craftsman'
  },
  {
    id: 'c2',
    name: '李明远',
    title: '资深瓦石工艺专家',
    experience: '15年经验',
    rating: '4.9',
    tags: ['瓷砖铺贴', '大板施工', '工艺严谨'],
    tag: '高端设计师',
    avatar: 'https://i.pravatar.cc/150?u=li',
    image: 'https://picsum.photos/seed/worker2/800/600',
    description: '擅长各种异形铺贴，细节控，追求极致平整，是多家知名设计公司的指定合作方。',
    projects: 386,
    verified: true,
    type: 'craftsman'
  },
  {
    id: 'c3',
    name: '王志刚',
    title: '高级木作系统专家',
    experience: '20年经验',
    rating: '4.9',
    tags: ['全屋定制', '手工木作', '环保至上'],
    tag: '高端工作室',
    avatar: 'https://i.pravatar.cc/150?u=wang',
    image: 'https://picsum.photos/seed/worker3/800/600',
    description: '传统木工手艺传承人，结合现代精密设备，打造极具质感的全屋木作系统。',
    projects: 412,
    verified: true,
    type: 'craftsman'
  },
  {
    id: 'c4',
    name: '赵强',
    title: '涂装色彩美学顾问',
    experience: '12年经验',
    rating: '4.8',
    tags: ['艺术涂料', '色彩搭配', '环保施工'],
    tag: '高端工长',
    avatar: 'https://i.pravatar.cc/150?u=zhao',
    image: 'https://picsum.photos/seed/worker4/800/600',
    description: '精通各种艺术涂料工艺，对色彩有极高敏锐度，为空间注入艺术灵魂。',
    projects: 275,
    verified: true,
    type: 'craftsman'
  }
];

const CASE_LIST_DATA = [...CASE_DATA]; // Original cases for CaseListPage

const SANDBOX_SCHEME_DATA = [
  {
    id: 's1',
    title: '89㎡三室两厅推演方案',
    author: '用户1289',
    avatar: 'https://i.pravatar.cc/150?u=u1289',
    image: 'https://picsum.photos/seed/sandbox1/400/500',
    likes: '1.2k',
    tags: ['动线优化', '空间极致利用'],
    type: 'sandbox'
  },
  {
    id: 's2',
    title: '现代简约风全屋推演',
    author: '装修小白进阶',
    avatar: 'https://i.pravatar.cc/150?u=u556',
    image: 'https://picsum.photos/seed/sandbox2/400/400',
    likes: '856',
    tags: ['全屋模拟', '预算控制'],
    type: 'sandbox'
  }
];

const REAL_RENOVATION_DATA = [
  {
    id: 'r1',
    title: '毕业啦！120㎡原木风，这就是我想要的家',
    author: '业主小李',
    avatar: 'https://i.pravatar.cc/150?u=u120',
    image: 'https://picsum.photos/seed/real1/800/600',
    likes: '3.5k',
    tags: ['真实人家', '原木风', '毕业照'],
    type: 'real',
    area: '120㎡',
    style: '原木风',
    cost: '25w',
    archiveNo: 'NO.20240301',
    projectName: '西溪诚园原木风改造项目',
    houseLocation: '杭州市西湖区文一西路',
    layout: '三室两厅两卫',
    duration: '120天',
    startDate: '2023-09-01',
    completionDate: '2023-12-30',
    costs: {
      decoration: '250,000',
      labor: '80,000',
      auxiliary: '40,000',
      main: '110,000',
      other: '20,000'
    },
    team: [
      { 
        role: '工长', name: '张建国', avatar: 'https://i.pravatar.cc/150?u=zhang', isVerified: true, digitalArchive: 'DA-2024-001',
        scores: { satisfaction: 99, cooperation: 98, professional: 99 },
        training: true, assessment: true,
        honors: ['2023年度金牌工长', '零投诉标兵'],
        wordCloud: ['责任心强', '经验丰富', '沟通顺畅', '手艺精湛']
      },
      { 
        role: '设计师', name: '李思思', avatar: 'https://i.pravatar.cc/150?u=li', isVerified: true, digitalArchive: 'DA-2024-002',
        scores: { satisfaction: 98, cooperation: 97, professional: 98 },
        training: true, assessment: true,
        honors: ['最佳创意奖', '年度人气设计师'],
        wordCloud: ['审美在线', '耐心细致', '空间规划合理']
      },
      { 
        role: '工人', name: '王大锤', avatar: 'https://i.pravatar.cc/150?u=wang', isVerified: true, digitalArchive: 'DA-2024-003',
        scores: { satisfaction: 97, cooperation: 99, professional: 96 },
        training: true, assessment: false,
        honors: ['优秀工匠'],
        wordCloud: ['干活利索', '吃苦耐劳', '细节到位']
      }
    ],
    goodDeeds: [
      {
        name: '王大锤',
        avatar: 'https://i.pravatar.cc/150?u=wang',
        title: '拾金不昧',
        details: '在拆除旧柜体时发现业主遗忘的贵重首饰，第一时间联系工长并归还业主，业主非常感动。'
      }
    ],
    completionPhotos: [
      'https://picsum.photos/seed/r1-c1/800/600',
      'https://picsum.photos/seed/r1-c2/800/600',
      'https://picsum.photos/seed/r1-c3/800/600'
    ],
    sitePhotos: [
      'https://picsum.photos/seed/r1-s1/800/600',
      'https://picsum.photos/seed/r1-s2/800/600'
    ],
    designChallenges: {
      difficulty: '原始户型采光不足，客厅显得压抑。且业主希望增加储物空间，但不想牺牲活动区域。',
      solution: '采用开放式厨房设计，并增加大面积落地窗，利用浅色系原木材质提升空间亮度。同时在走廊和卧室定制了隐形收纳柜，完美解决了储物需求。'
    },
    constructionChallenges: {
      difficulty: '老房墙体不平整，水电线路老化严重。且小区物业对施工时间要求极为严格。',
      solution: '全屋墙面重新找平，水电线路整体更换，并采用德系施工标准进行隐蔽工程验收。施工团队严格遵守物业规定，采用静音施工技术，确保不扰民。'
    }
  },
  {
    id: 'r2',
    title: '精装房微改，入住后的真实样子',
    author: '爱生活的喵',
    avatar: 'https://i.pravatar.cc/150?u=u88',
    image: 'https://picsum.photos/seed/real2/800/600',
    likes: '2.1k',
    tags: ['精装改造', '真实生活'],
    type: 'real',
    area: '95㎡',
    style: '现代简约',
    cost: '12w',
    archiveNo: 'NO.20240302',
    projectName: '万科西庐精装微改',
    houseLocation: '杭州市西湖区紫金港路',
    layout: '两室两厅一卫',
    duration: '45天',
    startDate: '2023-10-15',
    completionDate: '2023-11-30',
    costs: {
      decoration: '120,000',
      labor: '35,000',
      auxiliary: '15,000',
      main: '60,000',
      other: '10,000'
    },
    team: [
      { 
        role: '工长', name: '刘明', avatar: 'https://i.pravatar.cc/150?u=liu', isVerified: true, digitalArchive: 'DA-2024-004',
        scores: { satisfaction: 96, cooperation: 95, professional: 97 },
        training: true, assessment: true,
        honors: ['服务之星'],
        wordCloud: ['响应及时', '管理规范', '让人放心']
      },
      { 
        role: '设计师', name: '陈晨', avatar: 'https://i.pravatar.cc/150?u=chen', isVerified: true, digitalArchive: 'DA-2024-005',
        scores: { satisfaction: 98, cooperation: 98, professional: 96 },
        training: true, assessment: false,
        honors: ['新锐设计师'],
        wordCloud: ['懂生活', '色彩搭配好', '实用主义']
      },
      { 
        role: '工人', name: '赵师傅', avatar: 'https://i.pravatar.cc/150?u=zhao', isVerified: true, digitalArchive: 'DA-2024-006',
        scores: { satisfaction: 99, cooperation: 97, professional: 98 },
        training: true, assessment: true,
        honors: ['工艺标兵'],
        wordCloud: ['手艺好', '干活细致', '不留死角']
      }
    ],
    goodDeeds: [
      {
        name: '刘明',
        avatar: 'https://i.pravatar.cc/150?u=liu',
        title: '主动排雷',
        details: '在进场检查时，主动发现开发商遗留的隐蔽水管渗漏问题，避免了后期更大的损失。'
      }
    ],
    completionPhotos: [
      'https://picsum.photos/seed/r2-c1/800/600',
      'https://picsum.photos/seed/r2-c2/800/600'
    ],
    sitePhotos: [
      'https://picsum.photos/seed/r2-s1/800/600'
    ],
    designChallenges: {
      difficulty: '精装房原有风格过于沉闷，收纳空间不足。业主希望在不破坏原有硬装的情况下进行改造。',
      solution: '通过局部背景墙改造和全屋定制收纳柜，在不破坏原有硬装的基础上提升高级感。利用软装搭配，打破了原有的沉闷氛围。'
    },
    constructionChallenges: {
      difficulty: '成品保护要求极高，施工空间受限。且需要与原有精装管线进行对接。',
      solution: '采用全方位成品保护措施，严格控制施工噪音和粉尘，确保微改过程不影响邻里。施工前进行详细的管线探测，确保对接安全无误。'
    }
  },
  {
    id: 'r3',
    title: '80㎡极致收纳，三代同堂也不挤',
    author: '收纳达人阿强',
    avatar: 'https://i.pravatar.cc/150?u=u55',
    image: 'https://picsum.photos/seed/real3/800/600',
    likes: '1.8k',
    tags: ['小户型', '收纳控', '现代简约'],
    type: 'real',
    area: '80㎡',
    style: '现代',
    cost: '18w',
    archiveNo: 'NO.20240303',
    projectName: '保利东湾极致收纳项目',
    houseLocation: '杭州市钱塘区下沙街道',
    layout: '三室一厅一卫',
    duration: '90天',
    startDate: '2023-08-01',
    completionDate: '2023-10-30',
    costs: {
      decoration: '180,000',
      labor: '60,000',
      auxiliary: '30,000',
      main: '80,000',
      other: '10,000'
    },
    team: [
      { 
        role: '工长', name: '王志刚', avatar: 'https://i.pravatar.cc/150?u=wang', isVerified: true, digitalArchive: 'DA-2024-007',
        scores: { satisfaction: 98, cooperation: 99, professional: 98 },
        training: true, assessment: true,
        honors: ['年度优秀工长', '质量标兵'],
        wordCloud: ['认真负责', '进度把控好', '为人实在']
      },
      { 
        role: '设计师', name: '林青', avatar: 'https://i.pravatar.cc/150?u=lin', isVerified: true, digitalArchive: 'DA-2024-008',
        scores: { satisfaction: 97, cooperation: 96, professional: 99 },
        training: true, assessment: true,
        honors: ['收纳设计一等奖'],
        wordCloud: ['空间魔术师', '细节控', '懂收纳']
      },
      { 
        role: '工人', name: '孙师傅', avatar: 'https://i.pravatar.cc/150?u=sun', isVerified: true, digitalArchive: 'DA-2024-009',
        scores: { satisfaction: 96, cooperation: 98, professional: 97 },
        training: false, assessment: true,
        honors: ['木工能手'],
        wordCloud: ['手艺精湛', '干活麻利', '态度好']
      }
    ],
    goodDeeds: [
      {
        name: '孙师傅',
        avatar: 'https://i.pravatar.cc/150?u=sun',
        title: '义务维修',
        details: '在施工期间，顺手帮邻居修好了损坏的防盗门锁，获得了邻居的高度赞扬，维护了良好的施工环境。'
      }
    ],
    completionPhotos: [
      'https://picsum.photos/seed/r3-c1/800/600',
      'https://picsum.photos/seed/r3-c2/800/600'
    ],
    sitePhotos: [
      'https://picsum.photos/seed/r3-s1/800/600'
    ],
    designChallenges: {
      difficulty: '80平米需要容纳五口人居住，空间极度紧张。且需要满足不同年龄段的生活需求。',
      solution: '利用榻榻米和多功能组合柜，实现一房多用，并优化动线减少空间浪费。为老人设计了适老化设施，为孩子预留了活动空间。'
    },
    constructionChallenges: {
      difficulty: '定制家具数量庞大，安装精度要求高。现场空间狭小，材料堆放困难。',
      solution: '采用激光测距仪进行二次复核，现场木工精细收口，确保定制家具与墙体完美贴合。合理规划材料进场顺序，避免现场拥堵。'
    }
  },
  {
    id: 'r4',
    title: '复式阁楼改造，我的秘密花园',
    author: '文艺青年小周',
    avatar: 'https://i.pravatar.cc/150?u=u44',
    image: 'https://picsum.photos/seed/real4/800/600',
    likes: '4.2k',
    tags: ['阁楼改造', '复式', '北欧风'],
    type: 'real',
    area: '150㎡',
    style: '北欧风',
    cost: '40w',
    archiveNo: 'NO.20240304',
    projectName: '融创河滨之城阁楼改造',
    houseLocation: '杭州市西湖区余杭塘路',
    layout: '四室两厅三卫',
    duration: '150天',
    startDate: '2023-06-01',
    completionDate: '2023-10-30',
    costs: {
      decoration: '400,000',
      labor: '120,000',
      auxiliary: '60,000',
      main: '180,000',
      other: '40,000'
    },
    team: [
      { 
        role: '工长', name: '赵强', avatar: 'https://i.pravatar.cc/150?u=zhao', isVerified: true, digitalArchive: 'DA-2024-010',
        scores: { satisfaction: 99, cooperation: 97, professional: 98 },
        training: true, assessment: true,
        honors: ['安全生产标兵'],
        wordCloud: ['安全意识强', '管理严格', '让人安心']
      },
      { 
        role: '设计师', name: '周杰', avatar: 'https://i.pravatar.cc/150?u=zhou', isVerified: true, digitalArchive: 'DA-2024-011',
        scores: { satisfaction: 98, cooperation: 98, professional: 99 },
        training: true, assessment: true,
        honors: ['年度先锋设计奖'],
        wordCloud: ['创意十足', '品味高', '沟通顺畅']
      },
      { 
        role: '工人', name: '吴师傅', avatar: 'https://i.pravatar.cc/150?u=wu', isVerified: true, digitalArchive: 'DA-2024-012',
        scores: { satisfaction: 97, cooperation: 99, professional: 96 },
        training: true, assessment: false,
        honors: ['水电专家'],
        wordCloud: ['排线规整', '技术过硬', '干活踏实']
      }
    ],
    goodDeeds: [
      {
        name: '赵强',
        avatar: 'https://i.pravatar.cc/150?u=zhao',
        title: '深夜抢修',
        details: '遇到突发暴雨，半夜赶到工地检查防水情况，并及时处理了窗户渗水隐患，保护了现场材料。'
      }
    ],
    completionPhotos: [
      'https://picsum.photos/seed/r4-c1/800/600',
      'https://picsum.photos/seed/r4-c2/800/600'
    ],
    sitePhotos: [
      'https://picsum.photos/seed/r4-s1/800/600'
    ],
    designChallenges: {
      difficulty: '阁楼斜顶空间难以利用，且存在漏水隐患。楼梯位置不合理，影响一楼采光。',
      solution: '设计定制斜面储物柜，并重新做专业级防水层，安装智能天窗增加通风。重新规划楼梯位置，采用通透的玻璃扶手，改善采光。'
    },
    constructionChallenges: {
      difficulty: '高空作业及材料运输困难。阁楼结构复杂，施工难度大。',
      solution: '租用专业吊装设备，并制定严格的安全施工方案，确保材料安全进场。聘请经验丰富的木工师傅，解决复杂结构的施工难题。'
    }
  },
  {
    id: 'r5',
    title: '老房翻新，50㎡变身精致独居空间',
    author: '设计师Momo',
    avatar: 'https://i.pravatar.cc/150?u=u33',
    image: 'https://picsum.photos/seed/real5/800/600',
    likes: '2.9k',
    tags: ['老房翻新', '独居', '工业风'],
    type: 'real',
    area: '50㎡',
    style: '工业风',
    cost: '15w',
    archiveNo: 'NO.20240305',
    projectName: '朝晖五区老房翻新',
    houseLocation: '杭州市拱墅区朝晖路',
    layout: '一室一厅一卫',
    duration: '60天',
    startDate: '2023-11-01',
    completionDate: '2023-12-30',
    costs: {
      decoration: '150,000',
      labor: '50,000',
      auxiliary: '20,000',
      main: '70,000',
      other: '10,000'
    },
    team: [
      { 
        role: '工长', name: '张建国', avatar: 'https://i.pravatar.cc/150?u=zhang', isVerified: true, digitalArchive: 'DA-2024-001',
        scores: { satisfaction: 99, cooperation: 98, professional: 99 },
        training: true, assessment: true,
        honors: ['2023年度金牌工长', '零投诉标兵'],
        wordCloud: ['责任心强', '经验丰富', '沟通顺畅', '手艺精湛']
      },
      { 
        role: '设计师', name: 'Momo', avatar: 'https://i.pravatar.cc/150?u=momo', isVerified: true, digitalArchive: 'DA-2024-013',
        scores: { satisfaction: 97, cooperation: 96, professional: 98 },
        training: true, assessment: true,
        honors: ['最佳小户型设计奖'],
        wordCloud: ['懂年轻人', '设计感强', '很专业']
      },
      { 
        role: '工人', name: '郑师傅', avatar: 'https://i.pravatar.cc/150?u=zheng', isVerified: true, digitalArchive: 'DA-2024-014',
        scores: { satisfaction: 98, cooperation: 99, professional: 97 },
        training: false, assessment: true,
        honors: ['泥瓦匠人'],
        wordCloud: ['贴砖平整', '干活干净', '脾气好']
      }
    ],
    goodDeeds: [
      {
        name: '郑师傅',
        avatar: 'https://i.pravatar.cc/150?u=zheng',
        title: '热心助人',
        details: '在搬运材料时，看到同小区的老人提重物上楼，主动帮忙将物品送到老人家中。'
      }
    ],
    completionPhotos: [
      'https://picsum.photos/seed/r5-c1/800/600',
      'https://picsum.photos/seed/r5-c2/800/600'
    ],
    sitePhotos: [
      'https://picsum.photos/seed/r5-s1/800/600'
    ],
    designChallenges: {
      difficulty: '空间极小且墙体多为承重墙，无法大改。卫生间没有窗户，通风采光差。',
      solution: '采用工业风裸露管线设计，增加视觉层高，利用玻璃隔断划分区域。卫生间采用智能排风系统，并使用明亮的瓷砖提升亮度。'
    },
    constructionChallenges: {
      difficulty: '老旧小区施工时间受限，且楼道狭窄。水电改造难度大。',
      solution: '精准安排施工工序，采用静音工具，并安排专人负责楼道清理和邻里沟通。重新规划水电走向，确保安全可靠。'
    }
  }
];

const FOLLOWING_DATA = [
  {
    id: 'f1',
    title: '我关注的博主：140㎡法式复古风',
    author: '法式生活家',
    avatar: 'https://i.pravatar.cc/150?u=french',
    image: 'https://picsum.photos/seed/follow1/400/600',
    likes: '1.5k',
    type: 'case'
  },
  {
    id: 'f2',
    title: '关注博主：小户型推演方案',
    author: '空间魔术师',
    avatar: 'https://i.pravatar.cc/150?u=magic',
    image: 'https://picsum.photos/seed/follow2/400/400',
    likes: '920',
    type: 'sandbox'
  },
  {
    id: 'f3',
    name: '王师傅',
    title: '关注的良匠：高级瓦工',
    experience: '20年经验',
    rating: '5.0',
    tags: ['大理石铺贴', '工艺大师'],
    avatar: 'https://i.pravatar.cc/150?u=wang',
    image: 'https://picsum.photos/seed/follow3/400/300',
    type: 'craftsman'
  },
  {
    id: 'f4',
    title: '关注的业主：入住一年的真实反馈',
    author: '幸福小窝',
    avatar: 'https://i.pravatar.cc/150?u=happy',
    image: 'https://picsum.photos/seed/follow4/400/500',
    likes: '2.8k',
    type: 'real'
  }
];

// --- Components ---

const HOME_CAROUSEL_ITEMS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=90',
    title: '重塑大宅生命力',
    subtitle: '良造家：以良知工程定义资产级交付标准'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90',
    title: '隐蔽工程，数字化永存',
    subtitle: '108 项严苛物理验收 · 每一处隐蔽细节皆可溯源'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',
    title: '确定性，是最高级的奢侈',
    subtitle: '决策沙盘 AI 预演 · 让家装远离“不可控”风险'
  }
];

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const width = scrollRef.current.offsetWidth;
        const nextIndex = (currentIndex + 1) % HOME_CAROUSEL_ITEMS.length;
        scrollRef.current.scrollTo({
          left: nextIndex * width,
          behavior: 'smooth'
        });
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="bg-white px-4 pb-4">
      <div className="relative rounded-2xl overflow-hidden shadow-sm">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {HOME_CAROUSEL_ITEMS.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0 snap-center relative aspect-[21/9]">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg mb-0.5 drop-shadow-md">{item.title}</h3>
                <p className="text-white/90 text-xs drop-shadow-sm">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {HOME_CAROUSEL_ITEMS.map((_, idx) => (
            <div 
              key={idx} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TrustIndicators = ({ onLearnMore }: { onLearnMore: () => void }) => (
  <div className="bg-white px-4 pb-6">
    <div className="flex items-center justify-between px-2 mb-4">
      <h3 className="text-gray-900 font-bold text-sm tracking-tight text-center w-full relative">
        <span className="px-3 bg-white relative z-10">良知工程承诺</span>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </h3>
    </div>
    <div className="grid grid-cols-4 gap-4 px-2">
      {[
        { icon: Shield, title: '全维透明', subtitle: '预算即结算' },
        { icon: CreditCard, title: '成本+利润', subtitle: '明示平台佣金' },
        { icon: Fingerprint, title: '终身档案', subtitle: '工匠履约实录' },
        { icon: CheckCircle2, title: '数字化交付', subtitle: '全程闭环监控' }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center text-center gap-2 group cursor-pointer" onClick={onLearnMore}>
          <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border border-amber-100 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-200 transition-all duration-500">
            <item.icon className="w-5 h-5 text-amber-700/60" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-gray-900 text-[11px] font-bold tracking-tight">{item.title}</h4>
            <p className="text-gray-400 text-[9px] scale-90 origin-top">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-3">
      <button 
        onClick={onLearnMore}
        className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200/50 hover:bg-amber-100 transition-colors"
      >
        <span>了解更多大宅服务模式</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

const SearchHeader = ({ 
  city, 
  onCityClick, 
  onModeClick
}: { 
  city: string; 
  onCityClick: () => void; 
  onModeClick: () => void;
}) => (
  <>
    <div className="sticky top-0 z-[60] bg-white border-b border-gray-50 px-5">
      <div className="h-16 flex items-center justify-between">
        <button 
          onClick={onCityClick}
          className="flex items-center gap-1.5 text-gray-900 font-bold text-sm tracking-tight hover:bg-gray-50 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <MapPin className="w-4 h-4 text-amber-600" />
          <span>{city}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
        <h1 className="text-gray-900 font-serif font-black text-2xl tracking-tighter absolute left-1/2 -translate-x-1/2 mt-0.5">
          良造<span className="text-amber-500 italic">家</span>
        </h1>
        <div className="w-[40px]"></div>
      </div>
    </div>
    
    <div className="bg-white px-5 pt-4 pb-2 space-y-4">
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={onModeClick}
        className="group relative bg-[#FDFBF7] border border-amber-100/30 rounded-2xl p-3 cursor-pointer overflow-hidden transition-all duration-500 font-sans"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/20 blur-2xl rounded-full -translate-y-8 translate-x-8" />
        <div className="relative flex items-center gap-3.5">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-500 border border-amber-50 flex-shrink-0">
            <BookOpen className="w-4.5 h-4.5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-900 font-serif font-extrabold text-[13px] tracking-tight whitespace-nowrap">《良知工程白皮书》2024版</h3>
              <span className="text-amber-700 text-[7px] font-black tracking-widest uppercase opacity-40">Ready</span>
            </div>
            <p className="text-gray-400 text-[10px] font-medium tracking-tight truncate">曝光 16 类恶性增项陷阱 · 32 项交付标杆</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-amber-300 group-hover:text-amber-500 transition-colors" />
        </div>
      </motion.div>
    </div>
  </>
);

const PremiumModules = ({ onStudioClick, onDesignerClick, onForemanClick }: { onStudioClick?: () => void, onDesignerClick?: () => void, onForemanClick?: () => void }) => {
  return (
    <div className="px-4 py-4 space-y-3 bg-[#FDFBF7]">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <h2 className="text-[#2A1414] font-serif font-bold text-lg tracking-[0.15em]">大宅·豪宅专属</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-[#D4AF37]/40" />
            <span className="text-[#D4AF37] text-[9px] font-medium tracking-[0.3em] uppercase">Exclusive Residence</span>
          </div>
        </div>
        <div className="text-[#2A1414]/30 font-serif italic text-xl select-none opacity-20">Luxury</div>
      </div>

{/* Module 1 removed as per request */}
      <div className="grid grid-cols-2 gap-3">
        {/* Module 2: 严选高端设计师 */}
        <div 
          className="relative h-32 rounded-xl overflow-hidden shadow-sm group cursor-pointer"
          onClick={onDesignerClick}
        >
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
            alt="严选高端设计师"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col justify-end">
            <div className="w-3 h-[1px] bg-[#D4AF37] mb-1.5" />
            <h3 className="text-[#D4AF37] font-bold text-xs tracking-widest mb-0.5 font-serif">严选高端设计师</h3>
            <p className="text-[#D4AF37]/80 text-[8px] font-light tracking-widest">国际视野 顶层设计</p>
          </div>
        </div>

        {/* Module 3: 严选高端工长 */}
        <div 
          className="relative h-32 rounded-xl overflow-hidden shadow-sm group cursor-pointer"
          onClick={onForemanClick}
        >
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80" 
            alt="严选高端工长"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col justify-end">
            <div className="w-3 h-[1px] bg-[#D4AF37] mb-1.5" />
            <h3 className="text-[#D4AF37] font-bold text-xs tracking-widest mb-0.5 font-serif">严选高端工长</h3>
            <p className="text-[#D4AF37]/80 text-[8px] font-light tracking-widest">金牌工匠 极致交付</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GridMenu = ({ onItemClick }: { onItemClick: (id: string) => void }) => (
  <div className="px-4 py-2 bg-white">
    <div className="grid grid-cols-2 gap-3">
      {GRID_ITEMS.map((item) => (
        <motion.div
          key={item.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onItemClick(item.id)}
          className="relative overflow-hidden p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer bg-gradient-to-br from-white to-[#FAFAFA] border border-gray-100/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] group hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(212,175,55,0.08)] flex items-center justify-center shrink-0 text-[#C19A5B] border border-[#D4AF37]/10 group-hover:scale-105 transition-transform duration-300">
            <item.icon className="w-[18px] h-[18px] stroke-[2px]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[14px] font-bold text-[#1A1A1A] tracking-tight leading-tight">{item.label}</h4>
            <p className="text-[10px] text-[#888888] font-medium mt-0.5 truncate">{item.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ExclusiveServices = ({ onApply }: { onApply: () => void }) => (
  <div className="px-4 mt-2 mb-6">
    <div className="bg-gradient-to-br from-[#2A1414] to-[#1A0C0C] rounded-2xl p-5 shadow-lg border border-[#D4AF37]/20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl" />
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div>
          <h3 className="text-[#D4AF37] font-serif font-bold text-base tracking-widest mb-1">尊享定制通道</h3>
          <p className="text-[#D4AF37]/60 text-[10px] tracking-wider">为大宅业主提供全方位专业支持</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 relative z-10">
        <button 
          onClick={onApply}
          className="flex flex-col items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-[#D4AF37]/30 rounded-xl py-5 transition-colors active:scale-95"
        >
          <FileText className="w-6 h-6 text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs font-bold tracking-wide">获取专属大宅方案</span>
        </button>
        <button 
          onClick={onApply}
          className="flex flex-col items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-[#D4AF37]/30 rounded-xl py-5 transition-colors active:scale-95"
        >
          <ClipboardCheck className="w-6 h-6 text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs font-bold tracking-wide">申请项目诊断流程</span>
        </button>
      </div>
    </div>
  </div>
);

const RealRenovationListItem = (props: { item: typeof REAL_RENOVATION_DATA[0]; index: number; onClick?: () => void; key?: React.Key }) => {
  const { item, index, onClick } = props;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white mx-4 mb-4 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            实证案例
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="text-white/80 text-[10px] font-mono tracking-wider bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded">
            {item.archiveNo}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight mb-3 group-hover:text-[#07c160] transition-colors">
          {item.projectName}
        </h3>
        
        <div className="grid grid-cols-3 gap-2 mb-4 border-y border-gray-50 py-3">
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">面积</span>
            <span className="text-[11px] font-semibold text-gray-700">{item.area}</span>
          </div>
          <div className="flex flex-col border-x border-gray-50 px-2">
            <span className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">风格</span>
            <span className="text-[11px] font-semibold text-gray-700">{item.style}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">造价</span>
            <span className="text-[11px] font-semibold text-gray-700">{item.cost}</span>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#07c160] group-hover:text-white transition-all">
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CooperationListPage = (props: { onBack: () => void; key?: React.Key }) => {
  const { onBack } = props;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F8F9FA] pb-20"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-[16px] font-bold text-gray-900 tracking-tight">严选合作体系</h2>
          <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-medium">Verified Partner Network</span>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Shield className="w-4 h-4 text-[#07c160]" />
        </button>
      </div>

      {/* Hero Stats */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5D2E2E]/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#5D2E2E]/10 flex items-center justify-center">
                <Award className="w-4 h-4 text-[#5D2E2E]" />
              </div>
              <span className="text-[12px] font-bold text-[#5D2E2E] uppercase tracking-[0.4em] font-serif italic">良造家 · 严选标准</span>
            </div>
            <h3 className="text-[22px] font-bold text-gray-900 leading-tight mb-6">
              深度共建高端资源<br />定义交付新高度
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-gray-900">12</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider">核心工种</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-gray-900">100+</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider">资深匠人</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-gray-900">99.8%</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider">好评率</span>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {CRAFTSMAN_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group"
            >
              <div className="relative h-40">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#5D2E2E] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-white font-bold text-sm">{item.name}</h4>
                        {item.verified && <CheckCircle2 className="w-3 h-3 text-[#07c160]" />}
                      </div>
                      <p className="text-white/80 text-[10px]">{item.title}</p>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-[10px] font-bold">{item.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">从业</span>
                      <span className="text-[11px] font-bold text-gray-700">{item.experience}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">项目</span>
                      <span className="text-[11px] font-bold text-gray-700">{item.projects}个</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-full hover:bg-[#07c160] transition-colors">
                    查看数字档案
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const RealCaseListPage = (props: { onBack: () => void; onSelectCase: (item: typeof REAL_RENOVATION_DATA[0]) => void; key?: React.Key }) => {
  const { onBack, onSelectCase } = props;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F8F9FA] pb-20"
    >
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-[16px] font-bold text-gray-900 tracking-tight">实证案例</h2>
          <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-medium">Real Renovation Archive</span>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[20px] font-bold text-gray-900 leading-none mb-1">{REAL_RENOVATION_DATA.length}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">已收录案例</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-100" />
          <div className="flex flex-col items-center">
            <span className="text-[20px] font-bold text-gray-900 leading-none mb-1">100%</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">真实性校验</span>
          </div>
          <div className="h-8 w-[1px] bg-gray-100" />
          <div className="flex flex-col items-end">
            <span className="text-[20px] font-bold text-gray-900 leading-none mb-1">24h</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">档案更新</span>
          </div>
        </div>

        <div className="flex flex-col">
          {REAL_RENOVATION_DATA.map((item, idx) => (
            <RealRenovationListItem 
              key={item.id} 
              item={item} 
              index={idx}
              onClick={() => onSelectCase(item)} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const CaseListPage = (props: { onBack: () => void; onSelectCase: (item: typeof CASE_DATA[0]) => void; key?: React.Key }) => {
  const { onBack, onSelectCase } = props;
  // Split data into two columns for waterfall effect
  const leftCol = CASE_DATA.filter((_, i) => i % 2 === 0);
  const rightCol = CASE_DATA.filter((_, i) => i % 2 !== 0);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-center border-b border-gray-100 relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">装修档案</h2>
      </div>

      <div className="px-3 py-4 grid grid-cols-2 gap-3 items-start">
        <div className="flex flex-col gap-3">
          {leftCol.map((item) => (
            <CaseCard key={item.id} item={item} onClick={() => onSelectCase(item)} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {rightCol.map((item) => (
            <CaseCard key={item.id} item={item} onClick={() => onSelectCase(item)} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const CaseCard = (props: { item: typeof CASE_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  const { item, onClick } = props;
  return (
  <motion.div 
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
  >
    <div className={cn("relative w-full overflow-hidden", item.height)}>
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      {/* Content Type Indicator */}
      <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm p-1 rounded-md">
        {item.contentType === 'video' ? (
          <Play className="w-3 h-3 text-white fill-current" />
        ) : (
          <Layers className="w-3 h-3 text-white" />
        )}
      </div>
      {/* Hook Title Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
        <p className="text-white text-[11px] font-medium leading-tight drop-shadow-sm">
          {item.hookTitle}
        </p>
      </div>
    </div>
    <div className="p-2.5">
      <h3 className="text-[11px] font-normal text-gray-600 line-clamp-2 mb-2 leading-snug">
        {item.title}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 min-w-0">
          <img src={item.avatar} alt={item.author} className="w-4 h-4 rounded-full flex-shrink-0" />
          <span className="text-[9px] text-gray-400 truncate">{item.author}</span>
        </div>
        <div className="flex items-center gap-0.5 text-gray-400">
          <Heart className="w-2.5 h-2.5" />
          <span className="text-[9px]">{item.likes}</span>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

const CraftsmanCard = (props: { item: typeof CRAFTSMAN_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  const { item, onClick } = props;
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer mb-3"
    >
      <div className="relative h-32 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="bg-[#5D2E2E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            严选合作体系
          </span>
          <span className="bg-white/90 text-[#5D2E2E] text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {item.tag}
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full border border-gray-100" />
          <div>
            <h3 className="text-xs font-bold text-gray-900">{item.name}</h3>
            <p className="text-[9px] text-gray-400">{item.title} · {item.experience}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="text-[8px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded-md border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 text-orange-400" />
            <span className="text-[10px] font-bold text-orange-400">{item.rating}</span>
          </div>
          <button className="text-[9px] font-bold text-[#07c160] hover:underline">查看详情</button>
        </div>
      </div>
    </motion.div>
  );
};

const SandboxSchemeCard = (props: { item: typeof SANDBOX_SCHEME_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  const { item, onClick } = props;
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer mb-3"
    >
      <div className="relative h-[182px] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-purple-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            决策沙盘系统
          </span>
        </div>
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
            <Box className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-[11px] font-bold text-gray-800 line-clamp-2 mb-2">{item.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <img src={item.avatar} alt={item.author} className="w-4 h-4 rounded-full flex-shrink-0" />
            <span className="text-[9px] text-gray-400 truncate">{item.author}</span>
          </div>
          <div className="flex items-center gap-0.5 text-gray-400">
            <Heart className="w-2.5 h-2.5" />
            <span className="text-[9px]">{item.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RealRenovationCard = (props: { item: typeof REAL_RENOVATION_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  const { item, onClick } = props;
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer mb-3"
    >
      <div className="relative h-[182px] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            实证案例
          </span>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
          <span className="text-white text-[8px]">业主直发</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-[11px] font-bold text-gray-800 line-clamp-2 mb-2 leading-tight">{item.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <img src={item.avatar} alt={item.author} className="w-4 h-4 rounded-full flex-shrink-0" />
            <span className="text-[9px] text-gray-400 truncate">{item.author}</span>
          </div>
          <div className="flex items-center gap-0.5 text-gray-400">
            <Heart className="w-2.5 h-2.5" />
            <span className="text-[9px]">{item.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ListSection = (props: { 
  onSelectCase: (item: any) => void; 
  onSearchClick: () => void;
}) => {
  const { onSelectCase, onSearchClick } = props;
  
  // Mix cases for Discovery section (showing only image-text content, no tags)
  const discoveryData = [
    ...CASE_DATA.map(c => ({ ...c, type: 'case' }))
  ].sort(() => Math.random() - 0.5); // Shuffle for a dynamic feel

  const leftCol = discoveryData.filter((_, i) => i % 2 === 0);
  const rightCol = discoveryData.filter((_, i) => i % 2 !== 0);

  return (
    <div className="px-3 mt-4">
      {/* Tabs Bar - Sticky below Title Bar when scrolling */}
      <div className="sticky top-[54px] z-[50] bg-gray-50 flex items-center justify-between border-b border-gray-200/50 -mx-3 px-4 h-[48px] mb-2">
        <div className="flex items-center gap-8 h-full">
          <button 
            className="h-full flex items-center text-[15px] font-bold transition-all relative px-1 text-gray-900"
          >
            大宅发现
            <motion.div 
              layoutId="activeTab" 
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#D4AF37] rounded-t-full" 
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 items-start pb-6">
        <div className="flex flex-col">
          {leftCol.map((item) => {
            if (item.type === 'craftsman') return <CraftsmanCard key={item.id} item={item as any} />;
            if (item.type === 'sandbox') return <SandboxSchemeCard key={item.id} item={item as any} />;
            if (item.type === 'real') return <RealRenovationCard key={item.id} item={item as any} onClick={() => onSelectCase(item)} />;
            return (
              <div key={item.id} className="mb-3">
                <CaseCard item={item as any} onClick={() => onSelectCase(item)} />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">
          {rightCol.map((item) => {
            if (item.type === 'craftsman') return <CraftsmanCard key={item.id} item={item as any} />;
            if (item.type === 'sandbox') return <SandboxSchemeCard key={item.id} item={item as any} />;
            if (item.type === 'real') return <RealRenovationCard key={item.id} item={item as any} onClick={() => onSelectCase(item)} />;
            return (
              <div key={item.id} className="mb-3">
                <CaseCard item={item as any} onClick={() => onSelectCase(item)} />
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
        <div className="w-5 h-5 border-2 border-gray-200 border-t-[#07c160] rounded-full animate-spin" />
        <span className="text-xs">努力加载中</span>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, onTabChange, onPublishClick }: { activeTab: string; onTabChange: (tab: string) => void; onPublishClick: () => void }) => {
  const leftTabs = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'my-home', label: '我的家', icon: Building2 },
  ];
  const rightTabs = [
    { id: 'messages', label: '消息', icon: MessageSquare },
    { id: 'profile', label: '我的', icon: User },
  ];

  const TabButton = ({ tab }: { tab: { id: string; label: string; icon: any }; key?: any }) => (
    <button
      key={tab.id}
      onClick={() => onTabChange(tab.id)}
      className="flex flex-col items-center gap-1 py-1 min-w-[50px] relative group"
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        className={cn(
          "p-1 rounded-xl transition-colors",
          activeTab === tab.id ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-600"
        )}
      >
        <tab.icon className="w-6 h-6" />
      </motion.div>
      <span className={cn(
        "text-[10px] font-bold transition-colors",
        activeTab === tab.id ? "text-zinc-900" : "text-zinc-400"
      )}>
        {tab.label}
      </span>
      {activeTab === tab.id && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -bottom-1 w-1 h-1 bg-zinc-900 rounded-full"
        />
      )}
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-gray-100/50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]" />
      
      <div className="relative px-4 py-2 pb-safe flex items-center justify-around max-w-md mx-auto">
        {[...leftTabs, ...rightTabs].map(tab => <TabButton key={tab.id} tab={tab} />)}
      </div>
    </div>
  );
};

const MyHomePage = () => {
  const [isBound, setIsBound] = useState(false);
  const [formData, setFormData] = useState({
    region: '北京市朝阳区',
    community: '阳光壹号院',
    area: '120㎡',
    style: '现代简约'
  });

  // Mock data for the dashboard
  const dashboardData = {
    overallProgress: 35,
    funds: {
      total: 250000,
      paid: 125000,
      labor: 40, // percentage
      materials: 60 // percentage
    },
    currentPhase: {
      name: '水电工程',
      taskCompletion: 65,
      executor: '张师傅 (金牌水电工)',
      inspector: '李工 (资深监理)',
      startDate: '2024-03-01',
      estimatedEndDate: '2024-03-15'
    }
  };

  const handleBind = () => {
    if (formData.region && formData.community) {
      setIsBound(true);
    }
  };

  if (!isBound) {
    return (
      <div className="min-h-screen bg-gray-50 pt-12 px-4 pb-24">
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
              <Home className="w-8 h-8 text-[#07c160]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">绑定我的家</h2>
            <p className="text-xs text-gray-400 mt-2">输入房屋信息，开启您的专属家装档案</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">省市区</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="例如：北京市朝阳区"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#07c160]/20 transition-all"
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">小区名称</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="请输入您的小区名称"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-11 pr-4 text-sm focus:ring-2 focus:ring-[#07c160]/20 transition-all"
                  value={formData.community}
                  onChange={(e) => setFormData({...formData, community: e.target.value})}
                />
              </div>
            </div>

            <button 
              onClick={handleBind}
              disabled={!formData.region || !formData.community}
              className="w-full mt-4 py-4 bg-[#07c160] disabled:bg-gray-200 text-white rounded-2xl font-bold shadow-lg shadow-[#07c160]/20 active:scale-[0.98] transition-all"
            >
              立即绑定
            </button>
          </div>
        </div>

        {/* Preview of features */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-3xl border border-gray-100 opacity-50">
            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center mb-2">
              <Box className="w-4 h-4 text-blue-500" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 truncate">决策沙盘系统</h3>
            <p className="text-[9px] text-gray-400 mt-0.5 truncate">模拟真实装修过程</p>
          </div>
          <div className="bg-white p-3 rounded-3xl border border-gray-100 opacity-50">
            <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center mb-2">
              <FileText className="w-4 h-4 text-purple-500" />
            </div>
            <h3 className="text-xs font-bold text-gray-900 truncate">我的家数字档案</h3>
            <p className="text-[9px] text-gray-400 mt-0.5 truncate">记录房屋全周期信息</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6 px-4 pb-24 space-y-6">
      {/* 1. Home Details Header */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
            <Home className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900 truncate">{formData.community}</h2>
              <span className="px-2 py-0.5 bg-emerald-50 text-[#07c160] text-[10px] font-bold rounded-md">施工中</span>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> {formData.region}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{formData.area}</span>
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{formData.style}</span>
            </div>
          </div>
          <button onClick={() => setIsBound(false)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Renovation Dashboard */}
      <div className="grid grid-cols-1 gap-4">
        {/* Progress & Funds Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Overall Progress */}
          <div className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="relative w-20 h-20 mb-3">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={226} strokeDashoffset={226 - (226 * dashboardData.overallProgress) / 100} className="text-[#07c160]" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">{dashboardData.overallProgress}%</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">总体装修进度</span>
          </div>

          {/* Payment Progress */}
          <div className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">付款进度</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-gray-900">50%</span>
                <span className="text-[9px] text-gray-400">¥12.5w / ¥25w</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Fund Allocation (Labor vs Materials) */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                <PieChart className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">资金占比</span>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] text-gray-500">人工 {dashboardData.funds.labor}%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-[10px] text-gray-500">材料 {dashboardData.funds.materials}%</span>
              </div>
            </div>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-500" style={{ width: `${dashboardData.funds.labor}%` }} />
            <div className="h-full bg-indigo-400" style={{ width: `${dashboardData.funds.materials}%` }} />
          </div>
        </div>

        {/* Current Phase & Task Completion */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-900">当前阶段：{dashboardData.currentPhase.name}</h3>
                <p className="text-[10px] text-gray-400">预计结束：{dashboardData.currentPhase.estimatedEndDate}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-purple-600">{dashboardData.currentPhase.taskCompletion}%</span>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">阶段完成度</p>
            </div>
          </div>

          <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${dashboardData.currentPhase.taskCompletion}%` }} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                <img src="https://i.pravatar.cc/150?u=zhang" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider">执行人</p>
                <p className="text-[11px] font-bold text-gray-900">{dashboardData.currentPhase.executor.split(' ')[0]}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                <img src="https://i.pravatar.cc/150?u=li" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider">验收人</p>
                <p className="text-[11px] font-bold text-gray-900">{dashboardData.currentPhase.inspector.split(' ')[0]}</p>
              </div>
            </div>
          </div>

          {/* Task List for Current Phase */}
          <div className="space-y-3 mt-6 pt-6 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">阶段任务清单</span>
              <span className="text-[10px] text-gray-500">4/6 已完成</span>
            </div>
            {[
              { name: '水路改造', status: 'completed' },
              { name: '电路布线', status: 'completed' },
              { name: '开关插座定位', status: 'completed' },
              { name: '防水处理', status: 'completed' },
              { name: '闭水试验', status: 'pending' },
              { name: '水电验收', status: 'pending' },
            ].map((task, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100/50">
                <div className="flex items-center gap-2">
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#07c160]" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                  )}
                  <span className={cn("text-xs font-medium", task.status === 'completed' ? "text-gray-900" : "text-gray-400")}>{task.name}</span>
                </div>
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold", 
                  task.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"
                )}>
                  {task.status === 'completed' ? '已完成' : '进行中'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Sand Table Simulation (Existing) */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Box className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-gray-900">决策沙盘系统</h3>
              <p className="text-[10px] text-gray-400">了解真实的装修过程</p>
            </div>
          </div>
          <button className="text-[10px] font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">开始模拟</button>
        </div>
        
        <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-50">
          {[
            { step: '前期准备', desc: '量房、设计、预算确认', status: 'completed' },
            { step: '拆改施工', desc: '墙体拆除、铲墙皮', status: 'current' },
            { step: '水电工程', desc: '水路改造、电路布线', status: 'pending' },
            { step: '泥木工程', desc: '瓦工铺贴、木工吊顶', status: 'pending' },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className={cn(
                "absolute -left-8 top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center z-10",
                item.status === 'completed' ? "bg-blue-500" : 
                item.status === 'current' ? "bg-blue-200 animate-pulse" : "bg-gray-100"
              )}>
                {item.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>
              <h4 className={cn("text-sm font-bold", item.status === 'pending' ? "text-gray-400" : "text-gray-900")}>{item.step}</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Home Archives (Existing) */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-gray-900">我的家数字档案</h3>
            <p className="text-[10px] text-gray-400">记录房屋全周期信息</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Home, label: '房屋信息', color: 'bg-orange-50', iconColor: 'text-orange-500' },
            { icon: LayoutGrid, label: '图纸信息', color: 'bg-indigo-50', iconColor: 'text-indigo-500' },
            { icon: Layers, label: '管线信息', color: 'bg-cyan-50', iconColor: 'text-cyan-500' },
            { icon: ClipboardCheck, label: '施工信息', color: 'bg-emerald-50', iconColor: 'text-emerald-500' },
            { icon: Users, label: '从业者信息', color: 'bg-rose-50', iconColor: 'text-rose-500' },
            { icon: Award, label: '维保服务', color: 'bg-blue-50', iconColor: 'text-blue-500' },
            { icon: MessageSquare, label: '管家服务', color: 'bg-gray-50', iconColor: 'text-gray-500' },
          ].map((archive, idx) => (
            <div key={idx} className="p-3 rounded-3xl border border-gray-50 active:scale-95 transition-transform cursor-pointer flex items-center gap-2">
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", archive.color)}>
                <archive.icon className={cn("w-4 h-4", archive.iconColor)} />
              </div>
              <span className="text-[11px] font-bold text-gray-700 truncate">{archive.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SettingsPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between px-4 h-14 relative">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-50 active:scale-95 transition-all absolute left-4 z-10 text-gray-800">
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">数字身份设置</h1>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6">
        <div>
          <h2 className="text-[14px] font-bold text-gray-900 mb-3 px-1">基本信息</h2>
          <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-2">
            <div className="flex items-center justify-between px-3 py-4 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50 transition-colors">
              <span className="text-[15px] text-gray-800">头像</span>
              <div className="flex items-center gap-2">
                <img src="https://i.pravatar.cc/150?u=shenziyi" className="w-9 h-9 rounded-full object-cover" />
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-4 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50 transition-colors">
              <span className="text-[15px] text-gray-800">昵称</span>
              <div className="flex items-center gap-2">
                <span className="text-[15px] text-gray-400">沈子怡</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-4 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50 transition-colors">
              <span className="text-[15px] text-gray-800">姓名</span>
              <div className="flex items-center gap-2">
                <span className="text-[15px] text-gray-400">沈*怡</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-4 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50 transition-colors">
              <span className="text-[15px] text-gray-800">所在地区</span>
              <div className="flex items-center gap-2">
                <span className="text-[15px] text-gray-400">中国区</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[14px] font-bold text-gray-900 mb-3 px-1">当前账号</h2>
          <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-2">
            <div className="flex items-center justify-between px-3 py-4 cursor-pointer active:bg-gray-50 transition-colors">
              <span className="text-[15px] text-gray-800">注册手机号</span>
              <div className="flex items-center gap-2">
                <span className="text-[15px] text-gray-400">138****8888</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ onMenuClick }: { onMenuClick: (label: string) => void }) => {
  const [showStatsModal, setShowStatsModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Top Background & Header - Apple Glassmorphism Style */}
      <div className="bg-gradient-to-br from-slate-100 via-white to-slate-50 pb-8 rounded-b-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden border-b border-gray-100">
         {/* Decorative Background Elements - Soft Apple Style */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
         <div className="absolute top-10 left-0 w-[300px] h-[300px] bg-indigo-100/40 rounded-full blur-[60px] -ml-10 pointer-events-none" />
         
         <div className="px-5 pt-10 relative z-10">
            {/* Header Row: Title */}
            <div className="flex items-center justify-between mb-5 relative z-10">
               <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/60 backdrop-blur-md flex items-center justify-center border border-white/80 shadow-sm">
                    <Fingerprint className="w-4 h-4 text-slate-700" />
                  </div>
                  <span className="text-[15px] font-bold tracking-wide text-slate-900">数字身份</span>
               </div>
               <button onClick={() => onMenuClick('设置')} className="w-8 h-8 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-[10px] border border-white/80 shadow-sm active:scale-95 transition-all text-slate-600 hover:text-slate-900">
                  <Settings className="w-[18px] h-[18px]" strokeWidth={2} />
               </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-2 relative z-10">
               <div className="relative group shrink-0">
                  <div className="w-[72px] h-[72px] rounded-[22px] overflow-hidden border-[2.5px] border-white shadow-sm bg-white relative">
                     <img src="https://i.pravatar.cc/150?u=shenziyi" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
               </div>
               <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h2 className="text-[20px] font-black text-[#0F172A] tracking-wide">
                     沈子怡
                  </h2>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-[6px]">
                      <MapPin className="w-3 h-3 text-indigo-500" strokeWidth={2.5} />
                      <span className="text-[11px] font-bold text-gray-700 tracking-tight">中国区</span>
                    </div>
                  </div>
               </div>
            </div>


         </div>
      </div>

      <div className="px-4 -mt-6 relative z-20 space-y-4">
         {/* Private Home Archives Module */}
         <div className="bg-white rounded-[24px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <div 
               className="flex items-center justify-between group cursor-pointer mb-5"
               onClick={() => onMenuClick('私宅档案')}
            >
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[14px] bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                     <FileText className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">我的家数字档案</h3>
                     <p className="text-[11px] text-gray-400 mt-0.5 tracking-tight flex items-center gap-1">
                       <Shield className="w-3 h-3 text-emerald-500" />
                       记录房屋全周期信息
                     </p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-4 gap-y-5">
               {[
                  { icon: Home, label: '房屋', color: 'text-orange-500', bg: 'bg-orange-50' },
                  { icon: LayoutGrid, label: '图纸', color: 'text-indigo-500', bg: 'bg-indigo-50' },
                  { icon: Layers, label: '管线', color: 'text-cyan-500', bg: 'bg-cyan-50' },
                  { icon: ClipboardCheck, label: '施工', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { icon: Users, label: '从业者', color: 'text-rose-500', bg: 'bg-rose-50' },
                  { icon: Award, label: '维保', color: 'text-blue-500', bg: 'bg-blue-50' },
                  { icon: MessageSquare, label: '管家', color: 'text-gray-500', bg: 'bg-gray-50' }
               ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 cursor-pointer hover:opacity-80 active:scale-95 transition-all" onClick={() => onMenuClick('私宅档案')}>
                     <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", item.bg, item.color)}>
                        <item.icon className="w-5 h-5" strokeWidth={2.5} />
                     </div>
                     <span className="text-[11px] text-gray-600 font-medium tracking-tight">{item.label}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Footprints Grid */}
         <div className="bg-white rounded-[24px] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4 px-1">足迹</h3>
            <div className="grid grid-cols-3 gap-y-4">
               {[
                  { icon: Heart, label: '我的收藏', color: 'text-pink-500', bg: 'bg-pink-50' },
                  { icon: Clock, label: '浏览历史', color: 'text-indigo-500', bg: 'bg-indigo-50' },
               ].map((item, idx) => (
                  <button key={idx} onClick={() => onMenuClick(item.label)} className="flex flex-col items-center gap-2 group active:scale-95 transition-transform">
                     <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-1", item.bg)}>
                        <item.icon className={cn("w-5 h-5", item.color)} />
                     </div>
                     <span className="text-xs font-medium text-gray-700">{item.label}</span>
                  </button>
               ))}
            </div>
         </div>

         {/* Settings / Other List */}
         <div className="bg-white rounded-[24px] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
            {[
               { icon: Settings, label: '其他', color: 'text-gray-700', bg: 'bg-gray-50' },
               { icon: LogOut, label: '退出登录', color: 'text-gray-500', bg: 'bg-gray-50' }
            ].map((item, idx) => (
               <button key={idx} onClick={() => onMenuClick(item.label)} className="w-full p-3 flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", item.bg)}>
                        <item.icon className={cn("w-4 h-4", item.color)} />
                     </div>
                     <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
               </button>
            ))}
         </div>
      </div>

      {/* Stats Modal */}
      <AnimatePresence>
        {showStatsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setShowStatsModal(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[40px] p-8 relative z-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400" />
              
              <h3 className="text-xl font-bold text-gray-900 mb-8 text-center pt-2">获赞与收藏</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-5 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <BookOpen className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="text-gray-700 font-bold">发布笔记数</span>
                  </div>
                  <span className="text-xl font-black text-gray-900">42</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-orange-50 rounded-3xl border border-orange-100/50 text-center">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm mx-auto mb-3">
                      <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
                    </div>
                    <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider mb-1">获得点赞</p>
                    <p className="text-2xl font-black text-orange-600">8.2k</p>
                  </div>
                  <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100/50 text-center">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm mx-auto mb-3">
                      <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                    </div>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">获得收藏</p>
                    <p className="text-2xl font-black text-blue-600">6.8k</p>
                  </div>
                </div>

                <div className="bg-gray-50/50 p-4 rounded-2xl">
                  <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                    统计包含：私宅装修档案、决策沙盘系统、实证项目案例等全站发布内容
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setShowStatsModal(false)}
                className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-bold active:scale-95 transition-transform shadow-lg shadow-gray-900/20"
              >
                我知道了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MyCasesPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col p-4 relative font-sans">
      <div className="absolute top-4 left-4 z-50">
        <button onClick={onBack} className="p-2 bg-white shadow-sm hover:bg-gray-50 rounded-full transition-colors border border-gray-100">
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mt-12 pb-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
            <FileText className="w-7 h-7 text-purple-600" />
          </div>
          <div>
            <h1 className="text-[20px] font-black text-gray-900 tracking-tight">我的家数字档案</h1>
            <p className="text-[12px] text-gray-400 mt-0.5 font-medium tracking-tight">记录房屋全周期信息</p>
          </div>
        </div>

        {/* Grid Menu */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Home, label: '房屋信息', color: 'text-orange-500', bg: 'bg-orange-50/50' },
            { icon: LayoutGrid, label: '图纸信息', color: 'text-indigo-500', bg: 'bg-indigo-50/50' },
            { icon: Layers, label: '管线信息', color: 'text-cyan-500', bg: 'bg-cyan-50/50' },
            { icon: ClipboardCheck, label: '施工信息', color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
            { icon: Users, label: '从业者信息', color: 'text-rose-500', bg: 'bg-rose-50/50' },
            { icon: Award, label: '维保服务', color: 'text-blue-500', bg: 'bg-blue-50/50' },
            { icon: MessageSquare, label: '管家服务', color: 'text-gray-500', bg: 'bg-gray-50/50' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 py-3 px-4 bg-white border border-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-[20px] active:scale-95 transition-transform cursor-pointer hover:shadow-md"
            >
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0", item.bg, item.color)}>
                <item.icon className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </div>
              <span className="text-[13px] font-bold text-gray-800 tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PublishModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<'choice' | 'form'>('choice');
  const [type, setType] = useState<'graphic' | 'video' | 'requirement' | 'practitioner' | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [houseType, setHouseType] = useState<'平层' | '别墅'>('平层');
  const [renovationType, setRenovationType] = useState<'二手房改新' | '毛坯房'>('毛坯房');
  const [area, setArea] = useState('');
  const [isAIWriting, setIsAIWriting] = useState(false);
  const [isFullScreenDescription, setIsFullScreenDescription] = useState(false);
  const [syncToArchive, setSyncToArchive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('choice');
      setType(null);
      setImages([]);
      setTags([]);
      setTagInput('');
      setTitle('');
      setDescription('');
      setCommunityName('');
      setHouseType('平层');
      setRenovationType('毛坯房');
      setArea('');
      setIsAIWriting(false);
      setIsFullScreenDescription(false);
      setSyncToArchive(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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

  const handleChoice = (t: 'graphic' | 'video' | 'requirement' | 'practitioner') => {
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
        <div className="fixed inset-0 z-[200] flex flex-col bg-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white"
          />
          
          <div className="relative h-full flex flex-col min-h-0">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50 bg-white sticky top-0 z-10">
              <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-800" />
              </button>
              <h2 className="text-lg font-bold text-gray-900">
                {step === 'choice' ? '我的需求' : (
                  type === 'graphic' ? '图文档案' : 
                  type === 'video' ? '项目影像档案' : 
                  type === 'requirement' ? '我的需求' : 
                  '邀请专业团队'
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

            <div className="flex-1 overflow-y-auto p-6 pb-32 min-h-0">
              {step === 'choice' ? (
                <div className="space-y-8 pt-4">
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

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleChoice('practitioner')}
                      className="w-full bg-purple-50/50 p-6 rounded-2xl flex items-center justify-between group border border-purple-100/50 mt-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                          <Users className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-base font-bold text-purple-900">邀请专业团队</h3>
                          <p className="text-purple-600/60 text-xs mt-0.5">良造家专家组/良知工匠入驻协作体系</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {type === 'requirement' ? (
                    <div className="space-y-8 pb-10">
                      {/* Section 1: Property Information */}
                      <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-4 bg-[#07c160] rounded-full" />
                          <h3 className="text-sm font-bold text-gray-900">基础信息</h3>
                        </div>
                        
                        <div className="bg-gray-50/50 rounded-2xl p-4 space-y-4 border border-gray-100">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5" />
                              小区名称
                            </label>
                            <input 
                              type="text" 
                              value={communityName}
                              onChange={(e) => setCommunityName(e.target.value)}
                              placeholder="请输入小区名称" 
                              className="w-full bg-white rounded-xl p-3 text-sm focus:outline-none border border-gray-100 focus:border-[#07c160]/30 transition-all shadow-sm" 
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                                <Maximize2 className="w-3.5 h-3.5" />
                                房屋面积 (m²)
                              </label>
                              <input 
                                type="number" 
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                placeholder="请输入" 
                                className="w-full bg-white rounded-xl p-3 text-sm focus:outline-none border border-gray-100 focus:border-[#07c160]/30 transition-all shadow-sm" 
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                                <Coins className="w-3.5 h-3.5" />
                                装修预算 (万)
                              </label>
                              <input 
                                type="number" 
                                placeholder="请输入" 
                                className="w-full bg-white rounded-xl p-3 text-sm focus:outline-none border border-gray-100 focus:border-[#07c160]/30 transition-all shadow-sm" 
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-400">户型结构</label>
                              <div className="flex p-1 bg-white rounded-xl border border-gray-100 shadow-sm">
                                {(['平层', '别墅'] as const).map(t => (
                                  <button
                                    key={t}
                                    onClick={() => setHouseType(t)}
                                    className={cn(
                                      "flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all",
                                      houseType === t ? "bg-[#07c160] text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
                                    )}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-400">房屋状态</label>
                              <div className="flex p-1 bg-white rounded-xl border border-gray-100 shadow-sm">
                                {(['二手房改新', '毛坯房'] as const).map(t => (
                                  <button
                                    key={t}
                                    onClick={() => setRenovationType(t)}
                                    className={cn(
                                      "flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all",
                                      renovationType === t ? "bg-[#07c160] text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
                                    )}
                                  >
                                    {t === '二手房改新' ? '旧房' : '毛坯'}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Section 2: Visuals */}
                      <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-4 bg-[#07c160] rounded-full" />
                          <h3 className="text-sm font-bold text-gray-900">视觉参考</h3>
                        </div>

                        <div className="bg-gray-50/50 rounded-2xl p-4 space-y-4 border border-gray-100">
                          <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                              <Camera className="w-3.5 h-3.5" />
                              现场照片/视频 (选填)
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              <AnimatePresence>
                                {images.map((img, index) => (
                                  <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100"
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
                                  className="aspect-square bg-white rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-1 text-gray-300 cursor-pointer hover:border-[#07c160]/30 hover:text-[#07c160] transition-all"
                                >
                                  <Plus className="w-5 h-5" />
                                  <span className="text-[9px] font-bold">{images.length}/9</span>
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                              <Map className="w-3.5 h-3.5" />
                              户型图 (选填)
                            </label>
                            <div className="p-4 bg-white rounded-xl border border-dashed border-gray-100 flex items-center justify-center gap-3 text-gray-400 cursor-pointer hover:border-[#07c160]/30 hover:text-[#07c160] transition-all shadow-sm">
                              <Upload className="w-5 h-5" />
                              <span className="text-xs font-medium">点击上传或拍照</span>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Section 3: Requirement Details */}
                      <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-4 bg-[#07c160] rounded-full" />
                          <h3 className="text-sm font-bold text-gray-900">需求详情</h3>
                        </div>

                        <div className="bg-gray-50/50 rounded-2xl p-4 space-y-4 border border-gray-100">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400">需求标题</label>
                            <input 
                              type="text" 
                              placeholder="如：三室两厅现代简约精装" 
                              className="w-full bg-white rounded-xl p-3 text-sm font-bold focus:outline-none border border-gray-100 focus:border-[#07c160]/30 transition-all shadow-sm"
                            />
                          </div>

                          <div className={cn(
                            "space-y-3 transition-all duration-300",
                            isFullScreenDescription ? "fixed inset-0 z-[210] bg-white p-6 flex flex-col" : "relative"
                          )}>
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-bold text-gray-400">详细描述</label>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={handleAIWrite}
                                  disabled={isAIWriting}
                                  className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold rounded-full shadow-sm active:scale-95 transition-all disabled:opacity-50"
                                >
                                  <Sparkles className={cn("w-3 h-3", isAIWriting && "animate-pulse")} />
                                  {isAIWriting ? 'AI生成中...' : 'AI帮写'}
                                </button>
                                <button 
                                  onClick={() => setIsFullScreenDescription(!isFullScreenDescription)}
                                  className="p-1 text-gray-300 hover:bg-gray-100 rounded-lg transition-colors"
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
                                "w-full bg-white rounded-xl p-4 text-sm focus:outline-none border border-gray-100 focus:border-[#07c160]/30 transition-all resize-none shadow-sm",
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
                        </div>
                      </section>

                      {/* Section 4: Contact */}
                      <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-4 bg-[#07c160] rounded-full" />
                          <h3 className="text-sm font-bold text-gray-900">联系方式</h3>
                        </div>
                        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5" />
                              联系电话
                            </label>
                            <input 
                              type="tel" 
                              placeholder="方便顾问专家与您取得联系" 
                              className="w-full bg-white rounded-xl p-3 text-sm focus:outline-none border border-gray-100 focus:border-[#07c160]/30 transition-all shadow-sm" 
                            />
                          </div>
                        </div>
                      </section>
                    </div>
                  ) : type === 'practitioner' ? (
                    <div className="space-y-8 pb-10">
                      <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-4 bg-purple-500 rounded-full" />
                          <h3 className="text-sm font-bold text-gray-900">邀请专业团队</h3>
                        </div>
                        <div className="bg-gray-50/50 rounded-2xl p-4 space-y-4 border border-gray-100">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400">我想找</label>
                            <div className="grid grid-cols-3 gap-2">
                              {['高端工作室', '高端设计师', '高端工长'].map(role => (
                                <button
                                  key={role}
                                  className="py-2 text-[11px] font-bold rounded-xl border border-gray-100 bg-white text-gray-500 hover:border-purple-200 hover:text-purple-500 transition-all"
                                >
                                  {role}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400">具体要求</label>
                            <textarea 
                              placeholder="请描述您对从业者的具体要求，如：工作年限、擅长风格、所在区域等"
                              className="w-full bg-white rounded-xl p-4 text-sm focus:outline-none border border-gray-100 focus:border-purple-300 transition-all h-32 resize-none shadow-sm"
                            />
                          </div>
                        </div>
                      </section>
                      <section className="space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-4 bg-purple-500 rounded-full" />
                          <h3 className="text-sm font-bold text-gray-900">联系方式</h3>
                        </div>
                        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400">联系电话</label>
                            <input 
                              type="tel" 
                              placeholder="方便从业者与您联系" 
                              className="w-full bg-white rounded-xl p-3 text-sm focus:outline-none border border-gray-100 focus:border-purple-300 transition-all shadow-sm" 
                            />
                          </div>
                        </div>
                      </section>
                    </div>
                  ) : type === 'video' ? (
                    <div className="space-y-6 pb-10">
                      {/* Video Upload Section */}
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

                      {/* Title, Content, Tags Section */}
                      <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-3">
                          <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="填写标题（最多20字）" 
                            className="w-full bg-transparent border-none outline-none font-bold text-xl placeholder:text-gray-200"
                          />
                        </div>

                        <div className="space-y-3">
                          <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="添加正文，分享你的装修故事..." 
                            rows={8}
                            className="w-full bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-300 resize-none leading-relaxed text-[15px]"
                          />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Bookmark className="w-4 h-4" />
                              <span className="text-sm font-medium">添加标签</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-blue-100"
                              >
                                #{tag}
                                <button onClick={() => removeTag(tag)} className="hover:text-blue-700">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                            <div className="flex-1 flex items-center bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100 focus-within:border-blue-200 transition-colors min-w-[140px]">
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

                        {/* Sync to Archive Option */}
                        <div className="pt-6 border-t border-gray-50">
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
                    </div>
                  ) : (
                    <div className="space-y-6 pb-10">
                      {/* Image Upload Section */}
                      <div className="grid grid-cols-3 gap-3">
                        <AnimatePresence>
                          {images.map((img, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100"
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

                      {/* Title, Content, Tags Section */}
                      <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-3">
                          <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="填写标题（最多20字）" 
                            className="w-full bg-transparent border-none outline-none font-bold text-xl placeholder:text-gray-200"
                          />
                        </div>

                        <div className="space-y-3">
                          <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="添加正文，分享你的装修故事..." 
                            rows={8}
                            className="w-full bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-300 resize-none leading-relaxed text-[15px]"
                          />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Bookmark className="w-4 h-4" />
                              <span className="text-sm font-medium">添加标签</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="bg-emerald-50 text-[#07c160] text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-100"
                              >
                                #{tag}
                                <button onClick={() => removeTag(tag)} className="hover:text-emerald-700">
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
                            </div>
                          </div>
                        </div>

                        {/* Sync to Archive Option */}
                        <div className="pt-6 border-t border-gray-50">
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
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const VideoPlayerPage = (props: { item: typeof CASE_DATA[0]; onBack: () => void; key?: React.Key }) => {
  const { item, onBack } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const shareOptions = [
    { id: 'wechat', label: '微信好友', icon: MessageCircle, color: 'bg-[#07c160]' },
    { id: 'message', label: '私信好友', icon: MessageSquare, color: 'bg-blue-500' },
    { id: 'link', label: '复制链接', icon: Link, color: 'bg-gray-600' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={onBack} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowShare(true)}
            className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Content */}
      <div className="flex-1 relative flex items-center justify-center">
        {item.contentType === 'video' ? (
          <video 
            src={item.videoUrl} 
            className="w-full h-full object-contain"
            autoPlay 
            loop 
            playsInline
          />
        ) : (
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Interaction Sidebar */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-10">
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            <img src={item.avatar} alt={item.author} className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center gap-1"
        >
          <div className={cn("p-2 rounded-full backdrop-blur-md transition-colors", isLiked ? "bg-red-500/20" : "bg-white/10")}>
            <Heart className={cn("w-7 h-7", isLiked ? "text-red-500 fill-current" : "text-white")} />
          </div>
          <span className="text-white text-xs font-medium">{item.likes}</span>
        </button>

        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className="flex flex-col items-center gap-1"
        >
          <div className={cn("p-2 rounded-full backdrop-blur-md transition-colors", isFavorited ? "bg-yellow-500/20" : "bg-white/10")}>
            <Bookmark className={cn("w-7 h-7", isFavorited ? "text-yellow-500 fill-current" : "text-white")} />
          </div>
          <span className="text-white text-xs font-medium">{item.favorites}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{item.comments}</span>
        </button>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-4 pb-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-base">@{item.author}</span>
            <button className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
              <UserPlus className="w-3 h-3" />
              关注
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
              <Send className="w-3 h-3" />
              私聊
            </button>
          </div>
        </div>

        <div className="max-w-[85%]">
          <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
          
          {/* Tags */}
          {(item as any).tags && (item as any).tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {(item as any).tags.map((tag: string) => (
                <span key={tag} className="text-white/80 text-[10px] bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="relative">
            <p className={cn(
              "text-white/90 text-sm leading-relaxed transition-all duration-300",
              !isExpanded && "line-clamp-2"
            )}>
              {item.description}
            </p>
            {item.description.length > 50 && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white font-bold text-sm mt-1"
              >
                {isExpanded ? '收起' : '...展开'}
              </button>
            )}
          </div>
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

const GraphicDetailPage = (props: { item: typeof CASE_DATA[0]; onBack: () => void; key?: React.Key }) => {
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

  const totalComments = parseInt(item.comments || '0') + (comments.length - 2);

  const handleLike = () => {
    setIsLiked(!isLiked);
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

  const images = (item as any).images || [item.image];

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
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-50 relative">
        <div className="flex items-center gap-3 z-10">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          {(item as any).type !== 'real' && (
            <div className="flex items-center gap-2">
              <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full border border-gray-100" />
              <span className="text-sm font-bold text-gray-900">{item.author}</span>
            </div>
          )}
        </div>

        {(item as any).type === 'real' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-base font-bold text-gray-900">实证案例详情</span>
          </div>
        )}

        <div className="flex items-center gap-2 z-10">
          {(item as any).type !== 'real' && (
            <>
              <button className="text-[#07c160] text-xs font-bold px-3 py-1.5 rounded-full border border-[#07c160]/30 bg-[#07c160]/5">
                关注
              </button>
              <button className="text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">
                私聊
              </button>
            </>
          )}
          <button 
            onClick={() => setShowShare(true)}
            className="p-1.5 hover:bg-gray-100 rounded-full pointer-events-auto"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-24">
        {(item as any).type !== 'real' && (
          <>
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

            {/* Title and Description */}
            <div className="px-5 pt-6">
              <h1 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                {item.title}
              </h1>
              <div className="space-y-4">
                <p className="text-gray-700 text-[15px] leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
                
                {/* Tags */}
                {(item as any).tags && (item as any).tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(item as any).tags.map((tag: string) => (
                      <span key={tag} className="text-[#07c160] text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Text Content */}
        <div className={cn("px-5", (item as any).type === 'real' ? "pt-6" : "pb-6")}>
          <div className="space-y-4">
            {/* Conscience Engineering Model Introduction */}
            {(item as any).type === 'real' && (
              <div className="bg-gradient-to-r from-[#5D2E2E]/10 to-transparent rounded-2xl p-4 border border-[#5D2E2E]/20 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-[#5D2E2E]" />
                  <h3 className="text-sm font-bold text-[#5D2E2E]">良知工程模式</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded border border-[#5D2E2E]/10">
                    <Wallet className="w-3 h-3 text-[#5D2E2E]" />
                    <span className="text-[11px] font-medium text-[#5D2E2E]">成本透明</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded border border-[#5D2E2E]/10">
                    <Eye className="w-3 h-3 text-[#5D2E2E]" />
                    <span className="text-[11px] font-medium text-[#5D2E2E]">施工透明</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded border border-[#5D2E2E]/10">
                    <FileText className="w-3 h-3 text-[#5D2E2E]" />
                    <span className="text-[11px] font-medium text-[#5D2E2E]">数字档案</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded border border-[#5D2E2E]/10">
                    <Link className="w-3 h-3 text-[#5D2E2E]" />
                    <span className="text-[11px] font-medium text-[#5D2E2E]">全程上链可追溯</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded border border-[#5D2E2E]/10">
                    <Award className="w-3 h-3 text-[#5D2E2E]" />
                    <span className="text-[11px] font-medium text-[#5D2E2E]">严选高端专业团队</span>
                  </div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  本项目采用良知工程模式，承诺施工过程全透明，材料保真，绝无隐形增项。由认证工长、设计师及专业工人组成的专属团队为您服务，确保每一道工序都经得起检验，让您装修无忧。
                </p>
              </div>
            )}

            {/* Project Information Section */}
            {(item as any).projectName && (
              <div className="mt-8 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4 text-[#5D2E2E]" />
                  <h3 className="text-sm font-bold text-gray-900">项目信息</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between col-span-2">
                    <span className="text-xs text-gray-500">项目名称</span>
                    <span className="text-xs font-medium text-gray-900">{(item as any).projectName}</span>
                  </div>
                  <div className="flex items-center justify-between col-span-2">
                    <span className="text-xs text-gray-500">房屋位置</span>
                    <span className="text-xs font-medium text-gray-900 text-right">{(item as any).houseLocation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">房屋面积</span>
                    <span className="text-xs font-medium text-gray-900">{(item as any).area}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">户型</span>
                    <span className="text-xs font-medium text-gray-900">{(item as any).layout || '暂无'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">装修风格</span>
                    <span className="text-xs font-medium text-gray-900">{(item as any).style}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">工期</span>
                    <span className="text-xs font-medium text-gray-900">{(item as any).duration || '暂无'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">开工日期</span>
                    <span className="text-xs font-medium text-gray-900">{(item as any).startDate || '暂无'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">竣工日期</span>
                    <span className="text-xs font-medium text-gray-900">{(item as any).completionDate || '暂无'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Cost Information Section */}
            {(item as any).costs && (
              <div className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-4 h-4 text-[#5D2E2E]" />
                  <h3 className="text-sm font-bold text-gray-900">费用信息</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200/50">
                    <span className="text-xs text-gray-500">装修总费用</span>
                    <span className="text-sm font-bold text-[#5D2E2E]">¥{(item as any).costs.decoration}</span>
                  </div>
                  
                  {/* Pie Chart */}
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: '人工费', value: parseInt((item as any).costs.labor.replace(/,/g, '')) },
                            { name: '辅材费', value: parseInt((item as any).costs.auxiliary.replace(/,/g, '')) },
                            { name: '主材费', value: parseInt((item as any).costs.main.replace(/,/g, '')) },
                            { name: '其他费用', value: parseInt((item as any).costs.other.replace(/,/g, '')) }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#5D2E2E" />
                          <Cell fill="#8B5A5A" />
                          <Cell fill="#B88686" />
                          <Cell fill="#E5B2B2" />
                        </Pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#5D2E2E]" />
                        <span className="text-[11px] text-gray-500">人工费</span>
                      </div>
                      <span className="text-[11px] font-medium text-gray-900">¥{(item as any).costs.labor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#8B5A5A]" />
                        <span className="text-[11px] text-gray-500">辅材费</span>
                      </div>
                      <span className="text-[11px] font-medium text-gray-900">¥{(item as any).costs.auxiliary}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#B88686]" />
                        <span className="text-[11px] text-gray-500">主材费</span>
                      </div>
                      <span className="text-[11px] font-medium text-gray-900">¥{(item as any).costs.main}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#E5B2B2]" />
                        <span className="text-[11px] text-gray-500">其他费用</span>
                      </div>
                      <span className="text-[11px] font-medium text-gray-900">¥{(item as any).costs.other}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Service Team Information Section */}
            {((item as any).team || (item as any).practitioner) && (
              <div className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-[#5D2E2E]" />
                  <h3 className="text-sm font-bold text-gray-900">服务团队信息</h3>
                </div>
                <div className="space-y-4">
                  {((item as any).team || [(item as any).practitioner]).map((member: any, idx: number) => (
                    <div key={idx} className="flex flex-col gap-3 pb-4 border-b border-gray-200/50 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                            {member.isVerified && (
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                <CheckCircle2 className="w-3 h-3 text-[#07c160]" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                              <span className="text-sm font-bold text-gray-900">{member.name}</span>
                              <span className="bg-[#5D2E2E]/10 text-[#5D2E2E] text-[9px] px-1.5 py-0.5 rounded-sm font-bold">{member.role || '工长'}</span>
                              {member.isVerified && <span className="bg-[#07c160]/10 text-[#07c160] text-[9px] px-1.5 py-0.5 rounded-sm font-bold">已认证</span>}
                              {member.training && <span className="bg-blue-50 text-blue-600 text-[9px] px-1.5 py-0.5 rounded-sm font-bold border border-blue-100">技能培训</span>}
                              {member.assessment && <span className="bg-purple-50 text-purple-600 text-[9px] px-1.5 py-0.5 rounded-sm font-bold border border-purple-100">技能考核</span>}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                              <FileText className="w-3 h-3" />
                              <span>数字档案: {member.digitalArchive}</span>
                            </div>
                          </div>
                        </div>
                        <button className="flex items-center gap-1 text-[#5D2E2E] text-xs font-bold shrink-0">
                          查看
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      {member.scores && (
                        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-gray-100">
                          <div className="flex flex-col items-center flex-1">
                            <span className="text-[10px] text-gray-500 mb-0.5">满意度</span>
                            <span className="text-xs font-bold text-[#5D2E2E]">{member.scores.satisfaction}%</span>
                          </div>
                          <div className="w-px h-6 bg-gray-100" />
                          <div className="flex flex-col items-center flex-1">
                            <span className="text-[10px] text-gray-500 mb-0.5">配合度</span>
                            <span className="text-xs font-bold text-[#5D2E2E]">{member.scores.cooperation}%</span>
                          </div>
                          <div className="w-px h-6 bg-gray-100" />
                          <div className="flex flex-col items-center flex-1">
                            <span className="text-[10px] text-gray-500 mb-0.5">专业度</span>
                            <span className="text-xs font-bold text-[#5D2E2E]">{member.scores.professional}%</span>
                          </div>
                        </div>
                      )}

                      {(member.honors || member.wordCloud) && (
                        <div className="flex flex-col gap-2">
                          {member.honors && member.honors.length > 0 && (
                            <div className="flex items-start gap-2">
                              <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <div className="flex flex-wrap gap-1.5">
                                {member.honors.map((honor: string, i: number) => (
                                  <span key={i} className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                                    {honor}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {member.wordCloud && member.wordCloud.length > 0 && (
                            <div className="flex items-start gap-2">
                              <MessageSquare className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                              <div className="flex flex-wrap gap-1.5">
                                {member.wordCloud.map((word: string, i: number) => (
                                  <span key={i} className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                                    {word}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Good Deeds Section */}
            {(item as any).goodDeeds && (item as any).goodDeeds.length > 0 && (
              <div className="mt-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100/50">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-4 h-4 text-red-500" />
                  <h3 className="text-sm font-bold text-gray-900">工地好人好事</h3>
                </div>
                <div className="space-y-3">
                  {(item as any).goodDeeds.map((deed: any, idx: number) => (
                    <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white">
                      <div className="flex items-center gap-2 mb-2">
                        <img src={deed.avatar} alt={deed.name} className="w-6 h-6 rounded-full" />
                        <span className="text-xs font-bold text-gray-900">{deed.name}</span>
                        <span className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">{deed.title}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {deed.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completion Photos Section */}
            {(item as any).completionPhotos && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-[#5D2E2E] rounded-full" />
                  <h3 className="text-base font-bold text-gray-900">装修完工图</h3>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(item as any).completionPhotos.map((photo: string, idx: number) => (
                    <img 
                      key={idx} 
                      src={photo} 
                      alt={`完工图 ${idx + 1}`} 
                      className="w-full aspect-square object-cover rounded-md shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Site Photos Section */}
            {(item as any).sitePhotos && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-[#5D2E2E] rounded-full" />
                  <h3 className="text-base font-bold text-gray-900">施工现场图</h3>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(item as any).sitePhotos.map((photo: string, idx: number) => (
                    <img 
                      key={idx} 
                      src={photo} 
                      alt={`现场图 ${idx + 1}`} 
                      className="w-full aspect-square object-cover rounded-md shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Design Challenges Section */}
            {(item as any).designChallenges && (
              <div className="mt-8 bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/50">
                <div className="flex items-center gap-2 mb-4">
                  <Wand2 className="w-4 h-4 text-[#07c160]" />
                  <h3 className="text-base font-bold text-gray-900">设计难点及解决方案</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">设计难点</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{(item as any).designChallenges.difficulty}</p>
                  </div>
                  <div className="pt-3 border-t border-emerald-100/50">
                    <div className="text-[11px] font-bold text-[#07c160] uppercase tracking-wider mb-1">解决方案</div>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{(item as any).designChallenges.solution}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Construction Challenges Section */}
            {(item as any).constructionChallenges && (
              <div className="mt-4 bg-amber-50/50 rounded-2xl p-5 border border-amber-100/50">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardCheck className="w-4 h-4 text-amber-600" />
                  <h3 className="text-base font-bold text-gray-900">施工难点及解决方案</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">施工难点</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{(item as any).constructionChallenges.difficulty}</p>
                  </div>
                  <div className="pt-3 border-t border-amber-100/50">
                    <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">解决方案</div>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{(item as any).constructionChallenges.solution}</p>
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
              <h3 className="text-sm font-bold text-gray-900">共 {totalComments} 条评论</h3>
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
            <span className="text-[10px] text-gray-500 font-medium">{totalComments}</span>
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
            className="fixed bottom-0 inset-x-0 bg-white rounded-t-[32px] z-[210] px-6 pt-8 pb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900">选择城市</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => onSelect(city)}
                  className={cn(
                    "py-3 rounded-2xl text-sm font-medium transition-all",
                    city === currentCity 
                      ? "bg-[#07c160] text-white shadow-lg shadow-[#07c160]/30" 
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {city}
                </button>
              ))}
            </div>
            
            <div className="mt-10 p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-orange-700 leading-relaxed">
                切换城市后，我们将为您展示该地区的精选案例与本地化家装服务。
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const LikesAndCollectionsPage = ({ onBack }: { onBack: () => void }) => {
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

const NewFollowersPage = ({ onBack }: { onBack: () => void }) => {
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

const CommentsPage = ({ onBack }: { onBack: () => void }) => {
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

const MessagesPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const messages = [
    { id: 1, name: '系统通知', content: '您的案例“现代简约风格”已通过审核', time: '10:30', avatar: 'https://picsum.photos/seed/sys/100/100', unread: 1 },
    { id: 2, name: '项目通知', content: '您的项目“上海檀宫别墅”有新的施工进度更新', time: '昨天', avatar: 'https://picsum.photos/seed/project/100/100', unread: 0 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center">
        <h1 className="text-lg font-bold text-gray-900">消息</h1>
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

const MyRequirementsPage = ({ onBack }: { onBack: () => void }) => {
  const [activeStatus, setActiveStatus] = useState<'reviewing' | 'online' | 'rejected' | 'offline'>('reviewing');
  
  const statuses = [
    { id: 'reviewing', label: '审核中' },
    { id: 'online', label: '已上线' },
    { id: 'rejected', label: '未通过' },
    { id: 'offline', label: '已下线' },
  ];

  const requirements = [
    { id: 1, title: '三室两厅现代简约装修需求', area: 120, budget: 20, time: '2024-03-01 10:00', status: 'reviewing' },
    { id: 2, title: '老房翻新：北欧风格改造', area: 85, budget: 15, time: '2024-02-28 15:30', status: 'online' },
    { id: 3, title: '别墅整装设计需求', area: 350, budget: 100, time: '2024-02-25 09:00', status: 'rejected', reason: '预算与面积不符' },
    { id: 4, title: '单身公寓软装搭配', area: 45, budget: 5, time: '2024-02-20 14:00', status: 'offline' },
  ];

  const filteredRequirements = requirements.filter(req => req.status === activeStatus);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的需求</h1>
      </div>

      <div className="bg-white px-4 flex items-center justify-between border-b border-gray-50 sticky top-[61px] z-40">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => setActiveStatus(status.id as any)}
            className={cn(
              "py-4 text-sm font-medium relative transition-colors",
              activeStatus === status.id ? "text-[#07c160]" : "text-gray-500"
            )}
          >
            {status.label}
            {activeStatus === status.id && (
              <motion.div 
                layoutId="statusTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#07c160]" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 space-y-4">
        {filteredRequirements.length > 0 ? (
          filteredRequirements.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-bold text-gray-900">{req.title}</h3>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                  req.status === 'reviewing' ? "bg-blue-50 text-blue-500" :
                  req.status === 'online' ? "bg-emerald-50 text-emerald-500" :
                  req.status === 'rejected' ? "bg-red-50 text-red-500" :
                  "bg-gray-100 text-gray-500"
                )}>
                  {statuses.find(s => s.id === req.status)?.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-gray-400">房屋面积</span>
                  <span className="text-sm font-bold text-gray-700">{req.area} m²</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-gray-400">装修预算</span>
                  <span className="text-sm font-bold text-gray-700">{req.budget} 万元</span>
                </div>
              </div>
              {req.status === 'rejected' && (req as any).reason && (
                <div className="mb-4 p-3 bg-red-50 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 leading-relaxed">未通过原因：{(req as any).reason}</p>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-[10px] text-gray-400">{req.time}</span>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-1.5 text-xs font-bold text-gray-600 bg-gray-50 rounded-full border border-gray-100">
                    {req.status === 'rejected' ? '编辑' : '查看详情'}
                  </button>
                  {req.status === 'online' && (
                    <button className="px-4 py-1.5 text-xs font-bold text-white bg-gray-400 rounded-full shadow-sm">
                      下线
                    </button>
                  )}
                  {req.status === 'offline' && (
                    <button className="px-4 py-1.5 text-xs font-bold text-white bg-[#07c160] rounded-full shadow-sm shadow-[#07c160]/20">
                      上线
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <ClipboardCheck className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm">暂无相关需求</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchPage = ({ onBack }: { onBack: () => void }) => {
  const hotSearches = ['原木风装修', '89平米三室两厅', '水电改造避坑', '严选合作体系', '现代简约案例'];
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2.5 gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            autoFocus
            type="text" 
            placeholder="搜索案例、博主、良匠..." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
        <button onClick={onBack} className="text-sm font-medium text-gray-600 px-2">取消</button>
      </div>

      <div className="p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4">热门搜索</h3>
        <div className="flex flex-wrap gap-2">
          {hotSearches.map((item) => (
            <span key={item} className="px-4 py-2 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PremiumConscienceSection = () => (
  <section className="mt-12 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-zinc-800">
    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
    
    <div className="relative z-10 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-700 shadow-inner">
          <Sparkles className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-serif tracking-widest text-amber-400">良知工程 承诺</h3>
          <p className="text-zinc-500 text-xs tracking-[0.2em] font-light uppercase">Transparency & Quality</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-zinc-100 text-sm font-medium">
            <div className="p-1.5 bg-zinc-800 rounded-lg">
              <CreditCard className="w-4 h-4 text-amber-500" />
            </div>
            成本透明
          </div>
          <p className="text-zinc-500 text-xs font-light leading-relaxed pl-10">材料人工明码标价，拒绝隐形增项，每一分投入都清晰可见。</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-zinc-100 text-sm font-medium">
            <div className="p-1.5 bg-zinc-800 rounded-lg">
              <Eye className="w-4 h-4 text-amber-500" />
            </div>
            施工透明
          </div>
          <p className="text-zinc-500 text-xs font-light leading-relaxed pl-10">关键节点实时播报，进度尽在掌握，让您足不出户即可掌控全局。</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-zinc-100 text-sm font-medium">
            <div className="p-1.5 bg-zinc-800 rounded-lg">
              <FileText className="w-4 h-4 text-amber-500" />
            </div>
            数字档案
          </div>
          <p className="text-zinc-500 text-xs font-light leading-relaxed pl-10">永久数字化装修档案，售后有凭证，让家装过程可追溯、可信赖。</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-zinc-100 text-sm font-medium">
            <div className="p-1.5 bg-zinc-800 rounded-lg">
              <Shield className="w-4 h-4 text-amber-500" />
            </div>
            上链追溯
          </div>
          <p className="text-zinc-500 text-xs font-light leading-relaxed pl-10">关键节点上链存证，确保数据不可篡改，保障您的合法权益。</p>
        </div>
      </div>
    </div>
  </section>
);

const PremiumCaseAndTestimonialSection = () => (
  <div className="mt-12 space-y-10">
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
          <span className="text-amber-500 text-sm">04</span>
          良知工程案例
        </h3>
        <span className="text-[10px] text-zinc-400 tracking-widest uppercase">Real Cases</span>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img 
            src="https://picsum.photos/seed/case-conscience/800/450" 
            alt="良知工程案例" 
            className="w-full h-48 object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-medium rounded-full">全程上链</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded-full">成本透明</span>
            </div>
            <h4 className="font-bold text-zinc-900">上海·檀宫别墅全案装修</h4>
            <p className="text-zinc-500 text-xs font-light leading-relaxed">
              该项目全面应用良知工程体系，通过数字化档案记录了从拆改到软装的每一个细节，业主通过手机实时查看施工进度与材料溯源。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
          <span className="text-amber-500 text-sm">05</span>
          业主寄语
        </h3>
        <Quote className="w-5 h-5 text-amber-500/30" />
      </div>
      
      <div className="bg-amber-50/50 rounded-3xl p-6 border border-amber-100/50 relative">
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center border border-amber-100">
          <Quote className="w-4 h-4 text-amber-500" />
        </div>
        <p className="text-zinc-700 text-sm italic leading-relaxed font-light">
          "选择严选工作室最初是因为他们的设计方案，但真正让我感到安心的是良知工程。装修过程中的每一笔支出都清清楚楚，施工现场的实时播报让我即使在出差期间也能掌握进度。这种透明度在装修行业真的非常难得。"
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden">
            <img src="https://picsum.photos/seed/owner-avatar/100/100" alt="业主" referrerPolicy="no-referrer" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-900">王先生</p>
            <p className="text-[10px] text-zinc-400">檀宫别墅业主</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    requirement: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('咨询请求已提交，专属顾问将尽快与您联系。');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-zinc-900 font-serif">咨询详情</h3>
              <p className="text-zinc-400 text-xs font-light">请填写以下信息，我们将为您提供专属服务</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold ml-1">贵姓</label>
                <input 
                  required
                  type="text" 
                  placeholder="如何称呼您"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold ml-1">联系方式</label>
                <input 
                  required
                  type="tel" 
                  placeholder="手机号或微信号"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all"
                  value={formData.contact}
                  onChange={e => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold ml-1">需求简述</label>
                <textarea 
                  required
                  placeholder="请简单描述您的装修需求"
                  rows={3}
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all resize-none"
                  value={formData.requirement}
                  onChange={e => setFormData({ ...formData, requirement: e.target.value })}
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 text-zinc-400 text-sm font-bold hover:bg-zinc-50 rounded-2xl transition-all"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-2 bg-zinc-900 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-zinc-900/20 active:scale-[0.98] transition-all"
                >
                  提交咨询
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PremiumStudioIntroPage = ({ onBack }: { onBack: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[200] bg-zinc-50 flex flex-col overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-100">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 font-serif">良造家专家组</h1>
      </div>

      <div className="flex-1 pb-24">
        {/* Hero Section */}
        <div className="relative h-64 w-full">
          <img 
            src="https://picsum.photos/seed/luxury-mansion-intro/800/600" 
            alt="高端工作室"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent flex flex-col justify-end p-6">
            <div className="w-8 h-[2px] bg-amber-400 mb-3" />
            <h2 className="text-3xl font-bold text-white mb-2 font-serif tracking-widest">大宅专属定制</h2>
            <p className="text-amber-400/90 text-sm tracking-widest font-light">为塔尖圈层，打造传世之作</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6 space-y-10">
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
              <span className="text-amber-500 text-sm">01</span>
              国际视野 顶层设计
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm font-light">
              汇聚全球顶尖设计力量，深谙大平层、别墅、豪宅的空间哲学。我们不仅设计空间，更在为您规划未来的生活方式。每一处细节，皆彰显非凡品味。
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <img src="https://picsum.photos/seed/design-1/400/300" className="rounded-xl shadow-sm" alt="设计细节" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/design-2/400/300" className="rounded-xl shadow-sm" alt="设计细节" referrerPolicy="no-referrer" />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
              <span className="text-amber-500 text-sm">02</span>
              金牌工匠 极致交付
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm font-light">
              严选从业20年以上的高级工长，采用德系精工标准。从隐蔽工程到软装陈设，108项严苛验收节点，确保设计效果100%完美落地。
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
              <span className="text-amber-500 text-sm">03</span>
              尊享管家 闭环服务
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm font-light">
              提供1V1专属管家服务，全天候响应您的需求。施工进度实时云端同步，让您足不出户即可掌控全局。尊享终身质保，售后无忧。
            </p>
          </section>

          <PremiumConscienceSection />
          <PremiumCaseAndTestimonialSection />
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50">
        <button 
          className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-zinc-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-amber-400">✦</span>
          咨询更多
          <span className="text-amber-400">✦</span>
        </button>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

const PremiumDesignerIntroPage = ({ onBack }: { onBack: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[200] bg-zinc-50 flex flex-col overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-100">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 font-serif">严选高端设计师</h1>
      </div>

      <div className="flex-1 pb-24">
        {/* Hero Section */}
        <div className="relative h-64 w-full">
          <img 
            src="https://picsum.photos/seed/luxury-designer-intro/800/600" 
            alt="高端设计师"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent flex flex-col justify-end p-6">
            <div className="w-8 h-[2px] bg-amber-400 mb-3" />
            <h2 className="text-3xl font-bold text-white mb-2 font-serif tracking-widest">国际视野 顶层设计</h2>
            <p className="text-amber-400/90 text-sm tracking-widest font-light">重塑空间美学，定义奢华生活</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6 space-y-10">
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
              <span className="text-amber-500 text-sm">01</span>
              大师级设计团队
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm font-light">
              我们的设计师均拥有国内外顶尖设计院校背景，屡获国际设计大奖。他们不仅是空间的规划者，更是生活艺术的创造者。
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
              <span className="text-amber-500 text-sm">02</span>
              全案定制服务
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm font-light">
              从建筑结构改造、室内硬装设计到软装陈设、艺术品选配，提供一站式全案设计服务，确保设计理念的完美贯穿。
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <img src="https://picsum.photos/seed/designer-1/400/300" className="rounded-xl shadow-sm" alt="设计作品" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/designer-2/400/300" className="rounded-xl shadow-sm" alt="设计作品" referrerPolicy="no-referrer" />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
              <span className="text-amber-500 text-sm">03</span>
              个性化生活方式
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm font-light">
              深入了解您的家族文化、生活习惯与审美偏好，为您量身定制独一无二的私属空间，让家成为您精神的栖息地。
            </p>
          </section>

          <PremiumConscienceSection />
          <PremiumCaseAndTestimonialSection />
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50">
        <button 
          className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-zinc-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-amber-400">✦</span>
          咨询更多
          <span className="text-amber-400">✦</span>
        </button>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

const PremiumForemanIntroPage = ({ onBack }: { onBack: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[200] bg-zinc-50 flex flex-col overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-100">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 font-serif">严选高端工长</h1>
      </div>

      <div className="flex-1 pb-24">
        {/* Hero Section */}
        <div className="relative h-64 w-full">
          <img 
            src="https://picsum.photos/seed/luxury-foreman-intro/800/600" 
            alt="高端工长"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent flex flex-col justify-end p-6">
            <div className="w-8 h-[2px] bg-amber-400 mb-3" />
            <h2 className="text-3xl font-bold text-white mb-2 font-serif tracking-widest">金牌工匠 极致交付</h2>
            <p className="text-amber-400/90 text-sm tracking-widest font-light">精雕细琢，铸就百年基业</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6 space-y-10">
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
              <span className="text-amber-500 text-sm">01</span>
              20年+ 行业积淀
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm font-light">
              我们的工长均拥有20年以上的大宅施工经验，经历过无数复杂工艺的考验。他们是工程质量的守护者，更是匠心精神的传承者。
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
              <span className="text-amber-500 text-sm">02</span>
              德系精工标准
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm font-light">
              全面引入德国先进施工工艺与管理体系，从水电隐蔽工程到木作油漆，每一道工序都严格遵循国际最高标准，确保工程品质无可挑剔。
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <img src="https://picsum.photos/seed/foreman-1/400/300" className="rounded-xl shadow-sm" alt="施工细节" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/foreman-2/400/300" className="rounded-xl shadow-sm" alt="施工细节" referrerPolicy="no-referrer" />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 font-serif flex items-center gap-3">
              <span className="text-amber-500 text-sm">03</span>
              108项 严苛验收
            </h3>
            <p className="text-zinc-600 leading-relaxed text-sm font-light">
              建立完善的质量监控体系，涵盖108个关键节点验收。绝不放过任何一个微小瑕疵，以极致的严谨态度，为您打造安心、放心的传世之宅。
            </p>
          </section>

          <PremiumConscienceSection />
          <PremiumCaseAndTestimonialSection />
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50">
        <button 
          className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-zinc-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-amber-400">✦</span>
          咨询更多
          <span className="text-amber-400">✦</span>
        </button>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

const FollowersPage = ({ onBack }: { onBack: () => void }) => {
  const followers = [
    { name: '装修小白阿强', avatar: 'https://i.pravatar.cc/150?u=aqiang', desc: '正在准备装修中' },
    { name: '设计爱好者小李', avatar: 'https://i.pravatar.cc/150?u=xiaoli', desc: '喜欢收集各种装修灵感' },
    { name: '极简主义者', avatar: 'https://i.pravatar.cc/150?u=minimal', desc: 'Less is more' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的粉丝</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {followers.map((user, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{user.desc}</p>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-[#07c160] text-white text-[10px] font-bold rounded-full">回关</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const FollowingPage = ({ onBack }: { onBack: () => void }) => {
  const followings = [
    { name: '家居博主Momo', avatar: 'https://i.pravatar.cc/150?u=momo', desc: '分享治愈系家居生活' },
    { name: '改造达人小王', avatar: 'https://i.pravatar.cc/150?u=xiaowang', desc: '老房改造专家' },
    { name: '温柔半两', avatar: 'https://i.pravatar.cc/150?u=wenrou', desc: '法式复古风爱好者' },
    { name: '木木家', avatar: 'https://i.pravatar.cc/150?u=mumu', desc: '原木风设计工作室' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的关注</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {followings.map((user, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{user.desc}</p>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-gray-200 text-gray-600 text-[10px] font-bold rounded-full">已关注</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [page, setPage] = useState<'home' | 'cases' | 'real-cases' | 'cooperation' | 'detail' | 'profile' | 'my-cases' | 'my-requirements' | 'messages' | 'my-home' | 'search' | 'mode-intro' | 'service-mode' | 'premium-studio' | 'premium-designer' | 'premium-foreman' | 'following' | 'followers' | 'likes-collections' | 'new-followers' | 'comments' | 'sandbox' | 'my-favorites' | 'browsing-history' | 'settings'>('home');
  const [detailSource, setDetailSource] = useState<'home' | 'cases' | 'real-cases'>('home');
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('北京');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleSelectCase = (item: any, source: 'home' | 'cases' | 'real-cases' = 'home') => {
    setSelectedCase(item);
    setDetailSource(source);
    setPage('detail');
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'home') setPage('home');
    if (tab === 'my-home') setPage('my-home');
    if (tab === 'profile') setPage('profile');
    if (tab === 'messages') setPage('messages');
  };

  const handleMenuClick = (label: string) => {
    if (label === '我的需求') {
      setPage('my-requirements');
    } else if (label === '私宅档案') {
      setPage('my-cases');
    } else if (label === '关注') {
      setPage('following');
    } else if (label === '粉丝') {
      setPage('followers');
    } else if (label === '浏览历史') {
      setPage('browsing-history');
    } else if (label === '我的收藏') {
      setPage('my-favorites');
    } else if (label === '设置' || label === '其他') {
      setPage('settings');
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCityModalOpen(false);
    
    // Simulate reload as requested
    const toast = document.createElement('div');
    toast.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-full z-[300] text-sm font-bold animate-pulse';
    toast.innerText = `正在切换至 ${city}...`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 1000);
  };

  return (
    <div className={cn("min-h-screen bg-gray-50 font-sans", (page === 'home' || page === 'profile' || page === 'messages' || page === 'my-home') && "pb-24")}>
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <SearchHeader 
              city={selectedCity} 
              onCityClick={() => setIsCityModalOpen(true)} 
              onModeClick={() => setPage('mode-intro')}
            />
            <HomeCarousel />
            <TrustIndicators onLearnMore={() => setPage('service-mode')} />
            <PremiumModules 
              onStudioClick={() => setPage('premium-studio')} 
              onDesignerClick={() => setPage('premium-designer')}
              onForemanClick={() => setPage('premium-foreman')}
            />
            <ExclusiveServices onApply={() => setShowBookingModal(true)} />
            <ListSection 
              onSelectCase={(item) => handleSelectCase(item, 'home')} 
              onSearchClick={() => setPage('search')}
            />
          </motion.div>
        )}
        {page === 'search' && <SearchPage onBack={() => setPage('home')} />}
        {page === 'mode-intro' && <ModeIntroPage onBack={() => setPage('home')} />}
        {page === 'service-mode' && <ServiceModePage onBack={() => setPage('home')} />}
        {page === 'premium-studio' && <PremiumStudioIntroPage onBack={() => setPage('home')} />}
        {page === 'premium-designer' && <PremiumDesignerIntroPage onBack={() => setPage('home')} />}
        {page === 'premium-foreman' && <PremiumForemanIntroPage onBack={() => setPage('home')} />}
        {page === 'sandbox' && <SandboxPage onBack={() => setPage('home')} />}
        {page === 'my-home' && (
          <motion.div
            key="my-home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MyHomePage />
          </motion.div>
        )}
        {page === 'messages' && (
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MessagesPage onNavigate={(p) => setPage(p as any)} />
          </motion.div>
        )}
        {page === 'likes-collections' && (
          <motion.div
            key="likes-collections"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <LikesAndCollectionsPage onBack={() => setPage('messages')} />
          </motion.div>
        )}
        {page === 'new-followers' && (
          <motion.div
            key="new-followers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <NewFollowersPage onBack={() => setPage('messages')} />
          </motion.div>
        )}
        {page === 'comments' && (
          <motion.div
            key="comments"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <CommentsPage onBack={() => setPage('messages')} />
          </motion.div>
        )}
        {page === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <SettingsPage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ProfilePage onMenuClick={handleMenuClick} />
          </motion.div>
        )}
        {page === 'browsing-history' && (
          <motion.div
            key="browsing-history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <BrowsingHistoryPage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'my-favorites' && (
          <motion.div
            key="my-favorites"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <MyFavoritesPage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'my-cases' && (
          <motion.div
            key="my-cases"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <MyCasesPage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'my-requirements' && (
          <motion.div
            key="my-requirements"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <MyRequirementsPage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'following' && (
          <FollowingPage onBack={() => setPage('profile')} />
        )}
        {page === 'followers' && (
          <FollowersPage onBack={() => setPage('profile')} />
        )}
        {page === 'cooperation' && (
          <CooperationListPage 
            key="cooperation" 
            onBack={() => setPage('home')} 
          />
        )}
        {page === 'real-cases' && (
          <RealCaseListPage 
            key="real-cases" 
            onBack={() => setPage('home')} 
            onSelectCase={(item) => handleSelectCase(item, 'real-cases')}
          />
        )}
        {page === 'cases' && (
          <CaseListPage 
            key="cases" 
            onBack={() => setPage('home')} 
            onSelectCase={(item) => handleSelectCase(item, 'cases')}
          />
        )}
        {page === 'detail' && selectedCase && (
          selectedCase.contentType === 'video' ? (
            <VideoPlayerPage 
              key="video"
              item={selectedCase} 
              onBack={() => setPage(detailSource)} 
            />
          ) : (
            <GraphicDetailPage 
              key="graphic"
              item={selectedCase}
              onBack={() => setPage(detailSource)}
            />
          )
        )}
      </AnimatePresence>
      {/* --- Global High-Conversion CTA --- */}
      <AnimatePresence>
        {(page === 'home' || page === 'cases' || page === 'real-cases') && (
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-[100px] left-6 right-6 z-[99]"
          >
            <div className="bg-white/90 backdrop-blur-3xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-1.5 pl-5 flex items-center justify-between group cursor-pointer hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-shadow" onClick={() => setShowBookingModal(true)}>
              <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[13px] font-bold text-gray-900 tracking-tight">私属顾问在线</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium tracking-tight mt-0.5">
                  为您的府邸提供针对性避坑建议
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex -space-x-2 mr-1">
                  <img src="https://i.pravatar.cc/100?u=1" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/100?u=2" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                </div>
                <button 
                  className="bg-zinc-900 text-white px-7 py-3 rounded-full text-[11px] font-bold tracking-[0.2em] transition-all hover:bg-black active:scale-95 shadow-lg shadow-zinc-900/10 flex items-center gap-1.5"
                >
                  <span>即刻预约</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(page === 'home' || page === 'profile' || page === 'messages' || page === 'my-home') && (
        <BottomNav 
          activeTab={page} 
          onTabChange={handleTabChange}
          onPublishClick={() => setIsPublishOpen(true)}
        />
      )}
      <PublishModal isOpen={isPublishOpen} onClose={() => setIsPublishOpen(false)} />
      <CityModal 
        isOpen={isCityModalOpen} 
        onClose={() => setIsCityModalOpen(false)} 
        onSelect={handleCitySelect}
        currentCity={selectedCity}
      />

      {/* Booking Success Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-white rounded-[32px] p-8 max-w-[320px] w-full text-center shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-16 h-16 mx-auto bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">预约成功</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                已经给您对接大宅私属顾问，晚些时候会联系您，感谢您的信任。
              </p>
              <button
                onClick={() => setShowBookingModal(false)}
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-colors active:scale-95"
              >
                我知道了
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
