
import React from 'react';
import { Plus, Upload, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/tables/DataTable';
import { StatusBadge } from '@/components/ui/badges/StatusBadge';
import { KPICard } from '@/components/ui/cards/KPICard';
import { useLanguage } from '@/hooks/useLanguage';

export default function Customers() {
  const { t, isRTL } = useLanguage();

  const customersData = [
    {
      name: 'Elon Mask',
      email: 'elon@gmail.com',
      phone: '(207) 444-2901',
      country: 'United State',
      company: 'Starlink',
      status: 'Active',
    },
    {
      name: 'Tony Stark',
      email: 'tony@gmail.com',
      phone: '(207) 234-3214',
      country: 'Australia',
      company: 'Marvel',
      status: 'Inactive',
    },
    {
      name: 'Henry Cavil',
      email: 'henry@gmail.com',
      phone: '44-0343-234',
      country: 'England',
      company: 'BMW',
      status: 'Active',
    },
    {
      name: 'Mike Banner',
      email: 'mike@gmail.com',
      phone: '(223) 323-7743',
      country: 'Canada',
      company: 'MBM',
      status: 'Active',
    },
  ];

  const columns = [
    {
      key: 'name',
      title: 'Customer',
      render: (value: string, row: any) => (
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">{value.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.country}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      title: 'Mobile',
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <StatusBadge 
          status={value} 
          variant={value === 'Active' ? 'success' : 'danger'} 
        />
      ),
    },
    {
      key: 'company',
      title: 'Company',
      render: (value: string) => (
        <StatusBadge status={value} />
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('customers.title')}</h1>
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            {t('button.import.customers')}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t('button.new.customer')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('kpi.total.customers')}</p>
              <p className="text-2xl font-bold">20</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('kpi.active.customers')}</p>
              <p className="text-2xl font-bold">14</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭕</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('kpi.inactive.customers')}</p>
              <p className="text-2xl font-bold">06</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🕐</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('kpi.contacts.today')}</p>
              <p className="text-2xl font-bold">04</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
            <Input
              placeholder="Search Customer"
              className={`${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
            />
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={customersData} />
    </div>
  );
}
