const { insertShiftsData, getShiftsData } = require("../models/swaps");

const processShift = (shift) => {
  const requiredFields = ["Email", "Date"];
  const missingFields = requiredFields.filter((field) => !shift[field]);

  if (missingFields.length > 0) {
    return Promise.resolve({ error: "Incomplete form data", missingFields });
  }

  return insertShiftsData(shift)
    .then((insertedData) => ({
      message: "Form received and stored successfully",
      data: insertedData[0],
    }))
    .catch((error) => ({ error, message: "Internal Server Error" }));
};

const postDataToDatabase = (req, res) => {
  let formDataArray = req.body;

  if (!Array.isArray(formDataArray)) {
    formDataArray = [formDataArray];
  }

  const promises = formDataArray.map(processShift);

  Promise.all(promises)
    .then((results) => res.status(200).json(results))
    .catch((error) =>
      res.status(500).json({ error, message: "Internal Server Error" })
    );
};

const fetchDatabaseData = (req, res) => {
  const currentDate = new Date();

  getShiftsData(currentDate)
    .then((data) => {
      const formattedData = data.map((entry) => ({
        ...entry,
        Date: new Date(entry.Date).toLocaleDateString("fr-FR"),
        Sent: new Date(entry.Sent).toLocaleString("fr-FR", { hour12: false }),
      }));
      res.status(200).json({ data: formattedData });
    })
    .catch((error) =>
      res.status(500).json({ error, message: "Internal Server Error" })
    );
};

module.exports = { postDataToDatabase, fetchDatabaseData };
