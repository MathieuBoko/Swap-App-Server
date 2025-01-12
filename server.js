const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swapsRoutes = require("./routes/swapsRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/", swapsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
