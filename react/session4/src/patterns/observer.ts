export interface Observer {
  update(data: unknown): void
}

export class Subject {
  private observers: Observer[] = []

  subscribe(observer: Observer): void {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer)
  }

  protected notify(data: unknown): void {
    this.observers.forEach(o => o.update(data))
  }
}

/*
notify() is protected because only the Subject class can call notify().
If it were public , everyone call call them .
eg: interns.notify()
*/

type Order = {
  id: string
  customerEmail: string
  total: number
}

class OrderStore extends Subject {
  private orders: Order[] = []

  placeOrder(order: Order): void {
    this.orders.push(order)
    this.notify(order)
  }

  cancelOrder(id: string): void {
    const index = this.orders.findIndex(order => order.id === id)

    if (index === -1) return

    const [order] = this.orders.splice(index, 1)

    this.notify({
      cancelled: true,
      order,
    })
  }

  getOrders(): Order[] {
    return [...this.orders]
  }
}

class ShipmentQueue implements Observer {
  update(data: unknown): void {
    const payload = data as Order

    console.log(
      `[ShipmentQueue] scheduling delivery for ${payload.id}`
    )
  }
}

class EmailService implements Observer {
  update(data: unknown): void {
    const payload = data as Order

    console.log(
      `[EmailService] sending confirmation to ${payload.customerEmail}`
    )
  }
}
// explore 1 

//class EmailService implements Observer {
//   update(data: unknown): void {
//     const payload = data as Order

//     if (payload.total > 1000) {
//       throw new Error('Email service failed')
//     }

//     console.log(
//       `[EmailService] sending confirmation to ${payload.customerEmail}`
//     )
//   }
// }
//fix:
// protected notify(data: unknown): void {
//   this.observers.forEach(observer => {
//     try {
//       observer.update(data)
//     } catch (error) {
//       console.error(error)
//     }
//   })
// }

class AuditLog implements Observer {
  update(data: unknown): void {
    const payload = data as Order

    console.log(
      `[AuditLog] recorded order ${payload.id} at ${new Date().toISOString()}`
    )
  }
}

class AnalyticsService implements Observer {
  update(order: Order): void {
    console.log(
      `[AnalyticsService] tracking purchase event for order ${order.id}, value: ${order.total}`
    )
  }
}

const store = new OrderStore()
const shipment = new ShipmentQueue()
const email    = new EmailService()
const audit    = new AuditLog()
const analytics = new AnalyticsService()

store.subscribe(shipment)
store.subscribe(email)
store.subscribe(audit)
store.subscribe(analytics)

store.placeOrder({ id: 'ORD-001', customerEmail: 'alice@example.com', total: 1500 })


store.placeOrder({ id: 'ORD-002', customerEmail: 'bob@example.com', total: 800 })
/*
I didn't change any lines of code in the orderStore.
I just added audit log.
Observer pattern makes it easy to add new functionality without modifiying the existing subject.
*/

console.log('\n--- Unsubscribe AuditLog ---')
store.unsubscribe(audit)
store.placeOrder({ id: 'ORD-003', customerEmail: 'carol@example.com', total: 200 })
console.log('\n--- Subscribe AuditLog Again ---')

store.subscribe(audit)

store.placeOrder({
  id: 'ORD-004',
  customerEmail: 'david@example.com',
  total: 300,
})

/*
Observers can be removed when they are no longer needed.
eg:
A customer disables the email notification.
Logging is turned off for a specific environment.
*/

store.placeOrder({
  id: 'ORD-005',
  customerEmail: 'emma@example.com',
  total: 450,
})

/*
From placeOrder() alone, I cannot say 4 different things happen.
This is not a problem with few observers.
If many observers are added, then it becomes a problem to maintain and debug.
*/