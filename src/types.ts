// Types for Canvas Wrapped Report JSON response

export interface Course {
  id: number;
  name: string;
  course_code: string;
}

export interface Submission {
  id: number;
  score: number;
  discussion_entries: unknown | null;
}

export interface Assignment {
  id: number;
  points_possible: number;
  name: string;
  due_at: string;
  submission_types: string[];
  course_id: number;
  is_quiz_assignment: boolean;
  is_quiz_lti_assignment: boolean | null;
  submission: Submission;
  course: Course;
  transformedScore: number;
}

export interface Archetype {
  type: string;
  message: string;
}

export interface Assignments {
  total: number;
  average: number;
  first: Assignment;
  second: Assignment;
  third: Assignment;
  min: Assignment;
}

export interface Attendance {
  average: number;
}

export interface Courses {
  max: Course;
  min: Course;
}

export interface Discussion {
  posts: number;
  replies: number;
  words: number;
}

export interface Groups {
  total: number;
}

export interface HellWeekDays {
  WEDNESDAY: number;
  FRIDAY: number;
  SUNDAY: number;
  TUESDAY: number;
  THURSDAY: number;
  SATURDAY: number;
  MONDAY: number;
}

export interface HellWeek {
  start: string;
  startDay: string;
  days: HellWeekDays;
}

export interface Quizzes {
  total: number;
  average: number;
  first: Assignment;
  second: Assignment;
  third: Assignment;
  min: Assignment;
}

export interface ReportData {
  archetype: Archetype;
  assignments: Assignments;
  attendance: Attendance;
  courses: Courses;
  discussion: Discussion;
  groups: Groups;
  hellWeek: HellWeek;
  quizzes: Quizzes;
}

// Page keys constant
export const PAGE_KEYS = [
  'info',
  'attendance',
  'assignments-1',
  'assignments-2',
  'assignments-3',
  'quizzes-1',
  'quizzes-2',
  'quizzes-3',
  'courses',
  'discussion',
  'groups',
  'hellWeek',
  'archetype',
  'summary',
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

// Type guard to check if a string is a valid PageKey
export function isValidPageKey(key: string | null): key is PageKey {
  return key !== null && PAGE_KEYS.includes(key as PageKey);
}

