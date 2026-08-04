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


