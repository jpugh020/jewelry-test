import { create } from 'zustand'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  totalPrice: number
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const calculateTotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)

export const useCart = create<CartStore>((set) => ({
  items: [],
  totalPrice: 0,
  
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((cartItem) => cartItem.id === item.id)
      let newItems

      if (existingItem) {
        newItems = state.items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        newItems = [...state.items, { ...item, quantity: 1 }]
      }

      return {
        items: newItems,
        totalPrice: calculateTotal(newItems),
      }
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id)
      return {
        items: newItems,
        totalPrice: calculateTotal(newItems),
      }
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      let newItems

      if (quantity <= 0) {
        newItems = state.items.filter((item) => item.id !== id)
      } else {
        newItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      }

      return {
        items: newItems,
        totalPrice: calculateTotal(newItems),
      }
    }),

  clearCart: () =>
    set({
      items: [],
      totalPrice: 0,
    }),
}))
