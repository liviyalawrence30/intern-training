# section 1
## task 1.1
The file that mixes the most concerns is 'intern-context.tsx'
It handles state management, data validation,data loading, context provider and ID generation.

## task 1.2
### snippet A
1. It currently  lives in context.
2. It should live in validation or utility.
3. Validation should be handled seperately from state management.

### snippet B
1. It lives in UI layer.
2. It can be in hooks or API layer.
3. Components should focus on rendering not fetching data.

### snippet C
1. Inside utility
2. It should be in component
3. A utility should return data not JSX.

### snippet D
1. context
2. It should be in utility or hook.
3. Business logic should be separate.


