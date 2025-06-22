
import React from 'react';
import { 
  Home, 
  Users, 
  ShoppingCart, 
  FileText, 
  CreditCard, 
  FolderOpen, 
  CheckSquare, 
  Target,
  HeadphonesIcon,
  Settings
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useLocation, Link } from 'react-router-dom';

const mainMenuItems = [
  { id: 'dashboard', icon: Home, path: '/' },
  { id: 'customers', icon: Users, path: '/customers' },
  { id: 'sales', icon: ShoppingCart, path: '/sales', hasSubmenu: true },
  { id: 'expenses', icon: CreditCard, path: '/expenses' },
  { id: 'contracts', icon: FileText, path: '/contracts' },
  { id: 'projects', icon: FolderOpen, path: '/projects' },
  { id: 'tasks', icon: CheckSquare, path: '/tasks' },
  { id: 'leads', icon: Target, path: '/leads' },
];

const otherMenuItems = [
  { id: 'support', icon: HeadphonesIcon, path: '/support' },
  { id: 'settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
  const { t, isRTL } = useLanguage();
  const location = useLocation();

  const MenuItem = ({ item }: { item: any }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link
        to={item.path}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-gray-100 ${
          isActive ? 'bg-teal-50 text-teal-700 font-medium' : 'text-gray-600'
        } ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <item.icon className="w-4 h-4" />
        <span>{t(`sidebar.${item.id}`)}</span>
      </Link>
    );
  };

  return (
    <aside className={`w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto ${isRTL ? 'border-l border-r-0' : ''}`}>
      <div className="p-6">
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-xl font-bold text-gray-900">effix</span>
        </div>
      </div>
      
      <nav className="px-4 space-y-1">
        <div className="mb-6">
          <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${isRTL ? 'text-right' : ''}`}>
            {t('sidebar.main')}
          </h3>
          {mainMenuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
        
        <div>
          <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${isRTL ? 'text-right' : ''}`}>
            {t('sidebar.others')}
          </h3>
          {otherMenuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </nav>
      
      <div className="mt-8 p-4">
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-4 text-white">
          <h4 className="font-semibold mb-1">{t('sidebar.upgrade.title')}</h4>
          <p className="text-sm text-teal-100 mb-3">{t('sidebar.upgrade.description')}</p>
          <button className="bg-white text-teal-600 text-sm font-medium px-3 py-1 rounded">
            {t('sidebar.upgrade.button')}
          </button>
        </div>
      </div>
    </aside>
  );
}
