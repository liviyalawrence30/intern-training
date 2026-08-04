const APP_NAME = 'Intern Dashboard'

if (!APP_NAME) {
  throw new Error(
    'config: expected APP_NAME to be defined, but no value was found.'
  )
}

export const config = {
  appName: APP_NAME,
}