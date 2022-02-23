const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

//Import Routes
const postsRoute = require("./routes/posts");

// Middleware
app.use(cors());
app.use("/posts", postsRoute);

//Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Connect DB
// mongoose.connect(process.env.DB_CONNECTION, () => {
//   useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify:true
//   console.log("DB connected");

// });

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
//listen
app.listen(3000);
