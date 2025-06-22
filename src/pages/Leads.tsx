
import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Plus,
  Filter,
  Download,
  Search,
  Phone,
  Mail,
  MapPin,
  MoreHorizontal,
  Eye
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

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  location: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost';
  value: number;
  lastContact: string;
  assignedTo: string;
}

export default function Leads() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const leadsData: Lead[] = [
    {
      id: '1',
      name: 'John Abshire',
      email: 'john.abshire@gmail.com',
      phone: '(555) 123-4567',
      company: 'TechCorp Solutions',
      position: 'CTO',
      location: 'New York, NY',
      source: 'Google Ads',
      status: 'Qualified',
      value: 50000,
      lastContact: '2024-01-15',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: '2',
      name: 'Dary Franecki',
      email: 'dary@innovatetech.com',
      phone: '(555) 234-5678',
      company: 'InnovateTech',
      position: 'CEO',
      location: 'San Francisco, CA',
      source: 'LinkedIn',
      status: 'Proposal Sent',
      value: 75000,
      lastContact: '2024-01-14',
      assignedTo: 'Mike Chen'
    },
    {
      id: '3',
      name: 'Tony Stark',
      email: 'tony@starkindustries.com',
      phone: '(555) 345-6789',
      company: 'Stark Industries',
      position: 'Founder',
      location: 'Los Angeles, CA',
      source: 'Referral',
      status: 'Negotiation',
      value: 120000,
      lastContact: '2024-01-13',
      assignedTo: 'Emily Davis'
    },
    {
      id: '4',
      name: 'Jane Cooper',
      email: 'jane@greentech.io',
      phone: '(555) 456-7890',
      company: 'GreenTech Solutions',
      position: 'VP Sales',
      location: 'Austin, TX',
      source: 'Website',
      status: 'New',
      value: 30000,
      lastContact: '2024-01-16',
      assignedTo: 'Alex Rodriguez'
    },
    {
      id: '5',
      name: 'Robert Johnson',
      email: 'robert@futureware.com',
      phone: '(555) 567-8901',
      company: 'FutureWare Inc',
      position: 'Director',
      location: 'Chicago, IL',
      source: 'Trade Show',
      status: 'Won',
      value: 95000,
      lastContact: '2024-01-12',
      assignedTo: 'Sarah Johnson'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'info';
      case 'Contacted': return 'warning';
      case 'Qualified': return 'success';
      case 'Proposal Sent': return 'warning';
      case 'Negotiation': return 'info';
      case 'Won': return 'success';
      case 'Lost': return 'danger';
      default: return 'default';
    }
  };

  const columns = [
    {
      key: 'name',
      title: t('table.name'),
      render: (value: string, row: Lead) => (
        <div className={isRTL ? 'text-right' : ''}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.position} at {row.company}</div>
        </div>
      ),
    },
    {
      key: 'contact',
      title: 'Contact Info',
      render: (_, row: Lead) => (
        <div className="space-y-1">
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Mail className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">{row.email}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Phone className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">{row.phone}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">{row.location}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'source',
      title: t('table.source'),
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
      key: 'value',
      title: 'Deal Value',
      render: (value: number) => (
        <div className="font-medium text-gray-900">
          ${value.toLocaleString()}
        </div>
      ),
    },
    {
      key: 'assignedTo',
      title: 'Assigned To',
      render: (value: string) => (
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-blue-600">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="text-sm text-gray-900">{value}</span>
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

  const filteredLeads = leadsData.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPI data
  const totalLeads = leadsData.length;
  const qualifiedLeads = leadsData.filter(lead => ['Qualified', 'Proposal Sent', 'Negotiation', 'Won'].includes(lead.status)).length;
  const wonLeads = leadsData.filter(lead => lead.status === 'Won').length;
  const totalValue = leadsData.reduce((sum, lead) => sum + lead.value, 0);
  const conversionRate = Math.round((wonLeads / totalLeads) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('leads.title')}</h1>
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
            {t('button.new.lead')}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Leads"
          value={totalLeads.toString()}
          icon={Target}
          color="blue"
        />
        <KPICard
          title="Qualified Leads"
          value={qualifiedLeads.toString()}
          icon={TrendingUp}
          color="green"
          change={`${Math.round((qualifiedLeads / totalLeads) * 100)}% of total`}
        />
        <KPICard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={Users}
          color="purple"
        />
        <KPICard
          title="Pipeline Value"
          value={`$${Math.round(totalValue / 1000)}K`}
          icon={DollarSign}
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
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* Leads Table */}
      <DataTable columns={columns} data={filteredLeads} />
    </div>
  );
}
