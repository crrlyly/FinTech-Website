import db from "../config/db.js";

export async function getBudgets(req, res) {
  try {
    const uid = req.session?.userId;

    if (!uid) {
      return res.status(401).json({
        error: "You must be logged in.",
      });
    }

    const [budgets] = await db.execute(
      `select * from budgets where uid = ? order by category desc`,
      [uid],
    );

    return res.status(200).json({
      budgets,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to get budgets.",
    });
  }
}

export async function updateBudget(req, res) {
  try {
    const uid = req.session?.userId;

    if (!uid) {
      return res.status(401).json({
        error: "You must be logged in.",
      });
    }

    const bid = req.params.bid;

    const { amountUsed, maxAmount, category, month } = req.body;

    const [result] = await db.execute(
      `update budgets set amountUsed=?, maxAmount=?, category=?, month=? where bid=? and uid=?`,
      [amountUsed, maxAmount, category, month, bid, uid],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Budget not found.",
      });
    }

    res.status(200).json({
      message: "update complete for budget",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "failed to update budgets",
    });
  }
}
