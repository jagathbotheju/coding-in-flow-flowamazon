"use client";

import { CartItemWithProducts } from "@/lib/cart";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { AiOutlinePlus, AiOutlineMinus, AiTwotoneDelete } from "react-icons/ai";
import { useTransition } from "react";
import { deleteProduct, setProductQuantity } from "@/app/serverActions/actions";
import { toast } from "react-toastify";

interface Props {
  cartItem: CartItemWithProducts;
}

const CartItem = ({ cartItem: { product, quantity } }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={`/products/${product.id}`} className="font-bold">
            {product.name}
          </Link>
          <div className="flex flex-row gap-2">
            Quantity :{/* decrement */}
            <button
              onClick={() =>
                startTransition(() =>
                  setProductQuantity(product.id, quantity - 1),
                )
              }
              disabled={isPending || quantity <= 1}
              className="btn btn-error btn-outline btn-circle btn-xs"
            >
              <AiOutlineMinus size={15} />
            </button>
            <div className="mx-3 font-bold">
              {isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                quantity
              )}
            </div>
            {/* increment */}
            <button
              disabled={isPending}
              className="btn btn-error btn-outline btn-xs btn-circle"
              onClick={() =>
                startTransition(() =>
                  setProductQuantity(product.id, quantity + 1),
                )
              }
            >
              <AiOutlinePlus size={15} />
            </button>
          </div>
          <div>Price : {formatPrice(product.price)}</div>
          <div className="flex items-center gap-3 font-bold">
            Total : {formatPrice(product.price * quantity)}
          </div>
        </div>
        <AiTwotoneDelete
          className="text-pink-500 cursor-pointer self-end"
          onClick={() =>
            startTransition(async () => {
              const res = await deleteProduct(product.id);
              if (res?.message) {
                toast.success(res.message);
              }
            })
          }
        />
      </div>
      <div className="divider" />
    </div>
  );
};

export default CartItem;
