
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation & Common
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
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.leads.new': 'New',
    'dashboard.leads.contacted': 'Contacted',
    'dashboard.leads.qualified': 'Qualified',
    'dashboard.leads.working': 'Working',
    'dashboard.recent.leads': 'Recent Leads',
    'dashboard.recent.customers': 'Recent Customers',
    'dashboard.recent.tasks': 'Recent Tasks',
    'dashboard.analytics': 'Analytics Overview',
    
    // KPIs
    'kpi.total.customers': 'Total Customers',
    'kpi.active.customers': 'Active Customers',
    'kpi.inactive.customers': 'Inactive Customers',
    'kpi.contacts.today': 'Contacts Log In Today',
    'kpi.total.expenses': 'Total Expenses',
    'kpi.billable.expenses': 'Billable Expenses',
    'kpi.non.billable': 'Non Billable',
    'kpi.not.invoiced': 'Not Invoiced',
    'kpi.total.revenue': 'Total Revenue',
    'kpi.monthly.growth': 'Monthly Growth',
    'kpi.conversion.rate': 'Conversion Rate',
    'kpi.avg.deal.size': 'Avg Deal Size',
    
    // Status & Invoices
    'invoice.paid': 'Paid',
    'invoice.partially': 'Partially Paid',
    'invoice.overdue': 'Overdue',
    'invoice.draft': 'Draft',
    'invoice.pending': 'Pending',
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.pending': 'Pending',
    'status.completed': 'Completed',
    'status.cancelled': 'Cancelled',
    
    // Pages
    'leads.title': 'Leads Management',
    'customers.title': 'Customer Management',
    'expenses.title': 'Expense Tracking',
    'invoices.title': 'Invoice Management',
    'tasks.title': 'Task Management',
    'projects.title': 'Project Management',
    'contracts.title': 'Contract Management',
    'sales.title': 'Sales Pipeline',
    
    // Actions & Buttons
    'button.new.lead': 'New Lead',
    'button.new.customer': 'New Customer',
    'button.new.invoice': 'New Invoice',
    'button.new.task': 'New Task',
    'button.new.project': 'New Project',
    'button.import.leads': 'Import Leads',
    'button.import.customers': 'Import Customers',
    'button.record.expenses': 'Record Expenses',
    'button.batch.payment': 'Batch Payment',
    'button.export': 'Export',
    'button.filter': 'Filter',
    'button.sort': 'Sort',
    'button.view.details': 'View Details',
    'button.edit': 'Edit',
    'button.delete': 'Delete',
    'button.save': 'Save',
    'button.cancel': 'Cancel',
    
    // Form Fields
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.company': 'Company',
    'form.position': 'Position',
    'form.address': 'Address',
    'form.city': 'City',
    'form.country': 'Country',
    'form.amount': 'Amount',
    'form.date': 'Date',
    'form.description': 'Description',
    'form.priority': 'Priority',
    'form.assignee': 'Assignee',
    'form.due.date': 'Due Date',
    'form.progress': 'Progress',
    
    // Table Headers
    'table.name': 'Name',
    'table.email': 'Email',
    'table.phone': 'Phone',
    'table.company': 'Company',
    'table.status': 'Status',
    'table.amount': 'Amount',
    'table.date': 'Date',
    'table.actions': 'Actions',
    'table.project': 'Project',
    'table.priority': 'Priority',
    'table.assignee': 'Assignee',
    'table.progress': 'Progress',
    'table.source': 'Source',
    'table.location': 'Location',
  },
  ar: {
    // Navigation & Common
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
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.leads.new': 'جديد',
    'dashboard.leads.contacted': 'تم التواصل',
    'dashboard.leads.qualified': 'مؤهل',
    'dashboard.leads.working': 'قيد العمل',
    'dashboard.recent.leads': 'العملاء المحتملون الحديثون',
    'dashboard.recent.customers': 'العملاء الجدد',
    'dashboard.recent.tasks': 'المهام الحديثة',
    'dashboard.analytics': 'نظرة عامة على التحليلات',
    
    // KPIs
    'kpi.total.customers': 'إجمالي العملاء',
    'kpi.active.customers': 'العملاء النشطون',
    'kpi.inactive.customers': 'العملاء غير النشطين',
    'kpi.contacts.today': 'جهات الاتصال اليوم',
    'kpi.total.expenses': 'إجمالي المصروفات',
    'kpi.billable.expenses': 'المصروفات القابلة للفوترة',
    'kpi.non.billable': 'غير قابل للفوترة',
    'kpi.not.invoiced': 'غير مفوتر',
    'kpi.total.revenue': 'إجمالي الإيرادات',
    'kpi.monthly.growth': 'النمو الشهري',
    'kpi.conversion.rate': 'معدل التحويل',
    'kpi.avg.deal.size': 'متوسط حجم الصفقة',
    
    // Status & Invoices
    'invoice.paid': 'مدفوع',
    'invoice.partially': 'مدفوع جزئياً',
    'invoice.overdue': 'متأخر',
    'invoice.draft': 'مسودة',
    'invoice.pending': 'معلق',
    'status.active': 'نشط',
    'status.inactive': 'غير نشط',
    'status.pending': 'معلق',
    'status.completed': 'مكتمل',
    'status.cancelled': 'ملغي',
    
    // Pages
    'leads.title': 'إدارة العملاء المحتملين',
    'customers.title': 'إدارة العملاء',
    'expenses.title': 'تتبع المصروفات',
    'invoices.title': 'إدارة الفواتير',
    'tasks.title': 'إدارة المهام',
    'projects.title': 'إدارة المشاريع',
    'contracts.title': 'إدارة العقود',
    'sales.title': 'خط أنابيب المبيعات',
    
    // Actions & Buttons
    'button.new.lead': 'عميل محتمل جديد',
    'button.new.customer': 'عميل جديد',
    'button.new.invoice': 'فاتورة جديدة',
    'button.new.task': 'مهمة جديدة',
    'button.new.project': 'مشروع جديد',
    'button.import.leads': 'استيراد العملاء المحتملين',
    'button.import.customers': 'استيراد العملاء',
    'button.record.expenses': 'تسجيل المصروفات',
    'button.batch.payment': 'دفعة مجمعة',
    'button.export': 'تصدير',
    'button.filter': 'تصفية',
    'button.sort': 'ترتيب',
    'button.view.details': 'عرض التفاصيل',
    'button.edit': 'تعديل',
    'button.delete': 'حذف',
    'button.save': 'حفظ',
    'button.cancel': 'إلغاء',
    
    // Form Fields
    'form.name': 'الاسم',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'الهاتف',
    'form.company': 'الشركة',
    'form.position': 'المنصب',
    'form.address': 'العنوان',
    'form.city': 'المدينة',
    'form.country': 'البلد',
    'form.amount': 'المبلغ',
    'form.date': 'التاريخ',
    'form.description': 'الوصف',
    'form.priority': 'الأولوية',
    'form.assignee': 'المكلف',
    'form.due.date': 'تاريخ الاستحقاق',
    'form.progress': 'التقدم',
    
    // Table Headers
    'table.name': 'الاسم',
    'table.email': 'البريد الإلكتروني',
    'table.phone': 'الهاتف',
    'table.company': 'الشركة',
    'table.status': 'الحالة',
    'table.amount': 'المبلغ',
    'table.date': 'التاريخ',
    'table.actions': 'الإجراءات',
    'table.project': 'المشروع',
    'table.priority': 'الأولوية',
    'table.assignee': 'المكلف',
    'table.progress': 'التقدم',
    'table.source': 'المصدر',
    'table.location': 'الموقع',
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
      <div className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
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
