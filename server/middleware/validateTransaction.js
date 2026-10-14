export function validateTransactionForm(req, res, next) {
  const { name, date, amount, type, category } = req.body;

  //validate name
  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "Transaction name is required.",
    });
  }

  // Validate date
  if (typeof date !== "string" || !date.trim()) {
    return res.status(400).json({
      message: "Transaction must have a date.",
    });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({
      message: "Transaction date must use YYYY-MM-DD.",
    });
  }

  const chosenDate = new Date(`${date}T00:00:00`);

  if (
    Number.isNaN(chosenDate.getTime()) ||
    chosenDate.getFullYear() !== Number(date.slice(0, 4)) ||
    chosenDate.getMonth() + 1 !== Number(date.slice(5, 7)) ||
    chosenDate.getDate() !== Number(date.slice(8, 10))
  ) {
    return res.status(400).json({
      message: "Transaction date must be valid.",
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (chosenDate > today) {
    return res.status(400).json({
      message: "Transaction date cannot be a future date.",
    });
  }

  //validate amount
  if (typeof amount !== "string" || !amount.trim()) {
    return res.status(400).json({
      message: "Transaction must have an amount.",
    });
  } else if (!Number.isFinite(Number(amount))) {
    return res.status(400).json({
      message: "Transaction amount must be a valid number.",
    });
  } else if (Number(amount) <= 0) {
    return res.status(400).json({
      message: "Transaction amount must be greater than 0.",
    });
  }

  //validate type
  if (
    typeof type !== "string" ||
    !type.trim() ||
    (type !== "expense" && type !== "income")
  ) {
    return res.status(400).json({
      message: "Transaction type is required.",
    });
  }

  //validate category
  if (typeof category !== "string" || !category.trim()) {
    return res.status(400).json({
      message: "Transaction category is required.",
    });
  }

  next();
}

export function validateTransactionId(req, res, next) {
  if (typeof req.params.tid !== "number" || !req.params.tid.trim()) {
    return res.status(400).json({
      message: "Transaction id is invalid.",
    });
  }

  next();
}

