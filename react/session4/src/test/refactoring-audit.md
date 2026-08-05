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


