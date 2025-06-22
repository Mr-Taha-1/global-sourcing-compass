
import React from 'react';
import { Search, Bell, Share2, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';

export function Header() {
  const { language, setLanguage, t, isRTL } = useLanguage();

  return (
    <header className={`bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className={`flex items-center gap-4 flex-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="relative max-w-md flex-1">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            placeholder={t('search.placeholder')}
            className={`w-full bg-gray-50 border-gray-200 ${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
          />
          <span className="absolute top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-200 px-1 py-0.5 rounded right-3">
            ⌘T
          </span>
        </div>
      </div>
      
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
          className="text-sm border border-gray-200 rounded px-2 py-1"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
        
        <Button variant="ghost" size="sm" className="p-2">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <Clock className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium">{t('user.name')}</span>
        </div>
      </div>
    </header>
  );
}
