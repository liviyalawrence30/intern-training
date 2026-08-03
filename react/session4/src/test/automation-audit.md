## 1. coverage
69.69% branches are covered.
scorestats.tsx

## 2. Speed
The slowest individual test is ScoreStats.tsx. It takes 51ms which is larger than other tests.
It renders a react component and verifies the UI 
which takes longer.

## 3. Pyramid shape.
I have more unit tests than component test but more E2E tests than component tests. Component tests should be added.

## 4. 3 user journeys
1. adding an intern
2. searching for an intern.
3. validating an intern.

## 5. 
If I changed the intern-context.tsx , the intern-search.test.ts would fail. 
Files like intern-validation.test.ts and generate-id.test.ts may also fail.
