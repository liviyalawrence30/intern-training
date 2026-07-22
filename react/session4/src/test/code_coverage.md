task 5.1

4 percentages shown in the coverage html file:
1. 86.59% Statements
2. 80.7% Branches
3. 82.6% Functions 
4. 90.36% Lines

Branches is the lowest coverage.

task 5.2

File:ThemedCard.tsx
The uncovered branch is the conditional expression "theme === 'light' ?... : .."
only the light theme was tested . The dark theme branch was not executed.
Passing the value "theme = 'dark " would trigger the untested branch .


task 5.4

This test may increase code coverage because it executes a line of code. However, it does not improve the quality of the test because it performs no meaningful verification.The assertion always passes, so it cannot detect
bugs or incorrect behavior.



## explore 1

The verbose reporter displays every individual test case, its pass/fail status, execution time .
It provides more detailed ouput than the ' npm run test' reporter.

## explore 2
Now, the branch coverage has increased to 80.7% so my coverage command didn't fail because it met the threshold.


## explore 3
Error: expected any number of assertion, but got none
This ensures that the test performs atleast one assertion.

## explore 4
When I hovered over a red line , it said "statement not covered."


