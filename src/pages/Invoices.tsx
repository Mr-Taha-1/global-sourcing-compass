
import React from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/tables/DataTable';
import { StatusBadge } from '@/components/ui/badges/StatusBadge';
import { useLanguage } from '@/hooks/useLanguage';

export default function Invoices() {
  const { t, isRTL } = useLanguage();

  const invoicesData = [
    {
      invoice: '#CIV-012001',
      customer: 'Mikel',
      email: 'mikel@gmail.com',
      createDate: 'Apr 05 - Apr 10, 2025',
      amount: '$1,234.00',
      totalTax: '$45.00',
      tags: ['bug', 'review'],
    },
    {
      invoice: '#CIV-012002',
      customer: 'David',
      email: 'david@gmail.com',
      createDate: 'Apr 07 - Apr 12, 2025',
      amount: '$2,432.00',
      totalTax: '$45.00',
      tags: ['branding', 'todo'],
    },
    {
      invoice: '#CIV-012003',
      customer: 'Smith',
      email: 'smith@gmail.com',
      createDate: 'Apr 10 - Apr 17, 2025',
      amount: '$1,102.00',
      totalTax: '$10.00',
      tags: ['follow up', 'logo'],
    },
  ];

  const columns = [
    {
      key: 'invoice',
      title: 'Invoice',
    },
    {
      key: 'customer',
      title: 'Customer',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'createDate',
      title: 'Create & End Date',
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (value: string) => (
        <span className="font-medium text-green-600">{value}</span>
      ),
    },
    {
      key: 'totalTax',
      title: 'Total Tax',
    },
    {
      key: 'tags',
      title: 'Tags',
      render: (value: string[]) => (
        <div className={`flex gap-1 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          {value.map((tag, index) => (
            <StatusBadge key={index} status={tag} variant="info" />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('invoices.title')}</h1>
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" size="sm">
            {t('button.batch.payment')}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t('button.new.invoice')}
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('invoice.paid')}</p>
              <p className="text-2xl font-bold">02/02</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('invoice.partially')}</p>
              <p className="text-2xl font-bold">01/01</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏰</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('invoice.overdue')}</p>
              <p className="text-2xl font-bold">00/04</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('invoice.draft')}</p>
              <p className="text-2xl font-bold">00/06</p>
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
              placeholder="Search Invoices"
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
      <DataTable columns={columns} data={invoicesData} />
    </div>
  );
}
