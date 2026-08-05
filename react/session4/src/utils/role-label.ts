const ROLE_LABELS: Record<string, string> = {
  Frontend: 'Frontend Developer',
  Backend: 'Backend Developer',
  Fullstack: 'Fullstack Developer',
}

export function getRoleLabel(role: string): string {
  return ROLE_LABELS[role] ?? 'Unknown'
}

//Task 5.2
//When a new role needs to be added, I only need to add a new entry to the 'ROLE_LABELS' lookup object. 
// The function logic remains unchanged, making the code easier to maintain, read, and extend.