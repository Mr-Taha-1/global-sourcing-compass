
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, X, User } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const { isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('project');
  const [formData, setFormData] = useState({
    projectName: '',
    customer: '',
    billingType: 'Project hours',
    status: 'In Progress',
    estimatedHours: '',
    startDate: '',
    deadline: '',
    ratePerHour: '',
    description: '',
    members: [] as string[],
    tags: [] as string[],
    sendEmail: false
  });

  const [selectedMembers] = useState(['David', 'Smith', 'Henry']);
  const [selectedTags] = useState(['Wordpress']);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Project data:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add New Project</DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('project')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'project'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Project
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Project Settings
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'project' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-sm font-medium">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder="Build Website"
                  className={isRTL ? 'text-right' : ''}
                />
              </div>

              {/* Customer */}
              <div className="space-y-2">
                <Label htmlFor="customer" className="text-sm font-medium">
                  Customer <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="customer"
                    value={formData.customer}
                    onChange={(e) => handleInputChange('customer', e.target.value)}
                    placeholder="David Smith"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Billing Type */}
              <div className="space-y-2">
                <Label htmlFor="billingType" className="text-sm font-medium">
                  Billing Type
                </Label>
                <select
                  id="billingType"
                  value={formData.billingType}
                  onChange={(e) => handleInputChange('billingType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Project hours">Project hours</option>
                  <option value="Fixed Price">Fixed Price</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium">
                  Status
                </Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Planning">Planning</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Estimated Hours */}
              <div className="space-y-2">
                <Label htmlFor="estimatedHours" className="text-sm font-medium">
                  Estimated Hours
                </Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => handleInputChange('estimatedHours', e.target.value)}
                  placeholder="300"
                />
              </div>

              {/* Members */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Members</Label>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[42px]">
                  {selectedMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
                    >
                      <User className="w-3 h-3" />
                      {member}
                      <X className="w-3 h-3 cursor-pointer hover:text-blue-900" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </Label>
                <div className="relative">
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-sm font-medium">
                  Deadline
                </Label>
                <div className="relative">
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Rate Per Hour */}
              <div className="space-y-2">
                <Label htmlFor="ratePerHour" className="text-sm font-medium">
                  Rate Per Hour
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                    $
                  </span>
                  <Input
                    id="ratePerHour"
                    type="number"
                    value={formData.ratePerHour}
                    onChange={(e) => handleInputChange('ratePerHour', e.target.value)}
                    placeholder="60.00"
                    className="rounded-l-none"
                  />
                  <div className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                    🇺🇸 USA
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tags</Label>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[42px]">
                  {selectedTags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                      <X className="w-3 h-3 cursor-pointer hover:text-gray-900" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="col-span-full space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Rabbit whispered in reply, 'for fear they should forget them before the trial's over!' thought Alice. 'I don't see how the game began. Alice thought to herself, for she thought, and rightly too, that very few things."
                  rows={4}
                  className={isRTL ? 'text-right' : ''}
                />
              </div>

              {/* Send Email Checkbox */}
              <div className="col-span-full">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.sendEmail}
                    onChange={(e) => handleInputChange('sendEmail', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Send project created email</span>
                </label>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
