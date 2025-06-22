
import React from 'react';
import { Users, CheckCircle, Clock, AlertCircle, DollarSign, FileText, TrendingUp, Target } from 'lucide-react';
import { KPICard } from '@/components/ui/cards/KPICard';
import { DataTable } from '@/components/ui/tables/DataTable';
import { StatusBadge } from '@/components/ui/badges/StatusBadge';
import { useLanguage } from '@/hooks/useLanguage';

export default function Dashboard() {
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
    },
    {
      name: 'Dary Franecki',
      email: 'dary@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      project: 'App Design',
      status: 'New',
      source: 'Dribble',
    },
    {
      name: 'Tony Stark',
      email: 'tony@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      project: 'Design System',
      status: 'Working',
      source: 'Behance',
    },
  ];

  const leadsColumns = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'email',
      title: 'Email',
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
        const variant = value === 'New' ? 'info' : value === 'Working' ? 'warning' : 'success';
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
  ];

  return (
    <div className="p-6 space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
      </div>

      {/* Leads Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t('dashboard.leads.new')}
          value="08"
          icon={Target}
          color="blue"
        />
        <KPICard
          title={t('dashboard.leads.contacted')}
          value="09"
          icon={CheckCircle}
          color="green"
        />
        <KPICard
          title={t('dashboard.leads.qualified')}
          value="06"
          icon={TrendingUp}
          color="purple"
        />
        <KPICard
          title={t('dashboard.leads.working')}
          value="10"
          icon={Clock}
          color="orange"
        />
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t('kpi.total.customers')}
          value="20"
          icon={Users}
          color="blue"
        />
        <KPICard
          title={t('kpi.active.customers')}
          value="14"
          icon={CheckCircle}
          color="green"
        />
        <KPICard
          title={t('kpi.inactive.customers')}
          value="06"
          icon={AlertCircle}
          color="red"
        />
        <KPICard
          title={t('kpi.contacts.today')}
          value="04"
          icon={Clock}
          color="orange"
        />
      </div>

      {/* Expense Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          title={t('kpi.total.expenses')}
          value="$4,200.24"
          icon={DollarSign}
          color="blue"
        />
        <KPICard
          title={t('kpi.billable.expenses')}
          value="$2,356.90"
          icon={FileText}
          color="green"
        />
        <KPICard
          title={t('kpi.non.billable')}
          value="$1,244.34"
          icon={AlertCircle}
          color="orange"
        />
        <KPICard
          title={t('kpi.not.invoiced')}
          value="$355.90"
          icon={Clock}
          color="purple"
        />
        <KPICard
          title="Billed"
          value="$0.00"
          icon={CheckCircle}
          color="red"
        />
      </div>

      {/* Recent Leads */}
      <div>
        <h2 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : ''}`}>
          Recent Leads
        </h2>
        <DataTable columns={leadsColumns} data={leadsData} />
      </div>
    </div>
  );
}
