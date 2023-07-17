import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormButton from "@/components/FormButton";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product - Flowmazon",
};

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);

  const addProduct = async (formData: FormData) => {
    "use server";
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if (!name || !description || !imageUrl || !price) {
      throw Error("Missing required fields");
    }

    await prisma.product.create({
      data: { name, description, imageUrl, price },
    });
    redirect("/");
  };

  if (!session) {
    //redirect('/api/auth/signin')
    //will get back to here after login
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct} className="max-w-xl">
        {/* name */}
        <input
          type="text"
          className="input input-bordered mb-3 w-full"
          name="name"
          placeholder="Name"
        />

        {/* description */}
        <textarea
          name="description"
          required
          className="textarea-bordered textarea mb-3 w-full"
          placeholder="Description"
        />

        {/* image url */}
        <input
          type="url"
          className="input input-bordered mb-3 w-full"
          name="imageUrl"
          placeholder="Image URL"
        />

        {/* price */}
        <input
          type="text"
          className="input input-bordered mb-3 w-full"
          name="price"
          placeholder="Price"
        />

        <FormButton className="btn-block">Add Product</FormButton>
      </form>
    </div>
  );
};

export default AddProductPage;
