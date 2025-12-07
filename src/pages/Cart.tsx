import { useCart } from '@/store/store'
import { Button } from '@/components/ui/button'
import { Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Cart() {
  const items = useCart((state) => state.items)
  const totalPrice = useCart((state) => state.totalPrice)
  const removeFromCart = useCart((state) => state.removeFromCart)
  const updateQuantity = useCart((state) => state.updateQuantity)
  const clearCart = useCart((state) => state.clearCart)

  return (
    <div className="min-h-screen bg-linear-to-b from-[#324c39] to-[#1a2e24] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-[#ebc9aa] mb-8">Shopping Cart</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-[#2a3d33] rounded-lg overflow-hidden">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 p-6 ${
                      index !== items.length - 1 ? 'border-b border-[#324c39]' : ''
                    }`}
                  >
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#ebc9aa] mb-2">
                        {item.name}
                      </h3>
                      <p className="text-[#f5f5f5] text-sm mb-3">
                        ${item.price.toFixed(2)} each
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="bg-[#324c39] hover:bg-[#ebc9aa] text-[#f5f5f5] hover:text-[#324c39] w-8 h-8 p-0"
                        >
                          −
                        </Button>
                        <span className="text-[#f5f5f5] w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-[#324c39] hover:bg-[#ebc9aa] text-[#f5f5f5] hover:text-[#324c39] w-8 h-8 p-0"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Item Price & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <span className="text-2xl font-bold text-[#ebc9aa]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#2a3d33] rounded-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-[#ebc9aa] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#f5f5f5]">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#f5f5f5]">
                    <span>Shipping:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-[#f5f5f5]">
                    <span>Tax:</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#324c39] pt-4">
                    <div className="flex justify-between text-2xl font-bold text-[#ebc9aa]">
                      <span>Total:</span>
                      <span>${(totalPrice * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#ebc9aa] hover:bg-[#d4a574] text-[#324c39] font-bold py-3 mb-3">
                  Checkout
                </Button>

                <Button
                  onClick={() => clearCart()}
                  className="w-full bg-[#324c39] hover:bg-[#1a2e24] text-[#f5f5f5] border border-[#ebc9aa]"
                >
                  Clear Cart
                </Button>

                <Link to="/shop">
                  <Button className="w-full mt-3 bg-[#324c39] hover:bg-[#1a2e24] text-[#ebc9aa] border border-[#ebc9aa]">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-[#ebc9aa] mx-auto mb-4 opacity-50" />
            <p className="text-[#f5f5f5] text-xl mb-6">Your cart is empty</p>
            <Link to="/shop">
              <Button className="bg-[#ebc9aa] hover:bg-[#d4a574] text-[#324c39]">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
