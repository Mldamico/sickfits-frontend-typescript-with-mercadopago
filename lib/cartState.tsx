import { createContext, ReactNode, useContext, useState } from 'react';

type CartContext = {
  cartOpen: boolean;
  openCart: () => void;
  toggleCartOpen: () => void;
  closeCart: () => void;
};
export const LocalStateContext = createContext<CartContext>(null);
const LocalStateProvider = LocalStateContext.Provider;

export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCartOpen = () => {
    setCartOpen(!cartOpen);
  };

  const openCart = () => {
    setCartOpen(true);
  };
  const closeCart = () => {
    setCartOpen(false);
  };
  return (
    <LocalStateProvider
      value={{ cartOpen, toggleCartOpen, openCart, closeCart }}
    >
      {children}
    </LocalStateProvider>
  );
};

export const useCart = () => {
  const all = useContext(LocalStateContext);
  return all;
};
