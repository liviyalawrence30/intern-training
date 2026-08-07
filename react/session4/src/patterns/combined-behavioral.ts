/*
Behavioral Pattern Audit

File reviewed: src/services/intern-service.ts

1. Is there any object that directly calls methods on multiple other objects
   in response to a state change?
   → Possible Observer problem?  No — Reason: This file conatins only business logic.There are no direct calls on multiple methods.

2. Is there any function or method with a growing if/else block that selects
   different behaviour based on a type, mode, or string value?
   → Possible Strategy problem? Yes - Reason: sortInternsByScore() changes it's behaviour based on the 'asc' or 'desc' order.
   If more sorting options are added, this logic could grow.


3. Rule of three check:
   - If Observer: does the direct-calling pattern appear in more than two places? 
   No
   - If Strategy: does the if/else for behaviour selection appear in more than
     two places, or is it expected to grow? 
     No, currently it appears in only 2 places. So no strategy pattern needed yet.

4. If a pattern fits: 
The sortInternsByScore() currently depends on only 2 conditions. So strategy  pattern is not needed yet.

5. If no pattern fits: 
The current implementation is simpler. No strategy pattern needed until more sorting logic are included in the sortInternsByScore() method.
*/


import { Subject, type Observer } from "./observer.ts";
type PriceChangeEvent = {
  product: string;
  oldPrice: number;
  newPrice: number;
};
class PricingEngine extends Subject {
  updatePrice(
    product: string,
    oldPrice: number,
    newPrice: number
  ): void {
    this.notify({
      product,
      oldPrice,
      newPrice,
    });
  }
}
class DiscountAlertObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent

    const discount =
      ((event.oldPrice - event.newPrice) / event.oldPrice) * 100

    if (discount > 10) {
      console.log(
        `[Discount] ${event.product} dropped by ${discount.toFixed(
          1
        )}% — alert sent`
      )
    }
  }
}
class PriceHistoryObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent

    console.log(
      `[History] ${event.product}: ${event.oldPrice} -> ${event.newPrice}`
    )
  }
}
class BudgetTrackerObserver implements Observer {
  update(data: unknown): void {
    const event = data as PriceChangeEvent

    if (event.newPrice < 2000) {
      console.log(
        `[Budget] ${event.product} is now under budget at ${event.newPrice}`
      )
    }
  }
}
const engine = new PricingEngine()
engine.subscribe(new DiscountAlertObserver())
engine.subscribe(new PriceHistoryObserver())
engine.subscribe(new BudgetTrackerObserver())

engine.updatePrice('Monitor', 18999, 14999)
engine.updatePrice('Keyboard', 2499, 1999)
engine.updatePrice('Mouse', 899, 849)

/*
Monitor:
DiscountAlertObserver fired because the price dropped by more than 10%.
PriceHistoryObserver fired because it records every price change.
BudgetTrackerObserver did not fire because the new price is above 2000.

Keyboard:
DiscountAlertObserver fired because the price dropped by more than 10%.
PriceHistoryObserver fired because it records every price change.
BudgetTrackerObserver fired because the new price is below 2000.

Mouse:
DiscountAlertObserver did not fire because the price drop was less than 10%.
PriceHistoryObserver fired because it records every price change.
BudgetTrackerObserver fired because the price is below 2000.
*/