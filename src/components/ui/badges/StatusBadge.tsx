
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const variants = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

export function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const { t } = useLanguage();
  
  // Map status values to translation keys
  const getTranslationKey = (status: string) => {
    const statusMap: Record<string, string> = {
      'Active': 'status.active',
      'Inactive': 'status.inactive',
      'Pending': 'status.pending',
      'Completed': 'status.completed',
      'Cancelled': 'status.cancelled',
      'Approved': 'status.approved',
      'Rejected': 'status.rejected',
      'Reimbursed': 'status.reimbursed',
      'New': 'status.new',
      'Contacted': 'status.contacted',
      'Qualified': 'status.qualified',
      'Won': 'status.won',
      'Lost': 'status.lost',
      'Negotiation': 'status.negotiation',
      'Proposal Sent': 'status.proposal.sent',
      'Working': 'status.working',
      'Todo': 'status.todo',
      'In Progress': 'status.in.progress',
      'Review': 'status.review',
      'Draft': 'status.draft',
      'Sent': 'status.sent',
      'Paid': 'status.paid',
      'Partially Paid': 'status.partially.paid',
      'Overdue': 'status.overdue',
      'High': 'priority.high',
      'Medium': 'priority.medium',
      'Low': 'priority.low',
      'Billable': 'billable',
      'Non-billable': 'non.billable',
      'Invoiced': 'invoiced',
      'Not invoiced': 'not.invoiced',
      'Yes': 'yes',
      'No': 'no',
    };
    
    return statusMap[status] || status;
  };

  const translatedStatus = getTranslationKey(status) !== status ? t(getTranslationKey(status)) : status;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {translatedStatus}
    </span>
  );
}
