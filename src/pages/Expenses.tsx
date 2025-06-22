
import React, { useState } from 'react';
import { 
  DollarSign, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  Plus,
  Filter,
  Download,
  Search,
  Calendar,
  MoreHorizontal,
  Eye,
  Receipt
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KPICard } from '@/components/ui/cards/KPICard';
import { DataTable } from '@/components/ui/tables/DataTable';
import { StatusBadge } from '@/components/ui/badges/StatusBadge';
import { useLanguage } from '@/hooks/useLanguage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  vendor: string;
  project: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Reimbursed';
  billable: boolean;
  invoiced: boolean;
  submittedBy: string;
  receipt: boolean;
}

export default function Expenses() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const expensesData: Expense[] = [
    {
      id: '1',
      description: 'Client Meeting Lunch',
      category: 'Meals & Entertainment',
      amount: 120.50,
      date: '2024-01-15',
      vendor: 'The Business Bistro',
      project: 'TechCorp Project',
      status: 'Approved',
      billable: true,
      invoiced: false,
      submittedBy: 'John Smith',
      receipt: true
    },
    {
      id: '2',
      description: 'Software License',
      category: 'Software & Tools',
      amount: 299.00,
      date: '2024-01-14',
      vendor: 'Adobe Creative Suite',
      project: 'Website Redesign',
      status: 'Pending',
      billable: true,
      invoiced: false,
      submittedBy: 'Sarah Johnson',
      receipt: true
    },
    {
      id: '3',
      description: 'Travel Expenses',
      category: 'Travel',
      amount: 850.00,
      date: '2024-01-13',
      vendor: 'Delta Airlines',
      project: 'Client Visit',
      status: 'Reimbursed',
      billable: true,
      invoiced: true,
      submittedBy: 'Mike Chen',
      receipt: true
    },
    {
      id: '4',
      description: 'Office Supplies',
      category: 'Office Expenses',
      amount: 45.25,
      date: '2024-01-12',
      vendor: 'Staples',
      project: 'General Office',
      status: 'Approved',
      billable: false,
      invoiced: false,
      submittedBy: 'Emily Davis',
      receipt: false
    },
    {
      id: '5',
      description: 'Conference Registration',
      category: 'Training & Education',
      amount: 599.00,
      date: '2024-01-11',
      vendor: 'TechConf 2024',
      project: 'Professional Development',
      status: 'Rejected',
      billable: false,
      invoiced: false,
      submittedBy: 'Alex Rodriguez',
      receipt: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'danger';
      case 'Reimbursed': return 'info';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = ['info', 'warning', 'success', 'danger'];
    const index = category.length % colors.length;
    return colors[index];
  };

  const columns = [
    {
      key: 'description',
      title: 'Description',
      render: (value: string, row: Expense) => (
        <div className={isRTL ? 'text-right' : ''}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.vendor}</div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      render: (value: string) => (
        <StatusBadge 
          status={value} 
          variant={getCategoryColor(value) as any}
        />
      ),
    },
    {
      key: 'amount',
      title: t('table.amount'),
      render: (value: number) => (
        <div className="font-medium text-gray-900">
          ${value.toFixed(2)}
        </div>
      ),
    },
    {
      key: 'date',
      title: t('table.date'),
      render: (value: string) => (
        <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Calendar className="w-4 h-4" />
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'project',
      title: t('table.project'),
      render: (value: string) => (
        <StatusBadge status={value} variant="info" />
      ),
    },
    {
      key: 'status',
      title: t('table.status'),
      render: (value: string) => (
        <StatusBadge 
          status={value} 
          variant={getStatusColor(value) as any}
        />
      ),
    },
    {
      key: 'billable',
      title: 'Billable/Invoice',
      render: (_, row: Expense) => (
        <div className="space-y-1">
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${row.billable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600">
              {row.billable ? 'Billable' : 'Non-billable'}
            </span>
          </div>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${row.invoiced ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600">
              {row.invoiced ? 'Invoiced' : 'Not invoiced'}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'receipt',
      title: 'Receipt',
      render: (value: boolean) => (
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Receipt className={`w-4 h-4 ${value ? 'text-green-500' : 'text-gray-300'}`} />
          <span className="text-xs text-gray-600">
            {value ? 'Yes' : 'No'}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      title: t('table.actions'),
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={isRTL ? 'text-right' : ''}>
            <DropdownMenuItem>
              <Eye className="w-4 h-4 mr-2" />
              {t('button.view.details')}
            </DropdownMenuItem>
            <DropdownMenuItem>{t('button.edit')}</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">{t('button.delete')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filteredExpenses = expensesData.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || expense.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPI data
  const totalExpenses = expensesData.reduce((sum, expense) => sum + expense.amount, 0);
  const billableExpenses = expensesData.filter(expense => expense.billable).reduce((sum, expense) => sum + expense.amount, 0);
  const nonBillableExpenses = expensesData.filter(expense => !expense.billable).reduce((sum, expense) => sum + expense.amount, 0);
  const notInvoicedExpenses = expensesData.filter(expense => expense.billable && !expense.invoiced).reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('expenses.title')}</h1>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            {t('button.export')}
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            {t('button.filter')}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4" />
            {t('button.record.expenses')}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t('kpi.total.expenses')}
          value={`$${totalExpenses.toFixed(2)}`}
          icon={DollarSign}
          color="blue"
        />
        <KPICard
          title={t('kpi.billable.expenses')}
          value={`$${billableExpenses.toFixed(2)}`}
          icon={FileText}
          color="green"
        />
        <KPICard
          title={t('kpi.non.billable')}
          value={`$${nonBillableExpenses.toFixed(2)}`}
          icon={AlertCircle}
          color="orange"
        />
        <KPICard
          title={t('kpi.not.invoiced')}
          value={`$${notInvoicedExpenses.toFixed(2)}`}
          icon={CheckCircle}
          color="purple"
        />
      </div>

      {/* Search and Filter */}
      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            placeholder={t('search.placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Reimbursed">Reimbursed</option>
        </select>
      </div>

      {/* Expenses Table */}
      <DataTable columns={columns} data={filteredExpenses} />
    </div>
  );
}
