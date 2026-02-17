/**
 * Ground 0 Decision Engine
 * Evaluates user readiness across the Four Pillars and determines GO/WAIT/NO-GO outcome
 */

export interface Ground0Assessment {
  authorityReadiness: number; // 0-100
  insuranceReadiness: number; // 0-100
  complianceReadiness: number; // 0-100
  cashFlowReadiness: number; // 0-100
  capitalAmount: number;
  monthlyOperatingCost: number;
  monthlyReserveMonths: number;
  stopLossCapital: number;
  stopLossMonthlyLoss: number;
  stopLossMonths: number;
}

export interface Ground0Decision {
  outcome: 'GO' | 'WAIT' | 'NO-GO';
  overallScore: number;
  pillarScores: {
    authority: number;
    insurance: number;
    compliance: number;
    cashFlow: number;
  };
  reasoning: string;
  nextSteps: string[];
  recommendations: string[];
}

class Ground0DecisionEngine {
  /**
   * Calculate the overall Ground 0 decision based on user assessment
   */
  static calculateDecision(assessment: Ground0Assessment): Ground0Decision {
    // Calculate individual pillar scores
    const pillarScores = {
      authority: assessment.authorityReadiness,
      insurance: assessment.insuranceReadiness,
      compliance: assessment.complianceReadiness,
      cashFlow: this.calculateCashFlowScore(assessment)
    };

    // Calculate weighted overall score
    const overallScore = (
      pillarScores.authority * 0.25 +
      pillarScores.insurance * 0.25 +
      pillarScores.compliance * 0.25 +
      pillarScores.cashFlow * 0.25
    );

    // Determine outcome based on thresholds and constraints
    const outcome = this.determineOutcome(assessment, pillarScores, overallScore);

    // Generate reasoning and next steps
    const reasoning = this.generateReasoning(outcome, assessment, pillarScores);
    const nextSteps = this.generateNextSteps(outcome, assessment, pillarScores);
    const recommendations = this.generateRecommendations(outcome, assessment, pillarScores);

    return {
      outcome,
      overallScore: Math.round(overallScore),
      pillarScores,
      reasoning,
      nextSteps,
      recommendations
    };
  }

  /**
   * Calculate cash flow readiness score based on capital and operating costs
   */
  private static calculateCashFlowScore(assessment: Ground0Assessment): number {
    let score = assessment.cashFlowReadiness;

    // Penalty if capital is insufficient for 90-day reserves
    const requiredReserves = assessment.monthlyOperatingCost * 3;
    if (assessment.capitalAmount < requiredReserves) {
      score = Math.max(0, score - 30);
    }

    // Penalty if stop-loss capital is too low
    if (assessment.stopLossCapital < assessment.monthlyOperatingCost * 2) {
      score = Math.max(0, score - 20);
    }

    // Bonus if capital exceeds requirements significantly
    if (assessment.capitalAmount > requiredReserves * 1.5) {
      score = Math.min(100, score + 10);
    }

    return score;
  }

  /**
   * Determine GO/WAIT/NO-GO outcome based on assessment
   */
  private static determineOutcome(
    assessment: Ground0Assessment,
    pillarScores: Record<string, number>,
    overallScore: number
  ): 'GO' | 'WAIT' | 'NO-GO' {
    const requiredReserves = assessment.monthlyOperatingCost * 3;

    // NO-GO conditions (hard stops)
    if (assessment.capitalAmount < requiredReserves * 0.5) {
      return 'NO-GO'; // Less than 50% of required reserves
    }
    if (Object.values(pillarScores).some(score => score < 30)) {
      return 'NO-GO'; // Any pillar critically low
    }
    if (assessment.monthlyOperatingCost === 0) {
      return 'NO-GO'; // No operating cost defined
    }

    // GO conditions (all thresholds met)
    if (
      assessment.capitalAmount >= requiredReserves &&
      Object.values(pillarScores).every(score => score >= 70) &&
      overallScore >= 70
    ) {
      return 'GO';
    }

    // WAIT conditions (close but not ready)
    if (
      assessment.capitalAmount >= requiredReserves * 0.75 &&
      Object.values(pillarScores).every(score => score >= 50) &&
      overallScore >= 55
    ) {
      return 'WAIT';
    }

    // Default to NO-GO if conditions not met
    return 'NO-GO';
  }

