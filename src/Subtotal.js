import React from "react";
import { Button } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h5>Price Details</h5>
            <strong>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </strong>
           
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <Button>Proceed</Button>
    </div>
  );
}

export default Subtotal;
