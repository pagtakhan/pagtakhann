const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
const mockData = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
  ];
  app.get("/items", (req, res) => {
    res.json(mockData); // to send the books array as a response
  });

  app.get("/items/:id", (req, res) => {
    const Data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the book by id
    if (!Data) return res.status(404).json({ message: "Book not found" }); // to send a 404 status code and a message if the book is not found
    res.json(Data); // to send the book as a responsex
  });
  