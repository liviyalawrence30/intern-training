interface Notifier {
  send(recipient: string, message: string): void
}

class EmailNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Email] To: ${recipient} — ${message}`)
  }
}

class SMSNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[SMS] To: ${recipient} — ${message}`)
  }
}

class PushNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Push] To: ${recipient} — ${message}`)
  }
}
class SlackNotifier implements Notifier {
  send(recipient: string, message: string): void {
    console.log(`[Slack] To: ${recipient} — ${message}`)
  }
}

function createNotifier(channel: string): Notifier {
  switch (channel.toLowerCase()) {
    case 'email':
      return new EmailNotifier()

    case 'sms':
      return new SMSNotifier()

    case 'push':
      return new PushNotifier()
    
    case 'slack':
      return new SlackNotifier()

    default:
      throw new Error(
  `createNotifier: unknown channel '${channel}', expected one of: email, sms, push, slack`
)
  }
}

const channels = ['email', 'sms', 'push','slack']

for (const channel of channels) {
  const notifier = createNotifier(channel)
  notifier.send('user@example.com', 'Your order has been confirmed.')
}

//The interface provides a common send() method for all the notifier types.
//It there were no interface,The loop should know and use each concrete class directly.

//Only 3 lines of code were changed:
//The new case, the channels array and the throw error message.
//It says that it is easier to extend the factory pattern with only small changes.