
import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  User, 
  Calendar,
  Filter,
  Plus,
  Search,
  MoreHorizontal,
  AlertCircle,
  Target,
  Zap
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

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Review' | 'Completed';
  dueDate: string;
  project: string;
  progress: number;
}

export default function Tasks() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const tasksData: Task[] = [
    {
      id: '1',
      title: 'Design Landing Page',
      description: 'Create responsive landing page for new product launch',
      assignee: 'John Smith',
      priority: 'High',
      status: 'In Progress',
      dueDate: '2024-01-15',
      project: 'Website Redesign',
      progress: 65
    },
    {
      id: '2',
      title: 'API Integration',
      description: 'Integrate payment gateway with existing system',
      assignee: 'Sarah Johnson',
      priority: 'High',
      status: 'Todo',
      dueDate: '2024-01-20',
      project: 'E-commerce Platform',
      progress: 0
    },
    {
      id: '3',
      title: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      assignee: 'Mike Chen',
      priority: 'Medium',
      status: 'Review',
      dueDate: '2024-01-12',
      project: 'Performance Improvement',
      progress: 90
    },
    {
      id: '4',
      title: 'User Testing',
      description: 'Conduct user testing sessions for mobile app',
      assignee: 'Emily Davis',
      priority: 'Medium',
      status: 'Completed',
      dueDate: '2024-01-10',
      project: 'Mobile App',
      progress: 100
    },
    {
      id: '5',
      title: 'Security Audit',
      description: 'Perform comprehensive security audit',
      assignee: 'Alex Rodriguez',
      priority: 'High',
      status: 'Todo',
      dueDate: '2024-01-25',
      project: 'Security Enhancement',
      progress: 0
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Review': return 'warning';
      case 'Todo': return 'default';
      default: return 'default';
    }
  };

  const columns = [
    {
      key: 'title',
      title: t('table.name'),
      render: (value: string, row: Task) => (
        <div className={isRTL ? 'text-right' : ''}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">{row.description}</div>
        </div>
      ),
    },
    {
      key: 'assignee',
      title: t('table.assignee'),
      render: (value: string) => (
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm text-gray-900">{value}</span>
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
      key: 'priority',
      title: t('table.priority'),
      render: (value: string) => (
        <StatusBadge 
          status={value} 
          variant={getPriorityColor(value) as any}
        />
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
      title: t('table.progress'),
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
      key: 'dueDate',
      title: t('form.due.date'),
      render: (value: string) => (
        <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Calendar className="w-4 h-4" />
          {new Date(value).toLocaleDateString()}
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
            <DropdownMenuItem>{t('button.view.details')}</DropdownMenuItem>
            <DropdownMenuItem>{t('button.edit')}</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">{t('button.delete')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filteredTasks = tasksData.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPI data
  const totalTasks = tasksData.length;
  const completedTasks = tasksData.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasksData.filter(task => task.status === 'In Progress').length;
  const overdueTasks = tasksData.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'Completed').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h1 className="text-2xl font-bold text-gray-900">{t('tasks.title')}</h1>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            {t('button.filter')}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4" />
            {t('button.new.task')}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Tasks"
          value={totalTasks.toString()}
          icon={CheckSquare}
          color="blue"
        />
        <KPICard
          title="Completed"
          value={completedTasks.toString()}
          icon={Target}
          color="green"
          change={`${Math.round((completedTasks / totalTasks) * 100)}% completion rate`}
        />
        <KPICard
          title="In Progress"
          value={inProgressTasks.toString()}
          icon={Clock}
          color="orange"
        />
        <KPICard
          title="Overdue"
          value={overdueTasks.toString()}
          icon={AlertCircle}
          color="red"
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
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Tasks Table */}
      <DataTable columns={columns} data={filteredTasks} />
    </div>
  );
}
