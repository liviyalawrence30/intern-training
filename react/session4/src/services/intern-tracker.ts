/*
export class InternTracker {

violation:interns is public.
It should be private because callers should not modify the intern list directly.

  interns: Intern[] = [];

  violation:apiUrl is public.
  It should be private because the API URL is an implementation detail.

  apiUrl: string = '/api/interns';

  violation: lastFetchedAt is public.
  It should be private because only the class should update the last fetch time.

  lastFetchedAt: Date = new Date(0);

  violation: _localCache is public.
  It should be private because the cache is used only internally.

  _localCache: Map<number, Intern> = new Map();

  async loadAll(): Promise<void> {
    const res = await fetch(this.apiUrl);
    this.interns = await res.json();
    this.lastFetchedAt = new Date();
  }
  
  violation: _buildUrl() is public.
  It should be private because it is an internal helper method.


  _buildUrl(id: number): string {
    return `${this.apiUrl}/${id}`;
  }

  violation: _updateCache() is public.
  It should be private because it is an internal helper method.

  _updateCache(intern: Intern): void {
    this._localCache.set(intern.id, intern);
  }
}

Violation: API_KEY is exported.
It should not be exported because it is an implementation detail.

export const API_KEY = 'intern-tracker-v1';

violation: DEFAULT_LIMIT is exported.
It should not be exported because it is an implementation detail.

export const DEFAULT_LIMIT = 50;

*/



/*
Section 1

1. The caller needs to read interns.
apiUrl,lastFetchedAt and  _localCache should never be visible.

2. _buildUrl() and _updateCache() are internal helpers.

3. API_KEY and DEFAULT_LIMIT should not be exported.

4. apiUrl,fetch(this.apiUrl) and _buildUrl() would change.
Callers would not break because those implementation details are hidden inside the class.
*/

interface Intern {
  id: number
  name: string
  score: number
}

class InternTracker {
  #interns: Intern[] = []
  #apiUrl = '/api/interns'
  #lastFetchedAt = new Date(0)
  #localCache = new Map<number, Intern>()

  async loadAll(): Promise<void> {
    const res = await fetch(this.#apiUrl)

    this.#interns = await res.json()
    this.#lastFetchedAt = new Date()

    this.#interns.forEach(intern => this.#updateCache(intern))
  }

  getAll(): readonly Intern[] {
    return this.#interns
  }

  getById(id: number): Intern | undefined {
    return this.#localCache.get(id)
  }

  #buildUrl(id: number): string {
    return `${this.#apiUrl}/${id}`
  }

  #updateCache(intern: Intern): void {
    this.#localCache.set(intern.id, intern)
  }
  updateScore(internId: number, score: number): void {
  if (score < 0 || score > 100) {
    throw new RangeError('Score must be between 0 and 100')
  }

  const intern = this.#interns.find(i => i.id === internId)

  if (!intern) {
    throw new Error('Intern not found')
  }

  intern.score = score
  this.#updateCache(intern)
}
}

export type { Intern }
export { InternTracker }

