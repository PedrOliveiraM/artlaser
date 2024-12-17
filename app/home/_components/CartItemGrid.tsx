import { ICartItem } from '@/types/ICardItem'
import CartItem from './CardItem'

interface CartItemProps {
  cartItems: ICartItem[]
  removeItem: (id: number) => void
  updateQuantity: (id: number, newQuantity: number) => void
}

export function CartItemGrid({ cartItems, removeItem, updateQuantity }: CartItemProps) {
  return (
    <div className="space-y-4">
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
        />
      ))}
    </div>
  )
}
