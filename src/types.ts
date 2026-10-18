import { DiagnosticResult } from './utils/diagnosticEngine';

export type AppView = 'landing' | 'student' | 'teacher';

export interface StudentSubmission {
  id: string;
  studentName: string;
  avatarSeed: string;
  timestamp: string;
  problemTitle: string;
  score: number;
  status: 'graded' | 'needs_remediation' | 'remediated';
  diagnostic: DiagnosticResult;
  remedialSolved: boolean;
}

export interface TeacherClass {
  id: string;
  name: string;
  grade: string;
  subject: string;
  studentCount: number;
  averageScore: number;
  inviteCode: string;
}

export interface CompetitionCriterion {
  id: number;
  title: string;
  keyHighlight: string;
  pedagogicalValue: string;
  technicalProof: string;
  demoActionLabel: string;
}
