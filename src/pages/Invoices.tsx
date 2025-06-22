
import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Plus,
  Filter,
  Download,
  Search,
  Calendar,
  MoreHorizontal,
  Eye,
  Send,
  CheckCircle
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

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Partially Paid' | 'Overdue';
  project: string;
  paymentTerms: string;
  description: string;
}

export default function Invoices() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const invoicesData: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      client: 'TechCorp Solutions',
      amount: 15000,
      issueDate: '2024-01-01',
      dueDate: '2024-01-31',
      status: 'Paid',
      project: 'Website Redesign',
      paymentTerms: 'Net 30',
      description: 'Web development services for Q1 2024'
    },
    {
      id: '2',
      number: 'INV-2024-002',
      client: 'InnovateTech Inc',
      amount: 22500,
      issueDate: '2024-01-05',
      dueDate: '2024-02-04',
      status: 'Sent',
      project: 'Mobile App Development',
      paymentTerms: 'Net 30',
      description: 'Mobile application development phase 1'
    },
    {
      id: '3',
      number: 'INV-2024-003',
      client: 'GreenTech Solutions',
      amount: 8750,
      issueDate: '2024-01-10',
      dueDate: '2024-01-25',
      status: 'Overdue',
      project: 'E-commerce Platform',
      paymentTerms: 'Net 15',
      description: 'E-commerce platform setup and configuration'
    },
    {
      id: '4',
      number: 'INV-2024-004',
      client: 'FutureWare Systems',
      amount: 12000,
      issueDate: '2024-01-12',
      dueDate: '2024-02-11',
      status: 'Partially Paid',
      project: 'Database Migration',
      paymentTerms: 'Net 30',
      description: 'Database migration and optimization services'
    },
    {
      id: '5',
      number: 'INV-2024-005',
      client: 'DataTech Analytics',
      amount: 18500,
      issueDate: '2024-01-15',
      dueDate: '2024-02-14',
      status: 'Draft',
      project: 'Analytics Dashboard',
      paymentTerms: 'Net 30',
      description: 'Custom analytics dashboard development'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Sent': return 'info';
      case 'Partially Paid': return 'warning';
      case 'Overdue': return 'danger';
      case 'Draft': return 'default';
      default: return 'default';
    }
  };

  const columns = [
    {
      key: 'number',
      title: 'Invoice #',
      render: (value: string, row: Invoice) => (
        <div className={isRTL ? 'text-right' : ''}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.client}</div>
        </div>
      ),
    },
    {
      key: 'project',
      title: t('table.project'),
      render: (value: string, row: Invoice) => (
        <div className={isRTL ? 'text-right' : ''}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">{row.description}</div>
        </div>
      ),
    },
    {
      key: 'amount',
      title: t('table.amount'),
      render: (value: number) => (
        <div className="font-medium text-gray-900">
          ${value.toLocaleString()}
        </div>
      ),
    },
    {
      key: 'dates',
      title: 'Issue / Due Date',
      render: (_, row: Invoice) => (
        <div className="space-y-1">
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900">Issued: {new Date(row.issueDate).toLocaleDateString()}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">Due: {new Date(row.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
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
      key: 'paymentTerms',
      title: 'Payment Terms',
      render: (value: string) => (
        <StatusBadge status={value} variant="info" />
      ),
    },
    {
      key: 'actions',
      title: t('table.actions'),
      render: (_, row: Invoice) => (
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
            {row.status === 'Draft' && (
              <DropdownMenuItem>
                <Send className="w-4 h-4 mr-2" />
                Send Invoice
              </DropdownMenuItem>
            )}
            {row.status !== 'Paid' && (
              <DropdownMenuItem>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Paid
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>{t('button.edit')}</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">{t('button.delete')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filteredInvoices = invoicesData.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPI data
  const totalInvoices = invoicesData.length;
  const paidInvoices = invoicesData.filter(invoice => invoice.status === 'Paid');
  const overdueInvoices = invoicesData.filter(invoice => invoice.status === 'Overdue');
  const draftInvoices = invoicesData.filter(invoice => invoice.status === 'Draft');
  const totalAmount = invoicesData.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = overdueInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('invoices.title')}</h1>
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
            {t('button.new.invoice')}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Invoices"
          value={totalInvoices.toString()}
          icon={FileText}
          color="blue"
        />
        <KPICard
          title={t('invoice.paid')}
          value={`${paidInvoices.length} ($${Math.round(paidAmount / 1000)}K)`}
          icon={CheckCircle}
          color="green"
        />
        <KPICard
          title={t('invoice.overdue')}
          value={`${overdueInvoices.length} ($${Math.round(overdueAmount / 1000)}K)`}
          icon={AlertTriangle}
          color="red"
        />
        <KPICard
          title={t('invoice.draft')}
          value={draftInvoices.length.toString()}
          icon={Clock}
          color="orange"
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
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Paid">Paid</option>
          <option value="Partially Paid">Partially Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Invoices Table */}
      <DataTable columns={columns} data={filteredInvoices} />
    </div>
  );
}
