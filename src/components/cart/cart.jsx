import totalPrice from "../../units/total-price";
import Button from "../button/button";
import "./cart.css";

function Cart({ cartItems, onCheckout }) {
  return (
    <div className="cart__container">
      <p>
        Umumiy narx:{" "}
        {totalPrice(cartItems).toLocaleString("uz-UZ", {
          style: "currency",
          currency: "UZS",
        })}
      </p>
      <Button
        title={`${cartItems.length === 0 ? "Buyurtma berish" : "To'lov"}`}
        disable={cartItems.length === 0 ? true : false}
        type={"checkout"}
        onClick={onCheckout}
      />
    </div>
  );
}

export default Cart;
