
import React from 'react';
import { Plus, Upload, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/tables/DataTable';
import { StatusBadge } from '@/components/ui/badges/StatusBadge';
import { KPICard } from '@/components/ui/cards/KPICard';
import { useLanguage } from '@/hooks/useLanguage';

export default function Leads() {
  const { t, isRTL } = useLanguage();

  const leadsData = [
    {
      name: 'John Abshire',
      email: 'john.abshire@gmail.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      project: 'Web Design',
      status: 'Proposal Sent',
      source: 'Google',
      assigned: ['N', 'S'],
    },
    {
      name: 'Dary Franecki',
      email: 'dary@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      project: 'App Design',
      status: 'New',
      source: 'Dribble',
      assigned: ['N', 'S'],
    },
    {
      name: 'Tony Stark',
      email: 'tony@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      project: 'Design System',
      status: 'Working',
      source: 'Behance',
      assigned: ['N', 'C'],
    },
    {
      name: 'Henry Cavel',
      email: 'henry@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      project: 'Logo Design',
      status: 'Contacted',
      source: 'Google',
      assigned: ['N', 'S'],
    },
  ];

  const columns = [
    {
      key: 'name',
      title: 'Name',
      render: (value: string, row: any) => (
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-teal-700">{value.charAt(0)}</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
            <div className="text-sm text-gray-500">{row.location}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'project',
      title: 'Project Info',
      render: (value: string) => (
        <StatusBadge status={value} variant="warning" />
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => {
        const variant = 
          value === 'New' ? 'info' : 
          value === 'Working' ? 'warning' : 
          value === 'Contacted' ? 'success' : 'default';
        return <StatusBadge status={value} variant={variant} />;
      },
    },
    {
      key: 'source',
      title: 'Source',
      render: (value: string) => (
        <StatusBadge status={value} />
      ),
    },
    {
      key: 'assigned',
      title: 'Assigned',
      render: (value: string[]) => (
        <div className={`flex gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {value.map((initial, index) => (
            <div key={index} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">{initial}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('leads.title')}</h1>
        <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            {t('button.import.leads')}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t('button.new.lead')}
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold">📋</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('dashboard.leads.new')}</p>
              <p className="text-xl font-bold">08</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-semibold">📞</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('dashboard.leads.contacted')}</p>
              <p className="text-xl font-bold">09</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-semibold">✅</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('dashboard.leads.qualified')}</p>
              <p className="text-xl font-bold">06</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-semibold">⚠️</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">{t('dashboard.leads.working')}</p>
              <p className="text-xl font-bold">10</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-semibold">🚀</span>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">Proposal Sent</p>
              <p className="text-xl font-bold">12</p>
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
              placeholder="Search leads"
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
      <DataTable columns={columns} data={leadsData} />
    </div>
  );
}
