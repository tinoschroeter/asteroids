import express from "express";
const app = express();

app.get("/api", (req, res) => {
  const data = {};

  data.i2 = Math.floor(Math.random() * 140 + 10);
  data.i3 = Math.floor(Math.random() * 50);
  data.i4 = Math.floor(Math.random() * 40);
  data.i5 = Math.floor(Math.random() * 20);
  data.requests = data.i2 + data.i3 + data.i4 + data.i5;

  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is runngin on Port ${port}`);
});
