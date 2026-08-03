
/*
// Snippet A
function generateInternId(): string {
  return `intern-${Date.now()}-${Math.random()}`
}



// Snippet B
import { analyticsClient } from '../services/analytics'
function trackPageView(page: string): void {
  analyticsClient.log(page)
}


// Snippet C
async function saveAndRedirect(data: InternFormState): Promise<void> {
  await fetch('/api/interns', { method: 'POST', body: JSON.stringify(data) })
  window.location.href = '/dashboard'
  localStorage.setItem('lastSaved', new Date().toISOString())
  console.log('Saved successfully')
}




// Snippet D
let errorLog: string[] = []
function logError(message: string): void {
  errorLog.push(message)        // writes to module-level variable
  console.error(message)
}
function getErrors(): string[] {
  return errorLog               // reads from module-level variable
}

*/

// Snippet A
// Pattern: Side effect
// FIRST Principle: Repeatable
// Fix: Pass the current time and random value as parameters instead of calling Date.now() and Math.random() directly.

// Snippet B
// Pattern: Hard-coded dependency
// FIRST Principle: Independent
// Fix: Inject the analytics client instead of importing it directly.

// Snippet C
// Pattern: Does too many things
// FIRST Principle: Independent
// Fix: Split it into separate functions for saving data, redirecting, updating localStorage, and logging.

// Snippet D
// Pattern: Global state
// FIRST Principle: Independent
// Fix: Avoid the global errorLog. Pass it as a parameter or create a separate instance for each test.