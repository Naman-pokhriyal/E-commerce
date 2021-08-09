const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/Ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Established"))
  .catch((e) => console.log(e));

app = express();
app.use(express.json());
app.use(
  session({
    secret: "India",
    cookie: { maxAge: 300000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

userTable = mongoose.model("users", userSchema);

// Functions

const AddNewUser = async (name, email, password) => {
  await new userTable({
    name,
    email,
    password,
  }).save();
};

const CheckUser = async (email, password = 0, pass = false) => {
  if (!pass) {
    const check = await userTable.find({ email }).countDocuments();
    return check;
  }
  await userTable.findOne({ email, password }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      user == null ? (check = false) : (check = user);
    }
  });
  console.log(check);
  return check;
};
// POST
app.post("/signups", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (name.length && email.length && password.length) {
    if (!(await CheckUser(email))) {
      AddNewUser(name, email, password);
      res.send({ msg: "Account Successfully Created", key: true });
    } else {
      res.send({ msg: "Account ALready Exists", key: true });
    }
  } else {
    res.send({ msg: "Fill All Fields", key: false });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let result = false;
  if (email.length && password.length) {
    result = await CheckUser(email, password, true);
    if (result) {
      req.session.user = result;
      res.send({ msg: "Accepted", key: true });
    } else {
      res.send({ msg: "Account Not Found!", key: false });
    }
  } else {
    res.send({ msg: "Fill All Fields", key: false });
  }
});

// GET
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false, user: { _id: false } });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.send({ task: true });
  });
});
app.listen(3001);
