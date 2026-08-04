## section 1 - Task 1.2
1.
In src/hooks/useInternSearch.ts:52 , the average score may be returned as 0 when the data is not present.
Risk: It may look like a valid value , hides the insufficient data present.

2.
In src/hooks/useInternForm.ts:86,submit() returns false.
Risk: If the caller ignores the return value, the form submission can fail without clearly indicating why.

3.
In src/contexts/intern-context.ts : 54, generateId() uses intern.length+1
Risk:Removing an intern can lead to duplicate IDs.

## section 2 - Task 2.1
I couldn't find any function that returned null or undefined to indicate an error, so there were no callers to update.
 ## task 2.2
 I didn't find any empty catch blocks or swallowed exceptions in my project.
## task 2.3
I didn't find any required values that were being silently replaced with default values, so no changes were needed.


## section 3 - Task 3.1

Originally, the form was updated before checking if the input was valid. 
After refactoring, the validation happens first, so the function exits immediately when the input is invalid.
This avoids unnecessary work and makes the code easier to understand.

## section 3 task 3.2

Guard Clause Order — validateInternForm
Before:
1. name validation
2. score range validation

After:
1. null check
2. type check
3. name validation
4. score range validation.

Reason for reordering:
Cheapest validation checks run first.
If the inputis missing or the type is wrong , the function exits immediately before performing other validations.

# section 3 - task 3.3

It was easier to test this way because we can just pass different inputs and check the returned result.
Testing through hooks and components require more setup.

