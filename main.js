import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

const debounce = (callback, timer) => {
  let timeour = null;
  return (...args) => {
    clearTimeout(timeour);
    timeour = setTimeout(() => {
      callback(...args);
    }, timer);
  };
};

const handleChange = (e) => {
  let q = e.target.value;
  fetch(`https://dummyjson.com/products/search?q=${q}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.products);
      let listProduct = data.products.map((product) => {
        return `<h5> ${product.title} </h5>`;
      });

      document.querySelector("#app").innerHTML = listProduct.join("");
    });
};

let firstout = false;
let lastout = null;
const handleChange2 = (e) => {
  if (firstout) {
    lastout = e;
    return;
  }

  let q = e.target.value;
  fetch(`https://dummyjson.com/products/search?q=${q}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.products);
      let listProduct = data.products.map((product) => {
        return `<h5> ${product.title} </h5>`;
      });

      document.querySelector("#app").innerHTML = listProduct.join("");
    });
  setTimeout(() => {
    if (lastout) {
      firstout = false;
    } else {
      firstout = false;
      handleChange2(lastout);
    }
  }, 1000);
  firstout = true;
};
document.getElementById("search").addEventListener("input", handleChange2);
