import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function Home({ searchParams: { page = "1" } }: Props) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className="flex flex-col items-center mb-4">
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />

            <div className="flex flex-col">
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6 text-justify">{products[0].description}</p>
              <Link
                className="btn btn-primary sm:place-self-end"
                href={`/product/${products[0].id}`}
              >
                Check it out
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* other items */}
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
