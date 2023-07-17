import { getCart } from "@/lib/cart";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  const handleSearch = async (formData: FormData) => {
    "use server";
    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
      redirect(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="bg-base-100 mb-4">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        {/* logo */}
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image alt="logo" src="/images/logo.png" width={40} height={40} />
            Flowmazon
          </Link>
        </div>

        <div className="gap-2 flex-none">
          {/* search */}
          <form action={handleSearch}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search..."
                className="input input-bordered w-full min-w-[100px] focus:outline-none"
              />
            </div>
          </form>

          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
