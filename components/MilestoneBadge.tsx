/**
 * Milestone Badge Component
 * Round 2 Build 2B: Milestone Verification Display
 * 
 * Displays verified compliance milestones on carrier profile
 * Following Portal Brief: "Clean institutional badges - dark background, gold border, milestone name, verified date"
 * NO points, NO score, NO level, NO leaderboards
 */

import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import type { MilestoneVerification } from '../types/cohort';

interface MilestoneBadgeProps {
  milestone: MilestoneVerification;
  size?: 'small' | 'medium' | 'large';
}

export const MilestoneBadge: React.FC<MilestoneBadgeProps> = ({ 
  milestone,
  size = 'medium'
}) => {
  const sizeConfig = {
    small: {
      container: 'p-3',
      icon: 16,
      title: 'text-xs',
      date: 'text-[10px]'
    },
    medium: {
      container: 'p-4',
      icon: 20,
      title: 'text-sm',
      date: 'text-xs'
    },
    large: {
      container: 'p-6',
      icon: 24,
      title: 'text-base',
      date: 'text-sm'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`bg-slate-900 border-2 border-signal-gold rounded-xl ${config.container} flex items-start space-x-3`}>
      <div className="flex-shrink-0">
        <Shield size={config.icon} className="text-signal-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-black uppercase tracking-tight text-white ${config.title} mb-1`}>
          {milestone.milestoneName}
        </h4>
        <div className="flex items-center space-x-2">
          <CheckCircle size={12} className="text-green-500" />
          <p className={`text-slate-400 uppercase tracking-wider ${config.date}`}>
            Verified {new Date(milestone.verifiedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

interface MilestoneGridProps {
  milestones: MilestoneVerification[];
}

export const MilestoneGrid: React.FC<MilestoneGridProps> = ({ milestones }) => {
  // Define the 5 Phase 1 milestones from Portal Brief
  const phase1Milestones = [
    'REACH Assessment Complete',
    'Ground 0 Orientation Verified',
    'DQ File Architecture Verified',
    'Drug & Alcohol Program Verified',
    'Audit Readiness Verified'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black uppercase tracking-tight text-text-primary">
          Verified Milestones
        </h3>
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <span className="text-xs font-black uppercase tracking-wider text-text-muted">
            {milestones.length} / {phase1Milestones.length} Complete
          </span>
        </div>
      </div>

      {milestones.length === 0 ? (
        <div className="text-center py-12 px-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-border-dark rounded-2xl">
          <Shield size={48} className="text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <p className="text-sm font-bold text-text-muted">
            No milestones verified yet
          </p>
          <p className="text-xs text-text-muted mt-2">
            Complete implementation tasks to earn milestone verifications
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((milestone) => (
            <MilestoneBadge 
              key={milestone.milestoneId} 
              milestone={milestone}
              size="medium"
            />
          ))}
        </div>
      )}

      {/* Institutional note - no comparison between carriers */}
      <div className="pt-4 border-t border-slate-200 dark:border-border-dark">
        <p className="text-xs text-text-muted italic">
          Each carrier is measured against the LaunchPath Standard — not against other carriers.
        </p>
      </div>
    </div>
  );
};
