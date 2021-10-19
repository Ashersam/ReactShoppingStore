/* eslint-disable */
/* eslint-disable  */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

 async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {


  console.log('adding to cart');
  // 1. quer the cureent use check signed in or not
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be logged in');
  }
  // 2. Query the current user cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity'
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(existingCartItem)
    console.log(`there are already ${existingCartItem.quantity} in the cart`);
    // 3. See if the current iutenin the cart
  // 4. if exist incr
  return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
      resolveFields: false,
    });
  }

  // 5.  if isn't create a new cart item
  return await context.lists.CartItem.createOne({
      data:{
          product: { connect: {id: productId} },
          user: { connect: {id: session.itemId} }
      },
      resolveFields: false,
  })
}
export default addToCart