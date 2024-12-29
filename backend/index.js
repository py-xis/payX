const express = require("express");
const app = express();
const cors = require("cors");

const router1 = require("./routes/index");

const PORT = 3000;


app.use(cors());
app.use(express.json());


app.use("/api/v1", router1);

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    // Customize the error response based on your requirements
    res.status(500).json({ error: 'Something went wrong!' });
  };

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});