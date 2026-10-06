/** Mirrors admission / RegisterForm music options. */

export const DIPLOMA_YEARS = ['First Year', 'Second Year', 'Third Year'] as const

export const INSTRUMENT_OPTIONS = [
    { value: 'Tabla', label: 'Tabla' },
    { value: 'Harmonium', label: 'Harmonium' },
    { value: 'Satar', label: 'Satar' },
    { value: 'Bansuri', label: 'Bansuri' },
    { value: 'Guitar', label: 'Guitar' },
    { value: 'Pakhawaj', label: 'Pakhawaj' },
] as const

export const VOCAL_OPTIONS = [
    { value: 'Hindustani Classical Vocal', label: 'Hindustani Classical Vocal' },
    { value: 'Maharashtrian Bhajan', label: 'Maharashtrian Bhajan' },
    { value: 'Light Music', label: 'Light Music' },
] as const

export const DANCE_OPTIONS = [
    { value: 'Bharatnatyam', label: 'Bharatnatyam' },
    { value: 'Kathak', label: 'Kathak' },
] as const

export const EXAM_TYPE_OPTIONS = [
    { value: 'ISE_I', label: 'ISE I' },
    { value: 'ISE_II', label: 'ISE II' },
    { value: 'ESE', label: 'ESE' },
] as const

export const SESSION_LABEL_OPTIONS = ['April/May 2024-25', 'April/May 2025-26'] as const

export const MARKS_ENTRY_TOKEN_KEY = 'marksEntryToken'
/** Canonical branch string from server; kept with token so PDF/UI work after refresh. */
export const MARKS_ENTRY_BRANCH_KEY = 'marksEntryBranch'
