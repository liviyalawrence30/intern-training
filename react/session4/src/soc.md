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

# section 4 
## Task 4.2
 1. A presentational component should not import from the service layer directly.
 The container component should call the service and pass the result as props.

 2. When the container calls the service, the presentational component can be tested easily by passing the props. It is easier than directly calling the service.


# section 5 
## task 5.1
 File | Expected layer | Actual concerns | Correct? |
|------|---------------|----------------|---------|
| `src/components/ScoreStats.tsx` | UI |displays the score statistics | yes|
| `src/components/AddInternForm.tsx` | UI | renders the form and handles the user inputs.|yes |
| `src/components/ThemedCard.tsx` | UI | displays the intern-info| yes|
| `src/hooks/useInternForm.ts` | Service + UI (hook) |form state management, validation, calls context |yes |
| `src/hooks/useInternSearch.ts` | Service + UI (hook) |filtering and state | yes|
| `src/contexts/intern-context.tsx` | Wiring (context) |connects the service and repository layers | yes|
| `src/services/intern-service.ts` | Service | business logic, filters, validation,search,intern creation|yes |
| `src/repositories/intern-repository.ts` | Repository | state management for interns|yes |

### comment
After the refactoring , useInternForm.ts is a wiring layer. It connects the UI with the service and context.

## task 5.2
I think it is a coordination hook because it communicates between the UI and the service.
It manages the form state, calls the validation service and performs submission through the injected addIntern() function .

# section 6 
## Task 6.1

### diagram 

Add internform.tsx
  |
  calls the useInternForm(hook)
      |
      calls the validateInternForm(intern-service)
      |
      calls the addIntern(injected from intern provider)
            |
            InternProvider
                |
                calls createIntern(intern-service)
                |
                calls repo.add(intern-repository)
                    |
                    updates the intern state

ScoreStats
    |
    gets interns from internProvider
        |
        calculates statistics
            |
            passes props to scorestats


InternProvider
    |
    calls useIntern repository
        |
        manages intern state
    |
    calls the intern service
        |
        createIntern
        | 
        calculate the average score
### comment
There are no upward dependencies.

## task 6.2
Yes.
In Scorestats.tsx, the average score logic  is in intern-service but the highest,passing calculations are in  scorestats. So it's a little harder to be described in 1 sentence.

# explore
## 1.
I modified ScoreStats to include the logic in intern-service.ts
I didn't change any other layer.
## 4.
internService.ts has 90 percent coverage . It is not the highest.
It is easier to test because it contains pure functions - business logic.


