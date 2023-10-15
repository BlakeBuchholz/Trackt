const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { renderToString } = require("react-dom/server");
const React = require("react");
const App = require("../../src/App.js").default;
const server = express();

require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

server.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

require("./config/passport")(passport);

server.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.initialize());
server.use(passport.session());

// Authentication routes
server.get("/api/auth/steam", passport.authenticate("steam"));
server.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => res.redirect("/profile")
);

// API route to get authenticated user data
server.get("/api/getUser", (req, res) =>
  req.isAuthenticated()
    ? res.json({ steamId: req.user.steamId, displayName: req.user.displayName })
    : res.json({})
);

// Implement CheckAppOwnership
server.get("/api/checkAppOwnership/:appid", async (req, res) => {
  // This route should handle checking app ownership for a specific user (req.user.steamId)
  // You need to pass the appid in the URL parameters like /api/checkAppOwnership/123456
  // Implement the CheckAppOwnership logic here using Steam's Web API.
  // Example code using axios:
  const axios = require("axios");
  const apiKey = "your_steam_api_key";
  const url = `https://partner.steam-api.com/ISteamUser/CheckAppOwnership/v2/?key=${apiKey}&steamid=${req.user.steamId}&appid=${req.params.appid}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error checking app ownership:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Logout route
server.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Handle profile route
server.get("/profile", (req, res) =>
  req.isAuthenticated() ? res.redirect("/") : null
); // Add more logic if needed for profile rendering

// Static assets
server.use("/static", express.static(path.join(__dirname, "../build/static")));

// SSR logic
server.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  const appString = renderToString(React.createElement(App));
  fs.readFile(
    path.join(__dirname, "../public/index.html"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading index.html:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${appString}</div>`
        )
      );
    }
  );
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
