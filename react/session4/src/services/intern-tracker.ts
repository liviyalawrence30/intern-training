/*
Section 1

1. The caller needs to read interns.
apiUrl,lastFetchedAt and  _localCache should never be visible.

2. _buildUrl() and _updateCache() are internal helpers.

3. API_KEY and DEFAULT_LIMIT should not be exported.

4. apiUrl,fetch(this.apiUrl) and _buildUrl() would change.
Callers would not break because those implementation details are hidden inside the class.


*/