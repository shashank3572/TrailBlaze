// backend/utils/dateUtils.js

function startOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) -> 6 (Sat)

  // Make Monday the first day
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);

  return d;
}

function endOfWeek(start) {
  const d = new Date(start);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);

  return d;
}

module.exports = { startOfWeek, endOfWeek };
