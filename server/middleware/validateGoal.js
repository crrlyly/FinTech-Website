export function validateGoalId(req, res, next) {
  if (
    typeof req.params.gid !== "string" ||
    !/^[1-9]\d*$/.test(req.params.gid) ||
    !Number.isSafeInteger(Number(req.params.gid))
  ) {
    return res.status(400).json({
      message: "Not a valid goal id.",
    });
  }
  next();
}

export function validateGoalForm(req, res, next) {
  const { targetDate, goalAmount, name, currAmount } = req.body;

  //validate name
  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "Goal name is required.",
    });
  }

  // Validate targetDate
  if (targetDate !== undefined && targetDate !== null && targetDate !== "") {
    if (
      typeof targetDate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(targetDate)
    ) {
      return res.status(400).json({
        message: "Goal date must use YYYY-MM-DD.",
      });
    }

    const chosenDate = new Date(`${targetDate}T00:00:00`);

    if (
      Number.isNaN(chosenDate.getTime()) ||
      chosenDate.getFullYear() !== Number(targetDate.slice(0, 4)) ||
      chosenDate.getMonth() + 1 !== Number(targetDate.slice(5, 7)) ||
      chosenDate.getDate() !== Number(targetDate.slice(8, 10))
    ) {
      return res.status(400).json({
        message: "Goal date must be valid.",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (chosenDate < today) {
      return res.status(400).json({
        message: "Goal date cannot be a past date.",
      });
    }
  }

  //validate goalAmount
  if (typeof goalAmount !== "string" || !goalAmount.trim()) {
    return res.status(400).json({
      message: "Goal must have a goal/target amount.",
    });
  } else if (!Number.isFinite(Number(goalAmount))) {
    return res.status(400).json({
      message: "Goal amount must be a valid number.",
    });
  } else if (Number(goalAmount) <= 0) {
    return res.status(400).json({
      message: "Goal amount must be greater than 0.",
    });
  }

  //validate currAmount
  if (typeof currAmount !== "string" || !currAmount.trim()) {
    return res.status(400).json({
      message: "Goal must have a current amount.",
    });
  } else if (!Number.isFinite(Number(currAmount))) {
    return res.status(400).json({
      message: "Goal current amount must be a valid number.",
    });
  } else if (Number(currAmount) < 0) {
    return res.status(400).json({
      message: "Goal current amount must be greater than or equal to 0.",
    });
  }

  next();
}
