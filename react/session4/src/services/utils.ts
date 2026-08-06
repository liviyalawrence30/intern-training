function isValidScore(score: number): boolean {
  return score >= 0 && score <= 100
}

function trimName(name: string): string {
  return name.trim()
}
/*
1. isValidScore() – No, callers outside services/ do not need this.
2. trimName() – No, callers outside services/ do not need this.
Since both are internal helper functions, they should not be exported.
*/