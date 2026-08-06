import { describe, it, expect,vi,beforeEach } from 'vitest'
import { InternTracker } from '../services/intern-tracker'
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: async () => [
        { id: 1, name: 'Rahul', score: 92 },
      ],
    })
  )
})
describe('InternTracker.updateScore', () => {
  it('throws RangeError if score is out of 0–100 range', () => {
    const tracker = new InternTracker()

    expect(() => tracker.updateScore(1, 120))
      .toThrow(RangeError)
  })

  it('throws if the intern does not exist', () => {
    const tracker = new InternTracker()

    expect(() => tracker.updateScore(1, 90))
      .toThrow('Intern not found')
  })

  it('updates the score without exposing internal state', async() => {
    const tracker = new InternTracker()

    await tracker.loadAll()

    const intern = tracker.getAll()[0]

    tracker.updateScore(intern.id, 95)

    expect(tracker.getById(intern.id)?.score).toBe(95)
  })
})