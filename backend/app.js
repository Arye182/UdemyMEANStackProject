const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

// URL encode your password if it contains special characters
const username = "devenvuser";
const password = encodeURIComponent("MongoDb182");
const cluster = "cluster0.wilzben";
const dbname = "posts-full-stack";

mongoose
  .connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.error("Connection failed: ", error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts/", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save();
  res.status(201).json({ message: "post added successfuly!" });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    { id: "fsdfsdfsdfs", title: "first", content: "this is from server" },
    { id: "fs4565fsdfs", title: "second", content: "this is from server!" },
  ];
  res.status(200).json({ message: "Posts fetched successfuly!", posts: posts });
});

module.exports = app;
