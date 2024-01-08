import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function ListingPage() {
  
  const [imageFile, setImageFile] = useState([]);
  const [filePercentage, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    image: "",
    name: "",
    description: "",
    category: "",
    
    numReviews: 1,
    rating: 0,
    reviews: "",
    weightPriceData: [
      { weight: "500mg", price: 1000 ,countInStock: 1},
    ],
  });
 
  // console.log(wprice)
  console.log(formdata)
  const addEntryData = () => {
    setFormdata({
      ...formdata,
      weightPriceData: [...formdata.weightPriceData, { weight: "", price: 0 }],
    });
  };
  // console.log(formdata.weightPriceData)
  const deleteDataEntered = (indexdata) => {
    if (formdata.weightPriceData.length == 1) {
      return;
    }
    console.log(indexdata);
    console.log(formdata.weightPriceData);
    
    setFormdata((prevWprice) => {
      return {
        ...prevWprice,
        weightPriceData: prevWprice.weightPriceData.filter(
          (data, index) => index !== indexdata
        ),
      };
    });
  };
  const setwetPricedata = (e, index) => {
    const { id, value } = e.target;

    setFormdata((prevWprice) => {
      return {
        ...prevWprice,
        weightPriceData: prevWprice.weightPriceData.map((entry, i) => {
          if (i === index) {
            // Update the specific element
            
              return { ...entry, [id]: value };
            
          } else {
            // Keep other elements unchanged
            return entry;
          }
        }),
      };
    });
  };
  //firebase storage
  // allow read;
  //   allow write: if
  //   request.resource.size < 2 * 1024*1024 &&
  //   request.resource.contentType.matches('image/.*')

  const storeImage = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    // console.log(file , fileName)
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    uploadTask.on(
      "state_changed", //to track state changes
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        //error handeling
        setFileUploadError(true);
        setUploading(false);
      },
      () => {
        //setting the url to avatar
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormdata({ ...formdata, image: downloadUrl });
          setUploading(false);
        });
      }
    );
  };
  const handleDeleteImage = () => {
    setFormdata({
      ...formdata,
      image: "",
    });
  };
  const handleChange = (e) => {
    console.log(typeof e.target.value);
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log("failed ");
        return;
      }
      // setFormdata(data);
      console.log(data);
      navigate(`/product/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-10">
      <form className="flex gap-5" onSubmit={handleSubmit}>
        <div className="w-1/2  flex flex-col p-4 border-2 border-slate-200 rounded-lg gap-3">
          <label>Enter product name</label>
          <input
            type="text"
            placeholder="product name"
            className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
            defaultValue={formdata.name}
            id="name"
            onChange={handleChange}
          />
          <label>Enter product description</label>
          <input
            type="text"
            placeholder="product description"
            className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
            defaultValue={formdata.description}
            onChange={handleChange}
            id="description"
          />
          <label>Enter product category</label>
          <input
            type="text"
            placeholder="product category"
            className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
            defaultValue={formdata.category}
            onChange={handleChange}
            id="category"
          />
          <div className="flex gap-0 justify-center items-start">
            {/* <div className="flex gap-4 justify-start items-center">
              <label className="">Enter countInStock :</label>
              <input
                type="number"
                placeholder=""
                className="w-1/3 bg-slate-200  rounded-md p-2 text-sm focus:outline-none"
                defaultValue={formdata.countInStock}
                onChange={handleChange}
                id="countInStock"
              />
            </div> */}
            <div className="flex gap-2 justify-center items-center">
              <label className="">Enter product rating :</label>
              <input
                type="number"
                placeholder=""
                className=" bg-slate-200 w-1/3 rounded-md p-2 text-sm focus:outline-none"
                defaultValue={formdata.numReviews}
                onChange={handleChange}
                id="numReviews"
              />
            </div>
          </div>
          <label>Enter product weight- price description</label>
          {formdata.weightPriceData &&
            formdata.weightPriceData.map((data, index) => {
              return (
                <>
                  <div
                    className="flex gap-4 justify-center items-center"
                    key={index}
                  >
                    <input
                      type="text"
                      id="weight"
                      placeholder="product amount"
                      defaultValue={data.weight}
                      onChange={(e) => setwetPricedata(e, index)}
                      className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                    />
                    :
                    <input
                      type="number"
                      id="price"
                      onChange={(e) => setwetPricedata(e, index)}
                      placeholder="product price"
                      defaultValue={data.price}
                      className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                    />
                    <input
                      type="number"
                      id="countInStock"
                      onChange={(e) => setwetPricedata(e, index)}
                      placeholder="countInStock"
                      defaultValue={data.countInStock}
                      className="bg-slate-200 w-full rounded-md p-2 text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={addEntryData}
                      className="text-yellow-600 bg-white hover:bg-gray-300 hover:text-white border-2 border-yellow-600  font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-white dark:hover:bg-gray-600 dark:focus:none hover:border-white"
                    >
                      <FaPlus />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteDataEntered(index)}
                      className="text-yellow-600 bg-white hover:bg-gray-300 hover:text-white border-2 border-yellow-600  font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-white dark:hover:bg-gray-600 dark:focus:none hover:border-white"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </>
              );
            })}
        </div>
        <div className="w-1/2  flex flex-col p-4 border-2 border-slate-200 rounded-lg gap-3">
          <div className="flex flex-col gap-4">
            <div>Choose Image</div>
            <div>
              <input
                type="file"
                accept="image/*"
                className="p-3 border border-gray-300 rounded w-2/3 mr-2 "
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                }}
              />
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => storeImage(imageFile)}
              >
                {uploading ? "Loading..." : "Upload"}
              </button>
            </div>
            <div>Response messgae</div>
            <div>
              {formdata.image && (
                <div className="flex justify-between p-3 border items-center ">
                  <img
                    src={formdata.image}
                    alt="Listing images"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    className="p-3 text-red-600 uppercase hover:opacity-70"
                    disabled={uploading}
                    onClick={handleDeleteImage}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            type="Submit"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
