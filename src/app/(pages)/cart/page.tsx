import CartItem from "@/components/CartItem";
import { getCart } from "@/lib/cart";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";

export const metadata = {
  title: "Your Cart - Flowmazon",
};

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div className="mb-5">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {!cart?.items.length ? (
        <div className="flex flex-col">
          <h2 className="my-5 text-2xl font-bold">Your Cart is Empty</h2>
          <Link className="btn btn-primary btn-sm w-fit" href="/">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div>
          {cart?.items.map((item) => (
            <CartItem cartItem={item} key={item.id} />
          ))}
          <p className="mt-5 font-bold text-2xl">
            Total : {formatPrice(cart.subtotal)}
          </p>
          <button className="btn btn-primary">Check Out</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
