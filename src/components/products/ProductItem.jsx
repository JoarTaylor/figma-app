import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/user/user.slice";

export default function ProductItem({ productItem, inCart }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(productItem));
    console.log(productItem);
  };

  if (!productItem.available) return;
  return (
    <>
      <div>{productItem.brand}</div>
      <div>{productItem.model}</div>
      <div>{productItem.sale}% SALE</div>
      <div>£{productItem.price}</div>

      {!inCart && (
        <button
          onClick={handleAddToCart}
          className="rounded bg-green-400 p-2 text-white hover:bg-green-600 "
        >
          BUY
        </button>
      )}
      {inCart && (
        <button className="rounded bg-red-600 p-2 text-white hover:bg-red-800 ">
          Delete
        </button>
      )}
    </>
  );
}
