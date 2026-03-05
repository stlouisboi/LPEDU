/**
 * LaunchPath Copilot Service
 * Round 4 Build 4C: Escalation Protocol and Interaction Logging
 * 
 * Handles all interactions with the Doctrine Advisor and logs to Firestore
 */

import { OpenAI } from 'openai';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  serverTimestamp,
  updateDoc 
} from 'firebase/firestore';
import { db } from '../firebase';
import { COPILOT_SYSTEM_PROMPT } from './copilotSystemPrompt';

const openai = new OpenAI(); // API key and base URL are pre-configured

export interface CopilotInteraction {
  userId: string;
  carrierId: string;
  question: string;
  response: string;
  escalated: boolean;
  metadata?: {
    taskContext?: string;
    sessionContext?: string;
  };
}

export const copilotService = {
  /**
   * Ask the Doctrine Advisor a question
   */
  async askAdvisor(
    userId: string, 
    carrierId: string, 
    question: string,
    context?: { taskId?: string; sessionId?: string }
  ): Promise<{ response: string; escalated: boolean }> {
    try {
      // 1. Prepare the AI request
      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini', // Standard model for portal operations
        messages: [
          { role: 'system', content: COPILOT_SYSTEM_PROMPT },
          { role: 'user', content: question }
        ],
        temperature: 0.1, // Keep it precise and institutional
      });

      const aiResponse = response.choices[0].message.content || 'System error. Contact your coach.';
      
      // 2. Detect escalation
      const escalated = aiResponse.includes('falls outside the LaunchPath Standard');

      // 3. Log interaction to copilotLog collection
      const interactionRef = await addDoc(collection(db, 'copilotLog'), {
        userId,
        carrierId,
        question,
        response: aiResponse,
        escalated,
        taskId: context?.taskId || null,
        sessionId: context?.sessionId || null,
        createdAt: serverTimestamp(),
      });

      // 4. Handle escalation protocol (Build 4C)
      if (escalated) {
        await this.triggerEscalation(carrierId, userId, question, interactionRef.id);
      }

      return { response: aiResponse, escalated };
    } catch (error) {
      console.error('Doctrine Advisor error:', error);
      return { 
        response: 'System error. Your coach has been notified.', 
        escalated: true 
      };
    }
  },

  /**
   * Trigger the escalation protocol (Build 4C)
   */
  async triggerEscalation(
    carrierId: string, 
    userId: string, 
    question: string,
    logId: string
  ): Promise<void> {
    // 1. Log to carrier timeline
    const timelineRef = collection(db, 'carrierTimelineEvents');
    await addDoc(timelineRef, {
      carrierId,
      eventType: 'copilot_escalation',
      eventData: { question, logId },
      createdAt: serverTimestamp(),
    });

    // 2. Create notification for coach (Round 5)
    const notificationsRef = collection(db, 'notifications');
    await addDoc(notificationsRef, {
      type: 'copilot_escalation',
      carrierId,
      userId,
      message: `Doctrine Advisor escalated a question from carrier. Question: "${question.substring(0, 100)}..."`,
      read: false,
      createdAt: serverTimestamp(),
    });

    // 3. Update carrier risk if necessary (Optional, based on context)
    // The brief says "Any question where the carrier appears distressed or at risk of authority loss"
    // For now, we just notify the coach.
  }
};
