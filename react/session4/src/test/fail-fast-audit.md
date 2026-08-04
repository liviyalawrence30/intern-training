## section 1 - Task 1.2
1.
Pattern : Silent default
File: src/hooks/useInternSearch.ts:52 
Risk:The average score may be returned as 0 when the data is not present.
It may look like a valid value  but it hides the insufficient data present.

2.
Pattern:Function returns without indicating failure.
File: src/hooks/useInternForm.ts:86
Risk:submit() returns false.
If the caller ignores the return value, the form submission can fail without clearly indicating why.

3.
Pattern: Silent default
File : src/contexts/intern-context.ts : 54
Risk:generateId() uses intern.length+1.
Removing an intern can lead to duplicate IDs.

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

## section 4 - Task 4.1

## Error Message Audit

| File | Current message | Answers all 3 questions? | Improved message |
|------|----------------|--------------------------|-----------------|
intern-context.ts | useInterns must be used inside InternProvider|no|useInterns: expected to be used inside InternProvider, but no provider was found.|

theme-context.ts|useTheme must be used inside ThemeProvider|no|useTheme: expected to be used inside ThemeProvider, but no provider was found.|

## Task 4.2 -comment
I improved the error messages. After running the tests, no errors. So no change in the function signature was done.

# section 4 - task 4.3

## 2am Test — useInterns

Error message:
"useInterns: expected to be used inside InternProvider, but no provider was found."

What I know from this message alone:
1. Which function failed: useInterns
2.  What was expected: The hook should be used inside InternProvider.
3. What actually happened: No provider was found.

What I would do next without reading any code:
1. Check where useInterns() is being called.
2. Verify that the component is wrapped inside InternProvider.

would the original message be enough?

- No.The improved message clearly explains what was expected and what actually happened, 
making it easier to identify the problem quickly.

## section 5 - task 5.2
assert checks the throw immediately when the function is called with the invalid input types.
It throws unconditionally because they detect the programming errors.
The validation logic handles the expected user input errors by returning validation messages , allowing the user to fix the input.

## section 5 - task 5.3
The post condition is mostly documentation.The filter() always returns an array.
It is useful when the implementation changes later , helping to detect the unexpected behaviour. 


