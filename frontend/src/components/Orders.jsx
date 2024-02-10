import React, { useState } from "react";

export default function Orders() {
const arr= [1,[2,3],[4,[5,6,8]]]
const result = [].concat.apply([],arr)
const result2= [].concat(...arr)
const result3= arr.flat();
console.log(result);
// Function to perform the MergeSort algorithm
  return <div>{result3}</div>;
}
