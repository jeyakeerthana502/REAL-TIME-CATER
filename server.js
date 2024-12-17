const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

let bookings = [];

app.post("/api/book", (req, res) => {
  const { date, name, email } = req.body;
  if (bookings.some((b) => b.date === date)) {
    res.status(400).json({ message: "Date is already booked!" });
  } else {
    bookings.push({ date, name, email });
    res.status(200).json({ message: "Booking successful!" });
  }
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
