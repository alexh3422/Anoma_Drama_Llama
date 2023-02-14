const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const dayjs = require("dayjs");
const cron = require("node-cron");
const Llama = require("./models/llama");

const allRoutes = require("./controllers");
const sequelize = require("./config/connection");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

cron.schedule("*/120 * * * *", () => {
  Llama.findAll().then((llamas) => {
    llamas.forEach((llama) => {
      const updatedHappiness =
        llama.happiness - 1 > 0 ? llama.happiness - 1 : 0;
      llama.update({ happiness: updatedHappiness });
    });
  });
});

// console.log(cron.validate("25  * * * * *"));

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(allRoutes);

app.get("/sessions", (req, res) => {
  res.json(req.session);
});

Handlebars.registerHelper("dateFormat", function (dateData) {
  return dayjs(dateData).format("MMM DD YYYY, HH:mm");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT}`)
  );
});
