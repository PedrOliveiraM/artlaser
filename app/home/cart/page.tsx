'use client'
import { useCart } from '@/app/context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Carrinho</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Seu carrinho está vazio</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-sm">Quantidade: {item.quantity}</p>
                <p className="text-sm">Preço: R$ {item.retailPrice}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remover
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={clearCart}
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
          >
            Limpar carrinho
          </button>
        </div>
      )}
    </div>
  )
}
