"use client";
import { createContext, useState } from "react";

interface BasketContextType {
  basket: string[];
  setBasket: React.Dispatch<React.SetStateAction<string[]>>;
}

export const BasketContext = createContext<BasketContextType | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<string[]>([]);
  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
