import { formatPrice } from "@/lib/formatPrice";

interface Props {
  price: number;
  className?: string;
}

const PriceTag = ({ price, className }: Props) => {
  return (
    <span className={`badge badge-secondary p-4 font-bold ${className}`}>
      {formatPrice(price)}
    </span>
  );
};

export default PriceTag;
