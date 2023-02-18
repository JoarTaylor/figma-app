

export default function ProductItem({ productItem }) {

   

 if(!productItem.available) return
  return (
    <>
      <div>{productItem.brand}</div>
      <div>{productItem.model}</div>
      <div>{productItem.sale}% SALE</div>
      <div>£{productItem.price}</div>
    </>
  );
}
