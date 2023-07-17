import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/prismadb";
import { Metadata } from "next";

interface Props {
  searchParams: {
    query: string;
  };
}

export const generateMetadata = ({
  searchParams: { query },
}: Props): Metadata => {
  return {
    title: `Search ${query} | Flowmazon`,
  };
};

const SearchPage = async ({ searchParams: { query } }: Props) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return (
      <div className="mt-10 mx-auto p-10 bg-red-100">
        <h1 className="text-2xl font-bold">No Products Found</h1>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default SearchPage;
