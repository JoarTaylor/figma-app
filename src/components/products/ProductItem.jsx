import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/user/user.slice";

export default function ProductItem({ productItem }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(productItem))
    console.log(productItem)
    };

  

  if (!productItem.available) return;
  return (
    <>
      <div>{productItem.brand}</div>
      <div>{productItem.model}</div>
      <div>{productItem.sale}% SALE</div>
      <div>£{productItem.price}</div>
      <button
        onClick={handleAddToCart}
        className=" rounded bg-green-400 p-2 text-white hover:bg-green-600 "
      >
        BUY
      </button>
    </>
  );
}
