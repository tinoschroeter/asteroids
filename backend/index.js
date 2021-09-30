import express from "express";
const app = express();

app.get("/api", (req, res) => {
  const data = {};

  data.status_2xx = Math.floor(Math.random() * 140 + 10);
  data.status_3xx = Math.floor(Math.random() * 50);
  data.status_4xx = Math.floor(Math.random() * 40);
  data.status_5xx = Math.floor(Math.random() * 20);
  data.requests =
    data.status_2xx + data.status_3xx + data.status_4xx + data.status_5xx;

  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is runngin on Port ${port}`);
});
