import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../store/features/user/user.slice";

export default function ProductItem({ productItem, inCart }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(productItem));
    console.log(productItem);
  };

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(productItem))
  }

/*   if (!productItem.available) return; */
  return (
    <>
      <div>{productItem.title}</div>
      <div>{productItem.model}</div>
      <div>£{productItem.price}</div>
      <img className=" h-24" src={productItem.image} alt="" />

      {!inCart && (
        <button
          onClick={handleAddToCart}
          className="rounded bg-green-400 p-2 text-white hover:bg-green-600 "
        >
          BUY
        </button>
      )}
      {inCart && (
        <button onClick={handleDeleteFromCart} className="rounded bg-red-600 p-2 text-white hover:bg-red-800 ">
          Delete
        </button>
      )}
    </>
  );
}
