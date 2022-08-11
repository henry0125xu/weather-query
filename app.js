// const express = require("express");
// const app = express();
// const https = require("node:https");
// const dotenv = require('dotenv');
import fetch from "node-fetch";
import express from "express";
import dotenv from "dotenv";
const app = express();

function K_to_C(K) {
  return (K - 273.15).toFixed(2);
}

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", (req, res) => {
  dotenv.config();
  const myKey = process.env.WEATHER_API_KEY;
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;

  // ----------------------https fetch----------------------
  //   https
  //     .get(url, (res_) => {
  //       console.log("statusCode:", res_.statusCode);
  //       console.log("headers:", res_.headers);
  //       res_.on("data", (d) => {
  //         let djs = JSON.parse(d);
  //         console.log(djs);
  //         let { temp } = djs.main;
  //         let C_temp = K_to_C(temp);
  //         res.render("weather.ejs", { djs, C_temp });
  //       });
  //     })
  //     .on("error", (e) => {
  //       console.log(e);
  //     });

  // ----------------------node fetch----------------------
  fetch(url)
    .then((d) => {
      return d.json();
    })
    .then((djs) => {
      let { temp } = djs.main;
      let C_temp = K_to_C(temp);
      res.render("weather.ejs", { djs, C_temp });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000......");
});
