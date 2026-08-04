const APP_NAME = 'Intern Dashboard'

if (!APP_NAME) {
  throw new Error(
    'config: APP_NAME is required.'
  )
}

export const config = {
  appName: APP_NAME,
}