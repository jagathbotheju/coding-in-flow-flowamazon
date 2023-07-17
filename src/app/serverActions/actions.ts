"use server";

import { createCart, getCart } from "@/lib/cart";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (productId: string) => {
  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find((item) => item.productId === productId);
  const deletedProduct = await prisma.cartItem.delete({
    where: { id: articleInCart?.id },
  });

  revalidatePath("/cart");
  if (deletedProduct) return { message: "Product Deleted" };
};

export const setProductQuantity = async (
  productId: string,
  quantity: number,
) => {
  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: {
        quantity,
      },
    });
  }

  revalidatePath("/cart");
};

export const incrementProductQuantity = async (productId: string) => {
  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cartItem.update({
      where: {
        id: articleInCart.id,
      },
      data: {
        quantity: { increment: 1 },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  revalidatePath(`/product/[id]`);
};
