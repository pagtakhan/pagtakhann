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

  app.post("/items", (req, res) => {
    const { name, price } = req.body; 
    if (!name || price == null) { 
      return res.status(400).json({ message: "Name and price are required" });
    }
  
    const newItem = {
      id: mockData.length + 1, 
      name,
      price,
    };
  
    mockData.push(newItem); 
    res.status(201).json(newItem); 
  });
  

  app.put("/items/:id", (req, res) => {
    const item = mockData.find((b) => b.id === parseInt(req.params.id)); 
    if (!item) return res.status(404).json({ message: "Item not found" }); 
  
    const { name, price } = req.body; 
    if (name) item.name = name; 
    if (price != null) item.price = price;
  
    res.json(item); 
  });
  
  
  app.delete("/items/:id", (req, res) => {
    const index = mockData.findIndex((b) => b.id === parseInt(req.params.id)); // Return 404 if not found
  
    mockData.splice(index, 1); 
    res.status(204).send();
  });