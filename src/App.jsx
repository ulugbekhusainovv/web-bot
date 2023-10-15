import "./App.css";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getData } from "./constans/db";
import Card from "./components/card/card";
import Cart from "./components/cart/cart";

const telegram = window.Telegram.WebApp;

const courses = getData();
export default function App() {
  useEffect(() => {
    telegram.ready();
  });

  const [cartItems, setcartItems] = useState([]);

  const onAddItem = (item) => {
    const existItem = cartItems.find((c) => c.id == item.id);
    if (existItem) {
      const Newdata = cartItems.map((c) =>
        c.id == item.id ? { ...existItem, quantity: existItem.quantity + 1 } : c
      );
      setcartItems(Newdata);
    } else {
      const Newdata = [...cartItems, { ...item, quantity: 1 }];
      setcartItems(Newdata);
    }
  };

  const onRemoveItem = (item) => {
    const existItem = cartItems.find((c) => c.id == item.id);
    if (existItem.quantity === 1) {
      const Newdata = cartItems.filter((c) => c.id !== existItem.id);
      setcartItems(Newdata);
    } else {
      const Newdata = cartItems.map((c) =>
        c.id == existItem.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c
      );
      setcartItems(Newdata);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib Olish :)";
    telegram.MainButton.show();
  };

  const onSendData = useCallback(() => {
    const queryID = telegram.initDataUnsave?.query_id;
    if (queryID) {
      fetch("https://ulugbekweb-bot-b4b33533afd7.herokuapp.com/web-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cartItems, queryID: queryID }),
      });
    } else {
      telegram.sendData(JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);
  return (
    <>
      <h1 className="heading">Burger food</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards_container">
        {courses.map((course) => (
          <Card
            key={course.id}
            course={course}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </>
  );
}
