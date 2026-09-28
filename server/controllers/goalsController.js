import db from "../config/db.js";

export async function getGoals(req, res) {
  try {
    const uid = req.session?.userId;

    if (!uid) {
      return res.status(401).json({
        error: "You must be logged in.",
      });
    }

    const [budgets] = await db.execute(
      `select * from savings_goals where uid = ?`,
      [uid],
    );

    return res.status(200).json({
      budgets,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to get goals.",
    });
  }
}

export async function addGoal(req, res) {
  try {
    const uid = req.session?.userId;

    if (!uid) {
      return res.status(401).json({
        error: "You must be logged in.",
      });
    }

    const { targetDate, goalAmount, name, currAmount } = req.body;

    const [result] = await db.execute(
      `insert into saved_goals(targetDate, goalAmount, name, currAmount, uid) values (?,?,?,?,?)`,
      [targetDate, goalAmount, name, currAmount, uid],
    );

    return res.status(201).json({
      message: "Successfully added goal.",
      tid: result.insertId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to add goal.",
    });
  }
}

export async function updateGoal(req, res) {
  try {
    const uid = req.session?.userId;

    if (!uid) {
      return res.status(401).json({
        error: "You must be logged in.",
      });
    }

    const { targetDate, goalAmount, name, currAmount } = req.body;
    const { gid } = req.params;

    const [result] = await db.execute(
      `update savings_goals set targetDate=?, goalAmount=?, name=?, currAmount=? where gid=? and uid=?`,
      [targetDate, goalAmount, name, currAmount, gid, uid],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    res.status(200).json({
      message: "update complete for goals",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "failed to update goals",
    });
  }
}

export async function deleteGoal(req, res) {
  try {
    const uid = req.session?.userId;
    if (!uid) {
      return res.status(401).json({
        message: "Failed to get user",
      });
    }
    const { gid } = req.params;
    const [result] = await db.execute(
      `DELETE FROM savings_goals
       WHERE gid=? AND uid=?`,
      [gid, uid],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }
    return res.status(200).json({
      message: "Succesfully deleted goal",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to delete goal",
    });
  }
}
