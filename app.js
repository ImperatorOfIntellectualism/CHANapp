const express = require("express");
const app = express();
const path = require("path");
const user = require("./models/user");
const item = require("./models/item");
const cookie = require("cookie-parser");
const nodemailer = require("nodemailer");
const config = require("./config");
const cart = require("./models/cart");

app.set("view engine", "ejs"); //Устанавливает Шаблонизатор ejs, дерьмо которое подключает к HTML различные операции с помощью <% %>
app.use(express.urlencoded({ extended: true })); //Бодипарсер нужен для получения инфы из POST метода, req.body.'имя POST'
app.use(express.static(path.join(__dirname, "public"))); //Устанавлиет правильные расширения для файлов CSS
app.use(cookie());

//app.get - срабатывание при GET запросе, app.post - срабатывание при POST запросе
//GET
app.get("/", (req, res) => {
  console.log(req.ip);
  res.render("index", {login: req.cookies['login']});
});
app.get("/cart", (req, res) => {
  res.render("cart", { login: req.cookies["login"] });
});
app.get("/login", (req, res) => {
  res.render("login", { login: req.cookies["login"] });
});
app.get("/registration", (req, res) => {
  res.render("registration");
});
//POST
app.post("/registration", (req, res) => {
  user
    .create({
      login: req.body.login,
      password: req.body.password,
      email: req.body.email,
    })
    .then((user) => console.log(user.Id))
    .catch((error) => {
      console.log(error);
    }); //Создаёт модель
  cart  //Таблица для корзины пользователя
    .create({
      user: req.body.login,
    })
    .then((user) => console.log(user.Id))
    .catch((error) => {
      console.log(error);
    });
  res.redirect("/login");
});
app.post("/handler", (req, res) => {
  item
    .find({ name: { $regex: req.body.search, $options: "i" } })
    .limit(5)
    .then((name) => {
      let list = "<ul>";
      for (i = 0; i < name.length; i++) {
        console.log(name[i].name);
        list =
          list +
          `<li onclick="fill('${name[i].name}')"><a>${name[i].name}</a></li>`;
      }
      list = list + "</ul>";
      res.send(list);
    });
});
app.post("/itemgetter", (req, res) => {
  item.findOne({ name: req.body.itemname }).then((name) => {
    a = {
      Id: name.num,
      cost: name.cost,
      quantity: name.quantity,
      description: name.description,
      image: name.image,
    };
    res.send(JSON.stringify(a));
  });
});
app.post("/carthandler", (req, res) => {
  cart
  .findOne({ user: req.body.login })
  .then((user) => {
    a = user.items//.split(',');
    res.send(JSON.stringify(a));
  });
});
app.post("/carthandler2", (req, res) => {
  item.findOne({ num: req.body.Id }).then((name) => {
    res.send(name);
  });
});
app.post("/buy", (req, res) => {
  cart
    .findOneAndUpdate({
      user: req.body.username
    },{
      $push: {items: req.body.item}
    })
    .then((user) => console.log(user.username))
    .catch((error) => {
      console.log(error);
    });
});
app.post("/deleteitemfromcart", (req, res) => {
  cart
    .findOneAndUpdate({
      user: req.body.username
    },{
      $pull: {items: req.body.item}
    })
    .then((user) => console.log(user.username))
    .catch((error) => {
      console.log(error);
    });
});
app.post("/item", (req, res) => {
  item.findOne({ name: req.body.search }).then((name) => {
    res.render("item", { itemname: name.name });
  });
});
app.post("/login", (req, res) => {
  user
    .findOne({ login: req.body.login, password: req.body.password })
    .then((user) => {
      res.cookie("login", user.login);
      res.redirect("/");
    })
    .catch((error) => {
      res.render("login", {
        error: "Ошибка: такого пользователя нет, попробуйте снова.",
      });
    });
});

app.post("/sendemail", (req, res) => {
  async function main() {
    
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL,
        pass: "15042001sd%SD",
      },
    });
    const mailOptions = {
      from: config.EMAIL,
      to: config.EMAIL,
      subject: "ЗАКАЗ",
      text: "Items: " + req.body.items + " Name: " + req.body.name
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  main()
});

module.exports = app;
