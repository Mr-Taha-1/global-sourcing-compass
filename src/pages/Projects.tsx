
import React, { useState } from 'react';
import { 
  FolderOpen, 
  Calendar, 
  Users, 
  DollarSign,
  Plus,
  Filter,
  Download,
  Search,
  Clock,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  Eye,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KPICard } from '@/components/ui/cards/KPICard';
import { DataTable } from '@/components/ui/tables/DataTable';
import { StatusBadge } from '@/components/ui/badges/StatusBadge';
import { useLanguage } from '@/hooks/useLanguage';
import { AddProjectModal } from '@/components/modals/AddProjectModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
  startDate: string;
  deadline: string;
  progress: number;
  budget: number;
  spent: number;
  team: string[];
  billingType: string;
  estimatedHours: number;
  actualHours: number;
}

export default function Projects() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const projectsData: Project[] = [
    {
      id: '1',
      name: 'Website Redesign',
      client: 'TechCorp Solutions',
      status: 'In Progress',
      startDate: '2024-01-01',
      deadline: '2024-03-15',
      progress: 65,
      budget: 25000,
      spent: 16250,
      team: ['John Smith', 'Sarah Johnson', 'Mike Chen'],
      billingType: 'Fixed Price',
      estimatedHours: 300,
      actualHours: 195
    },
    {
      id: '2',
      name: 'Mobile App Development',
      client: 'InnovateTech Inc',
      status: 'Planning',
      startDate: '2024-02-01',
      deadline: '2024-06-30',
      progress: 15,
      budget: 50000,
      spent: 7500,
      team: ['Emily Davis', 'Alex Rodriguez'],
      billingType: 'Hourly',
      estimatedHours: 600,
      actualHours: 89
    },
    {
      id: '3',
      name: 'E-commerce Platform',
      client: 'GreenTech Solutions',
      status: 'Completed',
      startDate: '2023-09-01',
      deadline: '2023-12-31',
      progress: 100,
      budget: 35000,
      spent: 34200,
      team: ['Mike Chen', 'John Smith', 'Sarah Johnson', 'Emily Davis'],
      billingType: 'Fixed Price',
      estimatedHours: 450,
      actualHours: 467
    },
    {
      id: '4',
      name: 'CRM Integration',
      client: 'FutureWare Systems',
      status: 'On Hold',
      startDate: '2024-01-15',
      deadline: '2024-04-30',
      progress: 30,
      budget: 18000,
      spent: 5400,
      team: ['Alex Rodriguez'],
      billingType: 'Hourly',
      estimatedHours: 200,
      actualHours: 62
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Planning': return 'warning';
      case 'On Hold': return 'danger';
      case 'Cancelled': return 'danger';
      default: return 'default';
    }
  };

  const columns = [
    {
      key: 'name',
      title: 'Project Name',
      render: (value: string, row: Project) => (
        <div className={isRTL ? 'text-right' : ''}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.client}</div>
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
      key: 'progress',
      title: 'Progress',
      render: (value: number) => (
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>{value}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      key: 'timeline',
      title: 'Timeline',
      render: (_, row: Project) => (
        <div className="space-y-1">
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">Start: {new Date(row.startDate).toLocaleDateString()}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600">Due: {new Date(row.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'budget',
      title: 'Budget & Spent',
      render: (_, row: Project) => (
        <div className={isRTL ? 'text-right' : ''}>
          <div className="font-medium text-gray-900">${row.budget.toLocaleString()}</div>
          <div className="text-sm text-green-600">${row.spent.toLocaleString()} spent</div>
        </div>
      ),
    },
    {
      key: 'team',
      title: 'Team',
      render: (value: string[]) => (
        <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {value.slice(0, 3).map((member, index) => (
            <div key={index} className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-blue-600">
                {member.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          ))}
          {value.length > 3 && (
            <span className="text-xs text-gray-500 ml-1">+{value.length - 3}</span>
          )}
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

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPI data
  const totalProjects = projectsData.length;
  const activeProjects = projectsData.filter(project => project.status === 'In Progress').length;
  const completedProjects = projectsData.filter(project => project.status === 'Completed').length;
  const totalBudget = projectsData.reduce((sum, project) => sum + project.budget, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            {t('button.export')}
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            {t('button.filter')}
          </Button>
          <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Projects"
          value={totalProjects.toString()}
          icon={FolderOpen}
          color="blue"
        />
        <KPICard
          title="Active Projects"
          value={activeProjects.toString()}
          icon={Clock}
          color="orange"
        />
        <KPICard
          title="Completed"
          value={completedProjects.toString()}
          icon={CheckCircle}
          color="green"
        />
        <KPICard
          title="Total Budget"
          value={`$${Math.round(totalBudget / 1000)}K`}
          icon={DollarSign}
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
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Projects Table */}
      <DataTable columns={columns} data={filteredProjects} />

      {/* Add Project Modal */}
      <AddProjectModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}
