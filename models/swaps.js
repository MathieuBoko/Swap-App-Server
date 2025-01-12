const database = require("../config/database");

const insertShiftsData = (shift) => {
  return database("Swaps").insert({
    ...shift,
    Sent: new Date(),
  });
};

const getShiftsData = (currentDate) => {
  return database("Swaps")
    .select(
      "Date",
      "Outbound",
      "Inbound",
      "Position",
      "Email",
      "Early",
      "Late",
      "LTA",
      "DO",
      "Sent",
      "Note"
    )
    .distinctOn(["Date", "Inbound", "Outbound", "Email"])
    .where("Date", ">", currentDate)
    .orderBy([{ column: "Date", order: "asc" }]);
};

module.exports = { insertShiftsData, getShiftsData };
