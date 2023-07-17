import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
      href={`/product/${product.id}`}
    >
      <figure>
        <Image
          alt={product.name}
          src={product.imageUrl}
          width={400}
          height={800}
          className="object-cover h-48"
        />
      </figure>
      <div className="card-body">
        <div className="relative flex">
          <h2 className="card-title">{product.name} </h2>
          {isNew && (
            <div className="badge badge-accent text-xs font-bold -top-2 right-2">
              NEW
            </div>
          )}
        </div>
        <p className="line-clamp-4 text-justify">{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
};

export default ProductCard;
