
import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp,
  Plus,
  Filter,
  Download,
  Search,
  Phone,
  Mail,
  MapPin,
  Building,
  MoreHorizontal,
  Eye,
  Calendar
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

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  lastActivity: string;
  totalOrders: number;
  totalSpent: number;
  assignedTo: string;
}

export default function Customers() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const customersData: Customer[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@techcorp.com',
      phone: '(555) 123-4567',
      company: 'TechCorp Inc.',
      position: 'IT Director',
      location: 'New York, NY',
      status: 'Active',
      joinDate: '2023-06-15',
      lastActivity: '2024-01-15',
      totalOrders: 12,
      totalSpent: 85000,
      assignedTo: 'Sarah Johnson'
    },
    {
      id: '2',
      name: 'Robert Smith',
      email: 'robert@innovatetech.com',
      phone: '(555) 234-5678',
      company: 'InnovateTech Solutions',
      position: 'CTO',
      location: 'San Francisco, CA',
      status: 'Active',
      joinDate: '2023-03-22',
      lastActivity: '2024-01-14',
      totalOrders: 8,
      totalSpent: 120000,
      assignedTo: 'Mike Chen'
    },
    {
      id: '3',
      name: 'Maria Garcia',
      email: 'maria@greentech.io',
      phone: '(555) 345-6789',
      company: 'GreenTech Solutions',
      position: 'Operations Manager',
      location: 'Austin, TX',
      status: 'Pending',
      joinDate: '2024-01-10',
      lastActivity: '2024-01-13',
      totalOrders: 2,
      totalSpent: 15000,
      assignedTo: 'Emily Davis'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david@futureware.com',
      phone: '(555) 456-7890',
      company: 'FutureWare Systems',
      position: 'VP Engineering',
      location: 'Seattle, WA',
      status: 'Active',
      joinDate: '2023-08-10',
      lastActivity: '2024-01-12',
      totalOrders: 15,
      totalSpent: 95000,
      assignedTo: 'Alex Rodriguez'
    },
    {
      id: '5',
      name: 'Jennifer Brown',
      email: 'jennifer@datatech.net',
      phone: '(555) 567-8901',
      company: 'DataTech Analytics',
      position: 'Data Scientist',
      location: 'Boston, MA',
      status: 'Inactive',
      joinDate: '2023-01-20',
      lastActivity: '2023-12-01',
      totalOrders: 5,
      totalSpent: 45000,
      assignedTo: 'Sarah Johnson'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'danger';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  const columns = [
    {
      key: 'name',
      title: t('table.name'),
      render: (value: string, row: Customer) => (
        <div className={isRTL ? 'text-right' : ''}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.position}</div>
        </div>
      ),
    },
    {
      key: 'company',
      title: t('table.company'),
      render: (value: string, row: Customer) => (
        <div className="space-y-1">
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Building className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">{value}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">{row.location}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      title: 'Contact Info',
      render: (_, row: Customer) => (
        <div className="space-y-1">
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Mail className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">{row.email}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Phone className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">{row.phone}</span>
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
      key: 'orders',
      title: 'Orders & Spent',
      render: (_, row: Customer) => (
        <div className={isRTL ? 'text-right' : ''}>
          <div className="font-medium text-gray-900">{row.totalOrders} orders</div>
          <div className="text-sm text-green-600">${row.totalSpent.toLocaleString()}</div>
        </div>
      ),
    },
    {
      key: 'lastActivity',
      title: 'Last Activity',
      render: (value: string) => (
        <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Calendar className="w-4 h-4" />
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'assignedTo',
      title: 'Account Manager',
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

  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPI data
  const totalCustomers = customersData.length;
  const activeCustomers = customersData.filter(customer => customer.status === 'Active').length;
  const inactiveCustomers = customersData.filter(customer => customer.status === 'Inactive').length;
  const totalRevenue = customersData.reduce((sum, customer) => sum + customer.totalSpent, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('customers.title')}</h1>
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
            {t('button.new.customer')}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t('kpi.total.customers')}
          value={totalCustomers.toString()}
          icon={Users}
          color="blue"
        />
        <KPICard
          title={t('kpi.active.customers')}
          value={activeCustomers.toString()}
          icon={UserCheck}
          color="green"
          change={`${Math.round((activeCustomers / totalCustomers) * 100)}% active rate`}
        />
        <KPICard
          title={t('kpi.inactive.customers')}
          value={inactiveCustomers.toString()}
          icon={UserX}
          color="red"
        />
        <KPICard
          title="Total Revenue"
          value={`$${Math.round(totalRevenue / 1000)}K`}
          icon={TrendingUp}
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
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Customers Table */}
      <DataTable columns={columns} data={filteredCustomers} />
    </div>
  );
}
