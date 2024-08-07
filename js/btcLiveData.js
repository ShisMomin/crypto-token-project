const priceEle = document.querySelector(".price-value");
const volumeEle = document.querySelector(".volume-value");
const tradeIdEle = document.querySelector(".trade-id-value");
console.log(tradeIdEle);
let quantityEle = document.querySelector(".quantity-value");
let oldPrice = Number.MIN_SAFE_INTEGER;
let oldVolume = Number.MIN_SAFE_INTEGER;
let oldQuantity = Number.MIN_SAFE_INTEGER;
export const liveData = function () {
  const socket = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@trade"
  );
  let buffer = [];

  socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    buffer.push(message);
  };

  setInterval(() => {
    if (buffer.length === 0) return;

    const latestMessage = buffer[buffer.length - 1];
    buffer = []; // Clear the buffer

    const currPrice = parseFloat(latestMessage.p).toFixed(2);
    const currVolume = parseFloat(latestMessage.q).toFixed(6);
    const currTradeId = latestMessage.t;
    const currQuantity = parseFloat(latestMessage.q).toFixed(6);

    // Update the DOM elements
    if (priceEle) {
      priceEle.innerHTML = currPrice;
      priceEle.style.color =
        oldPrice < currPrice
          ? "green"
          : oldPrice > currPrice
          ? "red"
          : "yellow";
      oldPrice = currPrice; // Update oldPrice for the next comparison
    }
    // console.log(volume);

    // volumeEle.innerHTML = volume;
    if (volumeEle) {
      volumeEle.innerHTML = currVolume;
      volumeEle.style.color =
        oldVolume < currVolume
          ? "green"
          : oldVolume > currVolume
          ? "red"
          : "yellow";
      oldVolume = currVolume;
    }

    if (tradeIdEle) {
      tradeIdEle.innerHTML = currTradeId;
    }

    if (quantityEle) {
      quantityEle.innerHTML = currQuantity;
      quantityEle.style.color =
        oldQuantity < currQuantity
          ? "green"
          : oldQuantity > currQuantity
          ? "red"
          : "yellow";
      oldQuantity = currQuantity;
    }
  }, 1000); // Process data every 5 seconds
};