  /**
   * Generate human-readable reasoning for the decision
   */
  private static generateReasoning(
    outcome: 'GO' | 'WAIT' | 'NO-GO',
    assessment: Ground0Assessment,
    pillarScores: Record<string, number>
  ): string {
    const requiredReserves = assessment.monthlyOperatingCost * 3;
    const actualReserves = assessment.capitalAmount;
    const reserveRatio = (actualReserves / requiredReserves * 100).toFixed(0);

    switch (outcome) {
      case 'GO':
        return `You have met the institutional thresholds for a GO decision. Your capital position (${reserveRatio}% of required reserves) is adequate, and all four pillars are at or above the 70% readiness threshold. You are institutionally prepared to launch a motor carrier authority.`;

      case 'WAIT':
        return `Your Ground 0 results indicate a WAIT decision. You are close to institutional readiness, but several thresholds are not yet stable. Your current capital position (${reserveRatio}% of required reserves) is improving, but you need to strengthen your position before launch. A clear action plan can move you to GO within 3–6 months.`;

      case 'NO-GO':
        return `Your Ground 0 results indicate that starting a carrier now would put your household and capital at unacceptable risk. Your current capital position (${reserveRatio}% of required reserves) is insufficient, and one or more pillars are below the 50% readiness threshold. Proceeding now would likely result in failure and personal financial loss.`;

      default:
        return '';
    }
  }

  /**
   * Generate actionable next steps based on outcome
   */
  private static generateNextSteps(
    outcome: 'GO' | 'WAIT' | 'NO-GO',
    assessment: Ground0Assessment,
    pillarScores: Record<string, number>
  ): string[] {
    const steps: string[] = [];

    switch (outcome) {
      case 'GO':
        steps.push('Review the full Operating System (Modules 1–7)');
        steps.push('Schedule a consultation to discuss your specific lane and market');
        steps.push('Begin the Admission Protocol to enroll in the paid system');
        steps.push('Establish your institutional governance framework');
        break;

      case 'WAIT':
        if (assessment.authorityReadiness < 70) {
          steps.push('Clarify your target market and lane model');
          steps.push('Research DOT and MC number application requirements');
        }
        if (assessment.insuranceReadiness < 70) {
          steps.push('Contact insurance brokers and obtain detailed quotes');
          steps.push('Budget for 12 months of premium in advance');
        }
        if (assessment.complianceReadiness < 70) {
          steps.push('Study the 12 required Driver Qualification file items');
          steps.push('Establish a compliance tracking system');
        }
        if (assessment.cashFlowReadiness < 70) {
          steps.push('Build your capital reserves to the 90-day threshold');
          steps.push('Define your break-even CPM and stop-loss line');
        }
        steps.push('Revisit Ground 0 in 3–6 months to reassess');
        break;

      case 'NO-GO':
        steps.push('Preserve your remaining capital');
        steps.push('Explore alternative income paths that do not require carrier authority');
        steps.push('Build your capital reserves over the next 12–24 months');
        steps.push('Revisit Ground 0 when your financial position has strengthened');
        steps.push('Consider consulting with a business advisor on alternative strategies');
        break;
    }

    return steps;
  }

  /**
   * Generate specific recommendations based on pillar scores
   */
  private static generateRecommendations(
    outcome: 'GO' | 'WAIT' | 'NO-GO',
    assessment: Ground0Assessment,
    pillarScores: Record<string, number>
  ): string[] {
    const recommendations: string[] = [];

    // Authority recommendations
    if (pillarScores.authority < 70) {
      recommendations.push('Authority: Develop a clear operational plan before filing for authority');
    } else if (pillarScores.authority < 85) {
      recommendations.push('Authority: You are ready; ensure all documentation is prepared for filing');
    }

    // Insurance recommendations
    if (pillarScores.insurance < 70) {
      recommendations.push('Insurance: Obtain quotes from at least three brokers before committing');
    } else if (pillarScores.insurance < 85) {
      recommendations.push('Insurance: Secure your coverage commitment before launch');
    }

    // Compliance recommendations
    if (pillarScores.compliance < 70) {
      recommendations.push('Compliance: Establish your documentary systems before hiring drivers');
    } else if (pillarScores.compliance < 85) {
      recommendations.push('Compliance: Conduct a final audit of your compliance infrastructure');
    }

    // Cash flow recommendations
    if (pillarScores.cashFlow < 70) {
      recommendations.push('Cash Flow: Increase your capital reserves to the 90-day threshold');
    } else if (pillarScores.cashFlow < 85) {
      recommendations.push('Cash Flow: Maintain your reserves and establish a contingency fund');
    }

    return recommendations;
  }

  /**
   * Export decision as a PDF-ready format
   */
  static exportDecision(decision: Ground0Decision): string {
    return `
GROUND 0 DECISION REPORT
========================

OUTCOME: ${decision.outcome}
Overall Readiness Score: ${decision.overallScore}%

PILLAR SCORES:
- Authority Protection: ${decision.pillarScores.authority}%
- Insurance Continuity: ${decision.pillarScores.insurance}%
- Compliance Backbone: ${decision.pillarScores.compliance}%
- Cash-Flow Oxygen: ${decision.pillarScores.cashFlow}%

REASONING:
${decision.reasoning}

NEXT STEPS:
${decision.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

RECOMMENDATIONS:
${decision.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}
    `;
  }
}

export default Ground0DecisionEngine;
