"use client";
import { ShoppingCart } from "@/lib/cart";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

interface Props {
  cart: ShoppingCart | null;
}

const ShoppingCartButton = ({ cart }: Props) => {
  const closeMenu = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle hover:bg-transparent"
      >
        <div className="indicator">
          <AiOutlineShoppingCart size={25} />
          {cart && cart.size && (
            <span className="badge badge-sm indicator-item border-none bg-primary w-4 h-4 items-center justify-center font-bold text-black">
              {cart.size}
            </span>
          )}
        </div>
      </label>

      {/* menu */}
      <div
        tabIndex={0}
        className="cart dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30 rounded-md"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size} Items</span>
          <span className="text-info">
            Subtotal: {formatPrice(Number(cart?.subtotal))}
          </span>
          <div className="card-actions">
            <Link
              href="/cart"
              className="btn btn-primary btn-block"
              onClick={closeMenu}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartButton;
