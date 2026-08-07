//explore 2 

import { EventEmitter } from 'node:events'
type Order = {
  id: string
  customerEmail: string
  total: number
}
class OrderStore extends EventEmitter {
  placeOrder(order: Order): void {
    console.log(`Order placed: ${order.id}`)
    this.emit('orderPlaced', order)
  }
}
const store = new OrderStore()

store.on('orderPlaced', (order: Order) => {
  console.log(
    `[ShipmentQueue] scheduling delivery for ${order.id}`
  )
})

store.on('orderPlaced', (order: Order) => {
  console.log(
    `[EmailService] sending confirmation to ${order.customerEmail}`
  )
})

store.on('orderPlaced', (order: Order) => {
  console.log(
    `[AuditLog] recorded order ${order.id}`
  )
})
store.placeOrder({
  id: 'ORD-001',
  customerEmail: 'alice@example.com',
  total: 1500,
})

//event-emitter gives built-in methods.
//we dont have to implement subscribe(),notify(),unsubscribe() ourselves.
//It is a well tested implementation of the observer patter which makes event handling easier.
