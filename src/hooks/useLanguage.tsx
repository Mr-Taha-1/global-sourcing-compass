
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    'search.placeholder': 'Search...',
    'user.name': 'Washim',
    'sidebar.main': 'MAIN',
    'sidebar.others': 'OTHERS',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.customers': 'Customers',
    'sidebar.sales': 'Sales',
    'sidebar.expenses': 'Expenses',
    'sidebar.contracts': 'Contracts',
    'sidebar.projects': 'Projects',
    'sidebar.tasks': 'Tasks',
    'sidebar.leads': 'Leads',
    'sidebar.support': 'Support',
    'sidebar.settings': 'Settings',
    'sidebar.upgrade.title': 'Hey buddy,',
    'sidebar.upgrade.description': 'You have 10 days left in your trial period.',
    'sidebar.upgrade.button': 'Upgrade plan',
    'dashboard.title': 'Dashboard',
    'dashboard.leads.new': 'New',
    'dashboard.leads.contacted': 'Contacted',
    'dashboard.leads.qualified': 'Qualified',
    'dashboard.leads.working': 'Working',
    'kpi.total.customers': 'Total Customers',
    'kpi.active.customers': 'Active Customers',
    'kpi.inactive.customers': 'Inactive Customers',
    'kpi.contacts.today': 'Contacts Log In Today',
    'kpi.total.expenses': 'Total Expenses',
    'kpi.billable.expenses': 'Billable Expenses',
    'kpi.non.billable': 'Non Billable',
    'kpi.not.invoiced': 'Not Invoiced',
    'invoice.paid': 'Paid',
    'invoice.partially': 'Partially',
    'invoice.overdue': 'Overdue',
    'invoice.draft': 'Draft',
    'leads.title': 'Leads',
    'customers.title': 'Customers',
    'expenses.title': 'Expenses',
    'invoices.title': 'Invoices',
    'button.new.lead': 'New Lead',
    'button.new.customer': 'New Customer',
    'button.new.invoice': 'New Invoice',
    'button.import.leads': 'Import Leads',
    'button.import.customers': 'Import Customers',
    'button.record.expenses': 'Record Expenses',
    'button.batch.payment': 'Batch Payment',
  },
  ar: {
    'search.placeholder': 'بحث...',
    'user.name': 'واشم',
    'sidebar.main': 'الرئيسية',
    'sidebar.others': 'أخرى',
    'sidebar.dashboard': 'لوحة التحكم',
    'sidebar.customers': 'العملاء',
    'sidebar.sales': 'المبيعات',
    'sidebar.expenses': 'المصروفات',
    'sidebar.contracts': 'العقود',
    'sidebar.projects': 'المشاريع',
    'sidebar.tasks': 'المهام',
    'sidebar.leads': 'العملاء المحتملون',
    'sidebar.support': 'الدعم',
    'sidebar.settings': 'الإعدادات',
    'sidebar.upgrade.title': 'مرحبا صديقي،',
    'sidebar.upgrade.description': 'لديك 10 أيام متبقية في فترة التجربة.',
    'sidebar.upgrade.button': 'ترقية الخطة',
    'dashboard.title': 'لوحة التحكم',
    'dashboard.leads.new': 'جديد',
    'dashboard.leads.contacted': 'تم التواصل',
    'dashboard.leads.qualified': 'مؤهل',
    'dashboard.leads.working': 'قيد العمل',
    'kpi.total.customers': 'إجمالي العملاء',
    'kpi.active.customers': 'العملاء النشطون',
    'kpi.inactive.customers': 'العملاء غير النشطين',
    'kpi.contacts.today': 'جهات الاتصال اليوم',
    'kpi.total.expenses': 'إجمالي المصروفات',
    'kpi.billable.expenses': 'المصروفات القابلة للفوترة',
    'kpi.non.billable': 'غير قابل للفوترة',
    'kpi.not.invoiced': 'غير مفوتر',
    'invoice.paid': 'مدفوع',
    'invoice.partially': 'مدفوع جزئياً',
    'invoice.overdue': 'متأخر',
    'invoice.draft': 'مسودة',
    'leads.title': 'العملاء المحتملون',
    'customers.title': 'العملاء',
    'expenses.title': 'المصروفات',
    'invoices.title': 'الفواتير',
    'button.new.lead': 'عميل محتمل جديد',
    'button.new.customer': 'عميل جديد',
    'button.new.invoice': 'فاتورة جديدة',
    'button.import.leads': 'استيراد العملاء المحتملين',
    'button.import.customers': 'استيراد العملاء',
    'button.record.expenses': 'تسجيل المصروفات',
    'button.batch.payment': 'دفعة مجمعة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
