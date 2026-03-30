export interface BasketItem {
  loanId: number;
  contractNo: string;
  originator: string;
  investAmount: { eur: string; bgn: string };
  apr: string;
  remainingTerm: string;
  initialTerm: string;
}

let listeners: Array<() => void> = [];
let basket: BasketItem[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export function getBasket() {
  return basket;
}

export function addToBasket(item: BasketItem) {
  if (basket.some((b) => b.loanId === item.loanId)) return false;
  basket = [...basket, item];
  notify();
  return true;
}

export function removeFromBasket(loanId: number) {
  basket = basket.filter((b) => b.loanId !== loanId);
  notify();
}

export function clearBasket() {
  basket = [];
  notify();
}

export function subscribeBasket(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function useBasket() {
  const { useSyncExternalStore } = require("react");
  return useSyncExternalStore(subscribeBasket, getBasket, getBasket) as BasketItem[];
}
