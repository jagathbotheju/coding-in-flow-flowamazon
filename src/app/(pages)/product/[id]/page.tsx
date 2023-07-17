import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";
import { cache } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { incrementProductQuantity } from "@/app/serverActions/actions";

interface Props {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  if (!product) notFound();
  return product;
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const product = await getProduct(params.id);
  return {
    title: `${product.name} - Flowmazon`,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
};

const ProductPage = async ({ params }: Props) => {
  const product = await getProduct(params.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 md:items-center px-5">
      <Image
        alt={product.name}
        src={product.imageUrl}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div className="">
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6 text-justify">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
};

export default ProductPage;
