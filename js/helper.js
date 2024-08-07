import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";
const timeOut = function (s) {
  return new Promise(function (_, rejecte) {
    setTimeout(function () {
      rejecte(new Error("Request took to long):"));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    // if the request take time more than 10 sec so Promise will be the rejected Promise
    const res = await Promise.race([
      fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"),
      timeOut(TIMEOUT_SEC),
    ]);
    if (!res.ok) throw new Error("Something went wrong):");
    const tempData = await res.json();
    return tempData;
  } catch (err) {
    throw new Error(err);
  }
};
