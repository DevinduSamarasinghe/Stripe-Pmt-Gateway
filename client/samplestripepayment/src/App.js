import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // console.log("pk_test_51Mw7BcEf2vcCXQ0lbllwYNjyfqtfMJHltq0zXWgaPwKrzgG35Hs9p2vta3MAlnFxOS5W0sPWWDEbuDlWVllrDwqo00K2blZ4gL");
  const key =
    "pk_test_51Mw7BcEf2vcCXQ0lbllwYNjyfqtfMJHltq0zXWgaPwKrzgG35Hs9p2vta3MAlnFxOS5W0sPWWDEbuDlWVllrDwqo00K2blZ4gL";

  //toast.configure();

  //object for amount to be passed
  const [product] = useState({
    //if it ever uses useState, const has to be within the array bracket
    name: "Sample Game",
    price: 200,
    description: "This is a sample game",
  });

  const handleToken = async (token, address) => {
    const response = await axios.post("http://localhost:5000/checkout", {
      token,
      product,
    }); //passing the token and the product information to the checkout

    //take response
    console.log(response.status);
    if (response.status === 200) {
      toast("Payment is Completed", { type: "success" });
    } else {
      toast("Payment is unsuccessful", { type: "error" });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center">Stripe Payment Checkout Demo</h1>
        <br></br>
        <div className="form-group container">
          <div className="form-group container text-center">
            <h2>Product Info</h2>
            <h3>{product.name}</h3>
            <h3>{product.description}</h3>
          </div>
          
          <StripeCheckout
            className=""
            style={{
              display: "flex",
              width: "20%",
              justifyContent: "center",
            }}
            stripeKey={key}
            token={handleToken}
            amount={product.price * 100}
            name={product.name}
            billingAddress
            shippingAddress
          ></StripeCheckout>
        </div>
      </div>
    </div>
  );
}

export default App;
