export function validateBudgetForm(req, res, next) {
  //validate bid
  if (
    typeof req.params.bid !== "string" ||
    !/^[1-9]\d*$/.test(req.params.bid) ||
    !Number.isSafeInteger(Number(req.params.bid))
  ) {
    return res.status(400).json({
      message: "Not a valid budget id.",
    });
  }

  //validate maxAmount
  if (typeof req.body.maxAmount !== "string" || !req.body.maxAmount.trim()) {
    return res.status(400).json({
      message: "Not a valid max amount.",
    });
  } else if (!Number.isFinite(Number(req.body.maxAmount))) {
    return res.status(400).json({
      message: "Max amount is not a valid number.",
    });
  } else if (Number(req.body.maxAmount) < 0) {
    return res.status(400).json({
      message: "Max amount must be 0 or greater.",
    });
  }

  //validate category
  if (typeof req.body.category !== "string" || !req.body.category.trim()) {
    return res.status(400).json({
      message: "Not a valid category.",
    });
  }
  next();
}
