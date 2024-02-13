import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCartstore } from "../redux/user/cartSlice";

export default function PaymentSuccess() {
  const [order, orderDone] = useState(true);
  const navigate = useNavigate();
  const { trasanctionId } = useParams();
  const cartDetails = useSelector((state) => state.cart);
  const { cart } = cartDetails;
  const userDetail = useSelector((state) => state.user);
  const { currentUser } = userDetail;
  console.log(cart);
  const dispatch = useDispatch();
  const [state, updateState] = useState({
    userId: currentUser._id,
    totalAmount: cart.totalAmount,
    totalNum: cart.totalNum,
    paymentStatus: true,
    items: {
      productId: cart.item[0].productId,
      name: cart.item[0].name,
      image: cart.item[0].image,
      quantity: cart.item[0].quantity,
      price: cart.item[0].price,
      countNo: cart.item[0].countNo,
      orderstatus: "ordered",
      cartId: cart.item[0]._id
    },
    address: cart.address,
  });
  console.log(state);
  useEffect(() => {
    const uploadOrder = async () => {
      try {
        const res = await fetch("/api/order/upload", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(state),
        });
        const data = await res.json();
        if (data.success === false) {
          console.log("Order Failed ");
          return;
        }
        console.log(data);

        // deleting cart data
        const res2 = await fetch(`/api/cart/deleteCart/${currentUser._id}`, {
          method: "DELETE",
        });
        const data2 = await res2.json();
        if (data2.success === false) {
          console.log("Cart delteion failed ");
          return;
        }
        console.log(data2);
        

        setTimeout(() => {
          orderDone(false);
          dispatch(deleteCartstore());
          navigate("/profile/orders");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    uploadOrder();
  }, []);

  return <>{order && <div>Order Done</div>}</>;
}
