
import React from 'react';
import { Plus, Upload, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/tables/DataTable';
import { StatusBadge } from '@/components/ui/badges/StatusBadge';
import { useLanguage } from '@/hooks/useLanguage';

export default function Expenses() {
  const { t, isRTL } = useLanguage();

  const expensesData = [
    {
      category: 'Parking',
      description: 'I can say, This was such a tiny',
      amount: '$220.00',
      date: '10-04-2025',
      project: 'Build Website',
      customer: 'David',
    },
    {
      category: 'Telephone',
      description: 'He taught us drawling,stretching a...',
      amount: '$986.00',
      date: '12-04-2025',
      project: 'Brand Design',
      customer: 'David',
    },
    {
      category: 'Insurance',
      description: 'March here,who had followed him...',
      amount: '$1,073.10',
      date: '13-04-2025',
      project: 'App Design',
      customer: 'Ernser',
    },
    {
      category: 'Travel Expenses',
      description: 'I did, there no harm in trying so',
      amount: '$936.00',
      date: '14-04-2025',
      project: 'Brand Design',
      customer: 'Ernser',
    },
    {
      category: 'Meals',
      description: "Cat's head began fading away time",
      amount: '$923.00',
      date: '15-04-2025',
      project: 'Build Website',
      customer: 'Ernser',
    },
  ];

  const columns = [
    {
      key: 'category',
      title: 'Category',
    },
    {
      key: 'description',
      title: 'Description',
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (value: string) => (
        <span className="font-medium text-green-600">{value}</span>
      ),
    },
    {
      key: 'date',
      title: 'Date',
    },
    {
      key: 'project',
      title: 'Project',
      render: (value: string) => (
        <StatusBadge status={value} variant="success" />
      ),
    },
    {
      key: 'customer',
      title: 'Customer',
      render: (value: string) => (
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium">{value.charAt(0)}</span>
          </div>
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('expenses.title')}</h1>
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Expenses
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t('button.record.expenses')}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('kpi.total.expenses')}</p>
              <p className="text-2xl font-bold">$4,200.24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">Billable</p>
              <p className="text-2xl font-bold">$2,356.90</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('kpi.non.billable')}</p>
              <p className="text-2xl font-bold">$1,244.34</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('kpi.not.invoiced')}</p>
              <p className="text-2xl font-bold">$355.90</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💸</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">Billed</p>
              <p className="text-2xl font-bold">$0.00</p>
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
              placeholder="Search..."
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
      <DataTable columns={columns} data={expensesData} />
    </div>
  );
}
