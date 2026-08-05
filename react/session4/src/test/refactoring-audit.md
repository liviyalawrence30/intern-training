# section 1
## Task 1.2
1. Multiple responsibilities in useInternForm.ts
Reason:
Because it manages the form state, validation , error handling and submission logic, making it harder to maintain.

2. Mixed responsibilities in useInternSearch.ts
Reason:
Because the hook manages search state, filtering logic, and statistics calculation.

3. Tight coupling in intern-context.tsx
Reason:
Because the context depends directly on both the repository and service layers. 
It increases dependency.

# section 2 
## task 2.1

In useInternSearch.ts,
old name : i
new name: intern 
old name : s
new name: totalScore

The new names provide better meaning.

In intern-context.tsx
old name : repo
new name:internRepository
The new name indicates the specific intern repository

## task 3.3
In useInternForm.ts,
Before refactoring:
The original 'handlechange()' function was doing: validation, converts input value,update the form and state.

After refactoring:
validateAndupdateForm() validates and updates the state.
handlechange() focuses on processing .

## task 4.1
In useInternForm.ts,the validation logic was duplicated in handlechange() and submit().
Leaving this duplication provides inconsistent behaviour. 
It is extracted into validateForm() ,removing the duplicate logic and making the code easier to read and maintain.

## task 4.2
I was using constants for the interns.Now, I replaced them with a test factory.
A test factory could make the tests easier to read by allowing each test to override only the fields it needs.

# section 5
## task 5.1
After refactoring, guard clauses were already present .
It makes the code easier to read than nested if clauses.

## task 5.2
## Task 5.2
I searched the project for long 'if/else if' chains using 'grep -R "else if" src' but did not find any. 
So,I created new files like src/utils/role-label.ts and src/test/role-label-test.ts for this activity.