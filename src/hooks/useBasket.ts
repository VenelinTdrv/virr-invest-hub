import { useSyncExternalStore } from "react";
import { subscribeBasket, getBasket, type BasketItem } from "@/stores/basketStore";

export function useBasket(): BasketItem[] {
  return useSyncExternalStore(subscribeBasket, getBasket, getBasket);
}
