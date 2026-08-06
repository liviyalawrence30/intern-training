interface ISessionLogger {
  recordAttendance(internId: number): void
  hasAttended(internId: number): boolean
  getAttendeeCount(): number
  getAttendeeIds(): readonly number[]
}

class SessionLogger implements ISessionLogger {
  #attendees = new Set<number>()

  recordAttendance(internId: number): void {
    this.#attendees.add(internId)
  }

  hasAttended(internId: number): boolean {
    return this.#attendees.has(internId)
  }

  getAttendeeCount(): number {
    return this.#attendees.size
  }

  getAttendeeIds(): readonly number[] {
    return [...this.#attendees]
  }
}

/*
1. Yes.The callers only use the public methods.
So the internal storage can be changed without affecting them.

2. If the raw Set were exposed,callers could directly call methods like add(),delete() and clear(),bypassing the public interface.

*/