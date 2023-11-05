import { createContext, useState } from "react";

export const items = require("../items.json");

export const CartContext = createContext({
  cart: [],
  custName: "",
  streetAddress: "",
  city: "",
  state: "",
  zip: "",
  cardNumber: "",
  expirationDate: "",
  addToCart: (item) => {},
  removeFromCart: (item) => {},
  setName: (custName) => {},
  setStreetAddress: (streetAddress) => {},
  setExpirationDate: (expirationDate) => {},
  setCity: (city) => {},
  setState: (state) => {},
  setZip: (zip) => {},
  setCardNumber: (cardNumber) => {},
  setToastMessage: (message) => {},
  total: 0,
  subtotal: 0,
  taxes: 0,
  clearCart: () => {},
  resetForm: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [custName, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);  
  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);


  const TAX_RATE = 0.07;

  const clearCart = () => {
    setCart([]);
    setSubtotal(0);
    setTotal(0);
    setTaxes(0);
  };

<<<<<<< HEAD
=======
  const resetForm = () => {
    setName("");
    setStreetAddress("");
    setExpirationDate("");
    setCity("");
    setState("");
    setZip("");
    setCardNumber("");
  };

>>>>>>> 7eae950c5074d808e1e8ea6b2b7c311be8c3ef4e
  const addToCart = (item) => {
    const newCart = [...cart, item];

    let newSubtotal = newCart.reduce((acc, item) => acc + item.price, 0);
    newSubtotal = Math.round(newSubtotal * 100) / 100;
    const taxAmount = newSubtotal * TAX_RATE;
    const newTotal = Math.round((newSubtotal + taxAmount) * 100) / 100;

    setSubtotal(newSubtotal);
    setTotal(newTotal);
    setTaxes(taxAmount);
    setCart(newCart);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    setToastMessage(`Successfully removed ${item.name} from cart!`);
    setShowToast(true); // Use setShowToast
    setTimeout(() => setShowToast(false), 3000);
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const index = prevCart.lastIndexOf(item);

      if (index < 0) return prevCart;

      const newCart = [
        ...prevCart.slice(0, index),
        ...prevCart.slice(index + 1, prevCart.length),
      ];

      const newSubtotal = newCart.reduce((acc, item) => acc + item.price, 0);
      const taxAmount = newSubtotal * TAX_RATE;
      setSubtotal(newSubtotal);
      setTaxes(taxAmount);
      setTotal(newSubtotal + taxAmount);

      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        toastMessage,
        showToast,
        setShowToast,
        setToastMessage,
        custName,
        setName,
        streetAddress,
        setStreetAddress,
        expirationDate,
        setExpirationDate,
        city,
        setCity,
        state,
        setState,
        zip,
        setZip,
        cardNumber,
        setCardNumber,
        total,
        subtotal,
        taxes,
        clearCart,
<<<<<<< HEAD
        cartLength,
=======
        resetForm,
>>>>>>> 7eae950c5074d808e1e8ea6b2b7c311be8c3ef4e
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
