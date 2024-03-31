// function for get current date
function getCurrentDate() {
  // get date time now
  const currentDate = new Date();
  // change to UTC+7 (Waktu Indonesia Barat)
  currentDate.setUTCHours(currentDate.getUTCHours() + 7);

  return currentDate;
}

module.exports = { getCurrentDate };
