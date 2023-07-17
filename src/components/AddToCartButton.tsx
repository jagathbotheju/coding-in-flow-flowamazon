"use client";
import { useState, useTransition } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
interface Props {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

const AddToCartButton = ({ productId, incrementProductQuantity }: Props) => {
  //uesTransition() - normally, not block the UI, when doing state update
  //this is needed we call server action inside client component
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
      >
        Add to Cart
        <AiOutlineShoppingCart size={25} />
      </button>

      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart</span>
      )}
    </div>
  );
};

export default AddToCartButton;
