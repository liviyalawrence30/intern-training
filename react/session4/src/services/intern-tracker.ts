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

