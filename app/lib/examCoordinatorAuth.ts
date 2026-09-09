/**
 * Exam Coordinator session (public examination site).
 * TODO: Replace temporary credentials with server-side auth.
 */
export const EXAM_COORDINATOR_SESSION_KEY = 'examCoordinatorSession'

/** TEMP — remove when real Exam Coordinator accounts exist. */
export const EXAM_COORDINATOR_USER = 'root'
export const EXAM_COORDINATOR_PASS = '127001'

export function verifyExamCoordinatorCredentials(username: string, password: string): boolean {
  return username === EXAM_COORDINATOR_USER && password === EXAM_COORDINATOR_PASS
}

export function isExamCoordinatorSession(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem(EXAM_COORDINATOR_SESSION_KEY) === 'true'
}

export function setExamCoordinatorSession(): void {
  sessionStorage.setItem(EXAM_COORDINATOR_SESSION_KEY, 'true')
}

export function clearExamCoordinatorSession(): void {
  sessionStorage.removeItem(EXAM_COORDINATOR_SESSION_KEY)
}
