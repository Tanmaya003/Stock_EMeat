import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";

export default function ProductPage() {
  const [details, setDetails] = useState({
    image: "",
    name: "",
    description: "",
    category: "",

    numReviews: 1,
    rating: 0,
    reviews: "",
    weightPriceData: [{ weight: "", price: 0, countInStock: 1 }],
  });
  const [wishdetails, setwishDetails] = useState({
    image: "",
    name: "",
    userId: "",
    productId: "",
    _id: "",
  });
  const [cartIdDetail, setCartDetails] = useState({
    productId: "",
    name: "",
    image: "",
    quantity: "",
    price: 0,
    userId: "",
    countNo: 1,
  });
  const [wishlistAdded, setwishlistAdded] = useState(false);
  const [isStock, setIsStock] = useState(true);
  const [stockAmount, setStockAmount] = useState();
  const [showIndividualStock, setIndividualSotck] = useState(false);
  const [indexval, setIndex] = useState();
  const params = useParams();
  const [count, setCount] = useState(0);
  const [togglee, setToggle] = useState(true);
  const [isadminstrator, setIsAdministrator] = useState(false);
  const userdetails = useSelector((state) => state.user);
  const { loading, currentUser, failure } = userdetails;
  const navigate = useNavigate();
  // console.log(details);
  // console.log(userdetails);
  // console.log(params.id);
  console.log(wishdetails);
  useEffect(() => {
    // console.log(params.id);
    // console.log("hello");
    const fetchData = async () => {
      try {
        console.log(`/api/product/get/${params.id}`);
        const res = await fetch(`/api/product/get/${params.id}`);
        console.log("process initalized");
        const data = await res.json();
        // console.log(data);
        setDetails(data);

        const res2 = await fetch(
          `/api/user/getWishlist?user=${currentUser._id}&product=${params.id}`
        );
        console.log("process initalized");
        const data2 = await res2.json();
        // console.log(data2);

        if (data2.length != 0) {
          setwishlistAdded(true);
          setwishDetails(data2[0]);
        } else {
          setwishlistAdded(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    setwishDetails({
      ...wishdetails,
      name: details.name,
      image: details.image,
      userId: currentUser._id,
      productId: details._id,
    });
  }, [details, currentUser]);

  useEffect(() => {
    setStock();
  }, [details]);
  useEffect(() => {
    if (
      currentUser.usertype === "admin" ||
      currentUser.usertype === "employee"
    ) {
      setIsAdministrator(true);
    }
  }, []);

  const setStock = () => {
    const isInStock = details.weightPriceData.some(
      (product) => product.countInStock > 0
    );
    setIsStock(isInStock);
  };

  const checkIndivisualStock = (index, amount) => {
    console.log(index);
    const amountInstock = details.weightPriceData[index].countInStock;
    console.log(amountInstock);
    setStockAmount(amountInstock);
    setIndividualSotck(true);
    setIndex(index);
    setCartDetails({
      ...cartIdDetail,
      quantity: amount,
      price: details.weightPriceData[index].price,
    });
  };

  useEffect(() => {
    setCartDetails({
      ...cartIdDetail,
      userId: currentUser._id,
      productId: details._id,
      countNo: count,
      image: details.image,
      name: details.name,
    });
  }, [indexval, count]);
  console.log(cartIdDetail);
  const closeIndivisualStock = () => {
    setIndividualSotck(false);
  };
  const upcount = () => {
    setCount(count + 1);
  };
  const downcount = () => {
    if (count == 0) return;
    setCount(count - 1);
  };
  const toggleDesc = () => {
    setToggle(true);
  };
  const toggleReview = () => {
    setToggle(false);
  };

  const goToEditPage = () => {
    navigate(`/product/edit/${details._id}`);
  };

  const addToWishlist = async () => {
    console.log(wishdetails);
    try {
      if (wishlistAdded) {
        const res = await fetch(`/api/user/deleteWishlist/${wishdetails._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.succcess === "failure") {
          return;
        }
        console.log("wishlist deleted");
        setwishlistAdded(false);
      } else {
        console.log(wishdetails);
        const { _id, ...rest } = wishdetails;
        console.log(rest);
        const res = await fetch("/api/user/addWishlist", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(rest),
        });
        const data = await res.json();
        if (data.succcess === "failure") {
          return;
        }
        setwishlistAdded(true);
        console.log("added to wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addtoCart = async () => {
    try {
      const res = await fetch("/api/cart/addToCart", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(cartIdDetail),
      });
      const data = await res.json();
      console.log(data);
      alert("item added to cart");
      navigate(`/cart`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col gap-5 pt-5 px-[200px]">
      <section className="flex flex-col gap-5 ">
        <div className="flex justify-between px-0">
          <div className=" text-3xl font-bold">{details.name}</div>
          {isadminstrator && (
            <button
              type="button"
              onClick={goToEditPage}
              className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Edit
            </button>
          )}
        </div>
        <div>
          <div className=" rounded-sm flex gap-2">
            <span className="font-semibold text-slate-500">Weight :</span>
            <span className="flex gap-2">
              {details.weightPriceData &&
                details.weightPriceData.map((data, index) => {
                  return (
                    <>
                      <div className="flex gap-2" key={index}>
                        <div>{data.weight}</div>:
                        <div>
                          {data.price}
                          {index < details.weightPriceData.length - 1 && (
                            <span> , </span>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
            </span>
          </div>
        </div>
        <div className="flex gap-5 mx-auto  w-full">
          <div className="w-2/5 h-[380px] overflow-hidden  object-contain ">
            <img className="object-cover  w-full" src={details.image} />
          </div>
          <div className="w-3/5  p-5 flex flex-col gap-4">
            <div className="text-red-500 text-3xl font-semibold ">
              {details.weightPriceData.length - 1 != 0 ? (
                <div>
                  &#8377;{details.weightPriceData[0].price} - &#8377;
                  {
                    details.weightPriceData[details.weightPriceData.length - 1]
                      .price
                  }
                </div>
              ) : (
                <div>&#8377;{details.weightPriceData[0].price}</div>
              )}
            </div>
            <div className="text-green-600 bg-green-200 font-semibold w-24 text-center border rounded-lg text-sm">
              {isStock ? <div>IN STOCK </div> : <div>OUT OF STOCK </div>}
            </div>
            <div className="border-[1px] p-1 border-gray-300"> Amount</div>
            <div className="flex gap-2">
              {details.weightPriceData &&
                details.weightPriceData.map((data, index) => {
                  return (
                    <>
                      <div className="flex flex-col  gap-0" key={index}>
                        <button
                          type="button"
                          className="text-gray-400 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-white dark:text-gray-500 dark:border-gray-400  dark:hover:border-gray-500 dark:focus:ring-gray-400"
                          onClick={() =>
                            checkIndivisualStock(index, data.weight)
                          }
                        >
                          {data.weight}
                        </button>
                        {indexval === index && showIndividualStock && (
                          <div
                            className="flex gap-1 justify-start items-center text-xs cursor-pointer"
                            onClick={closeIndivisualStock}
                          >
                            <RxCross2 />
                            Cancel{" "}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
            </div>
            <div>
              {showIndividualStock &&
                (stockAmount > 5 ? (
                  <div>In stock</div>
                ) : (
                  <div>Hurry ! only {stockAmount} left</div>
                ))}
            </div>
            <div className="flex gap-4 items-center justify-start">
              <div className="flex gap-4 items-center justify-start">
                <div
                  className="h-10 w-10 text-center font-bold text-lg cursor-pointer border rounded-full pt-1 active:outline-none focus:outline-none  hover:bg-yellow-500"
                  onClick={downcount}
                >
                  -
                </div>
                <div>{count}</div>
                <div
                  className="h-10 w-10 text-center font-bold text-lg cursor-pointer border rounded-full pt-1  hover:bg-yellow-500"
                  onClick={upcount}
                >
                  +
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={addtoCart}
                  className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  focus:outline-none   shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Add to cart
                </button>
              </div>
            </div>
            <div className=" w-2/5">
              <button
                onClick={addToWishlist}
                className={`flex justify-center items-center border-[1px] border-gray-400 rounded-xl px-2 text-gray-500 hover:border-1 hover:border-yellow-600 ${
                  wishlistAdded ? "text-red-500 font-semibold " : ""
                }`}
              >
                <CiHeart
                  className={`${
                    wishlistAdded
                      ? "text-red-500 font-bold text-2xl"
                      : "hover:text-red-500 font-bold text-xl "
                  }`}
                />
                {wishlistAdded ? "Added to wihslist" : "Add to wishlist"}
              </button>
            </div>
            <div className="flex gap-2">
              <div className="text-gray-500">category : </div>
              <div>{details.category}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 font-semibold text-xl text-slate-600">
            <button
              className={`${togglee ? "text-gray-400" : "text-gray-800"} `}
              onClick={toggleDesc}
            >
              Description
            </button>
            <button
              className={`${!togglee ? "text-gray-400" : "text-gray-800"} `}
              onClick={toggleReview}
            >
              Reviews
              <span className=" mx-1 h-5 w-6 px-1 border-[1px] rounded-full border-gray-500 text-xs">
                {details.numReviews}
              </span>
            </button>
          </div>
          <div>
            {togglee ? (
              <div>{details.description}</div>
            ) : (
              <div>
                {" "}
                {details.numReviews > 0 ? (
                  <div>{details.reviews} </div>
                ) : (
                  <div>No review till now </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <section>Related products</section>
    </main>
  );
}
