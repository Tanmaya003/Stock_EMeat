import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Orders() {
  const [loadingg, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  console.log(orders);
  const userdetails = useSelector((state) => state.user);
  const { currentUser } = userdetails;
  console.log(currentUser);
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        if (!currentUser._id) {
          return;
        }
        const res = await fetch(`/api/order/showOrders/${currentUser._id}`);
        const data = await res.json();

        console.log(data[0]);
        if (data.succcess === "failure") {
          return;
        }
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
 
  return (
    <div className="flex justify-center items-center pt-1">
      {loadingg ? (
        <div>Loading ...</div>
      ) : (
        <div className="bg-slate-200 h-auto w-2/5 border-[0.1px] border-slate-400 rounded-lg p-5 flex flex-col items-center justify-center gap-3 shadow-3xl ">
          {orders.map((details, index1) =>
            details.items.map((details2, index2) => (
              <div
                key={`${index1}-${index2}`}
                className="flex items-center object-contain overflow-hidden  w-full h-40  rounded-md bg-slate-100 border-[0.2px] border-slate-300"
              >
                <div className="w-2/5 h-full bg-green-500">
                  <img
                    src={details2.image}
                    alt="image"
                    className="w-full h-full object-fill"
                  />
                </div>
                <div className="w-3/5 h-full flex flex-col gap-4 p-4">
                  <div className="text-xl font-bold">{details2.name} </div>
                  <div className="text-md font-semibold">
                    <span className="text-slate-500">Ordered on </span>
                    <span className="text-slate-800 ">
                      {new Date(details.createdAt)
                        .toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/(\d+)(st|nd|rd|th)/, "$1")}
                    </span>
                  </div>

                  <div>
                  <span className="text-slate-500">Order status : </span>
                  <span className="text-slate-8s00">{details2.orderstatus} </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
