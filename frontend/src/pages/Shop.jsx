import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import showplate from "/photos/show plate 1.jpg";
import { useNavigate } from "react-router-dom";
import Card2 from "../components/Card2";
import { useSelector } from "react-redux";

export default function Shop() {
  const [rangeValues, setRangeValues] = useState([0, 2000]);
  const [list, setList] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    searchTerm: "",
    type: "",
    lowrange: 0,
    maxrange: 2000,
  });
  const productCategoryData= useSelector((state)=>state.product)
  const {loading,productCategorys,error}=productCategoryData;
  const navigate = useNavigate();
  //   console.log(rangeValues)
  // console.log(list)
  const handleRangeChange = (values) => {
    setRangeValues(values);
  };

  //setting the range into searchCriteria state
  useEffect(() => {
    setSearchCriteria({
      ...searchCriteria,
      lowrange: rangeValues[0],
      maxrange: rangeValues[1],
    });
  }, [rangeValues]);
//   console.log(searchCriteria);
  //getting the search term from url which we entered in header input box and setting the data into searchCriteria state
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    const typeinUrl = urlParams.get("type");
    const lowrangeUrl = +urlParams.get("lowrange");
    var maxrangeUrl = +urlParams.get("maxrange");
    if(maxrangeUrl === 0){
      maxrangeUrl=2000
    }
    console.log(typeinUrl, searchTermUrl, lowrangeUrl, maxrangeUrl);
    if (searchTermUrl || typeinUrl || lowrangeUrl || maxrangeUrl) {
      setSearchCriteria({
        searchTerm: searchTermUrl || '',
        type: typeinUrl || "",
        lowrange: lowrangeUrl || 0,
        maxrange: maxrangeUrl || 2000,
      });
    }
    setRangeValues([lowrangeUrl, maxrangeUrl]);
    //sending request to backend with the condition and getting back data
    const fetchListingData = async () => {
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/product/list?${searchQuery}`);
        const data = await res.json();
        //console.log(data)
        setList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListingData();
  }, [location.search]);
  //showing our search criteria in url
  const uploadDatainUrl = (e) => {
    e.preventDefault();
    const urlParam = new URLSearchParams(window.location.search);
    urlParam.set("type", searchCriteria.type);
    urlParam.set("lowrange", searchCriteria.lowrange);
    urlParam.set("maxrange", searchCriteria.maxrange);
    urlParam.set("searchTerm", searchCriteria.searchTerm);
    const searchQuery = urlParam.toString();
    navigate(`/shop?${searchQuery}`);
  };

  const trackStyle = [{ backgroundColor: "black" }];
  const handleStyle = [
    { backgroundColor: "black", borderColor: "black" },
    { backgroundColor: "black", borderColor: "black" },
  ];
  const setType = (value) => {
    console.log(value);
    setSearchCriteria({ ...searchCriteria, type: value });
  };

  return (
    <main className="mx-auto pt-5 px-20 w-5/5  flex gap-5">
      <section className=" w-1/4   ">
        <form className="flex flex-col gap-10" onSubmit={uploadDatainUrl}>
          <div className="w-full  flex flex-col gap-3 font-semibold">
            <div className="text-slate-700 uppercase text-lg ">
              Product categories
            </div>
            
            <div className="text-slate-600 flex flex-col  justify-start items-start">
            {productCategorys.map((data,index)=>{
              return(
                <button
                onClick={(e) => setType(e.target.id)}
                id={data.categories}
                key={index}
                className={`cursor-pointer hover:text-yellow-600  ${
                  searchCriteria.type === data.categories ? "text-yellow-600" : ""
                } `}
              >
                {data.categories}
              </button>
              )
            })}
              {/* <button
                onClick={(e) => setType(e.target.id)}
                id="mutton"
                className={`cursor-pointer hover:text-yellow-600  ${
                  searchCriteria.type === "mutton" ? "text-yellow-600" : ""
                } `}
              >
                Mutton
              </button>
              <button
                onClick={(e) => setType(e.target.id)}
                id="chicken"
                className={`cursor-pointer hover:text-yellow-600  ${
                  searchCriteria.type === "chicken" ? "text-yellow-600" : ""
                } `}
              >
                Chicken
              </button>
              <button
                onClick={(e) => setType(e.target.id)}
                id="prawn"
                className={`cursor-pointer hover:text-yellow-600  ${
                  searchCriteria.type === "prawn" ? "text-yellow-600" : ""
                } `}
              >
                Prawn
              </button>
              <button
                onClick={(e) => setType(e.target.id)}
                id="crab"
                className={`cursor-pointer hover:text-yellow-600  ${
                  searchCriteria.type === "crab" ? "text-yellow-600" : ""
                } `}
              >
                Crabs
              </button>
              <button
                onClick={(e) => setType(e.target.id)}
                id="egg"
                className={`cursor-pointer hover:text-yellow-600  ${
                  searchCriteria.type === "egg" ? "text-yellow-600" : ""
                } `}
              >
                Egg
              </button> */}
            </div>
          </div>
          <div className="w-full h-20  flex flex-col gap-4">
            <div className="upparcase">Filter by price</div>
            <Slider
              range
              min={0}
              max={2000}
              step={1}
              value={rangeValues}
              onChange={handleRangeChange}
              trackStyle={trackStyle}
              handleStyle={handleStyle}
            />
            <div className="flex justify-between items-center">
              <div>
                Price: &#8377;{rangeValues[0]} - &#8377;{rangeValues[1]}
              </div>
              
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br hover:scale-110  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Search
            </button>
          </div>
        </form>
      </section>
      <section className=" w-3/4">
        <div className="w-full  overflow-hidden border rounded-lg">
          <img
            src="https://emeat.in/wp-content/uploads/2023/08/Untitled-design-2.png"
            className="object-contain w-full "
          />
        </div>
        <div className="flex gap-0 py-3 flex-wrap">
        {list.map((data,index)=>{
            return(
                <Card2 data={data} key={index} />
            ) 
        })}
        {/* <Card2 list={list}  /> */}
         </div>
      </section>
    </main>
  );
}
