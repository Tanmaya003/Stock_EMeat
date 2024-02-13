import express from "express";
import crypto from "crypto";
import axios from "axios";

const merchant_id = "PGTESTPAYUAT";
const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";

export const newPayment =async (req, res, next) => {
    console.log(req.body.transactionId)
  try {
    const merchantTransactionId = req.body.transactionId;
    const data = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: req.body.MUID,
      name: req.body.name,
      amount: req.body.amount * 100,
      redirectUrl: `http://localhost:3000/api/payment/status/${merchantTransactionId}`,
      redirectMode: "POST",
      mobileNumber: req.body.number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    console.log(data.merchantId)
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64"); // used to encode the payload string to base64 format. This encoding is typically used for security purposes
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    //The crypto.createHash('sha256') function creates a SHA-256 hash object. This object is then updated with the concatenated string using the .update() method.
    //After updating the hash object with the string, the .digest('hex') method is called to compute the hash value in hexadecimal format. this sequence of operations generates a SHA-256 hash of the concatenated string.
    const checksum = sha256 + "###" + keyIndex;
    console.log(checksum)
    // console.log(payloadMain)
    //The purpose of generating this SHA-256 hash could be for security reasons, such as creating a checksum or signature for data integrity verification or authentication.
    //By hashing the concatenated string, you create a fixed-size, unique representation of the data that can be used to verify its integrity or authenticity later on. The salt key, if used properly, adds an additional layer of security to the hashing process.

    const prod_URL = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay";
    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return res.status(200).send(
          response.data.data.instrumentResponse.redirectInfo.url
        );
      })
      .catch(function (error) {
        console.error(error.message);
      });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

export const checkStatus = async (req, res) => {
    // return console.log(res.req.body)
  const merchantTransactionId = res.req.body.transactionId;
  const merchantId = res.req.body.merchantId;
  console.log(merchantTransactionId , merchantId)
  const keyIndex = 1;
  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };

  // CHECK PAYMENT TATUS
  axios
    .request(options)
    .then(async (response) => {
      if (response.data.success === true) {
        const url = `http://localhost:5173/paymentSuccess/${merchantTransactionId}`;
        return res.redirect(url);
      } else {
        const url = `http://localhost:5173/paymentfail`;
        return res.redirect(url);
      }
    })
    .catch((error) => {
      console.error("error happeneded in trasanction response");
    });
};
