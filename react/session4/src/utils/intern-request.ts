interface InternFormState {
  name: string
  score: number
  isPresent: boolean
  role: string
}

export function prepareInternRequest(data: InternFormState) {
  return {
    method: 'POST',
    body: JSON.stringify(data),
  }
}

export async function saveIntern(
  fetchFn: typeof fetch,
  data: InternFormState
) {
  const request = prepareInternRequest(data)

  return fetchFn('/api/interns', request)
}