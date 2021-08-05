const express = require("express");
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
app.use(cors());

let userSchema = new mongoose.Schema({
  Name: String,
  email: String,
  password: String,
});

userTable = mongoose.model("users", userSchema);

//

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
      user == null ? (check = false) : (check = true);
    }
  });
  return check;
};

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

  if (email.length && password.length) {
    if (await CheckUser(email, password, true)) {
      res.send({ msg: "Accepted", key: true });
    } else {
      res.send({ msg: "Account Not Found!" });
    }
  } else {
    res.send({ msg: "Fill All Fields", key: false });
  }
});

app.listen(3001);
