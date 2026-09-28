import db from "../config/db.js";

export async function getTransactions(req, res) {
  try {
    const uid = req.session?.userId;

    if (!uid) {
      return res.status(401).json({
        error: "You must be logged in.",
      });
    }

    const [transactions] = await db.execute(
      `select * from transactions where uid = ? order by date desc`,
      [uid],
    );

    return res.status(200).json({
      transactions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to get transactions.",
    });
  }
}

export async function addTransaction(req, res) {
  try {
    const uid = req.session?.userId;

    if (!uid) {
      return res.status(401).json({
        error: "You must be logged in.",
      });
    }

    const { name, date, amount, type, category } = req.body;

    // TODO: Check values to make sure they are ok before inserting into database

    const [result] = await db.execute(
      `insert into transactions(name, date, amount, type, category, uid) values (?,?,?,?,?,?)`,
      [name, date, amount, type, category, uid],
    );

    return res.status(201).json({
      message: "successfully added transaction into db",
      tid: result.insertId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to add transaction.",
    });
  }
}

export async function updateTransaction(req, res) {
  try {
    const uid = req.session?.userId;
    if (!uid) {
      return res.status(401).json({
        error: "Unable to get user",
      });
    }
    const tid = req.params.tid;
    const { name, date, amount, type, category } = req.body;
    const [result] = await db.execute(
      `update transactions set name=?, date=?, amount=?, type=?, category=? where tid=? and uid=?`,
      [name, date, amount, type, category, tid, uid],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }
    return res.status(200).json({
      message: "Succesfully updated transaction",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not update transaction",
    });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const uid = req.session?.userId;
    if (!uid) {
      return res.status(401).json({
        error: "Unable to get user",
      });
    }
    const tid = req.params.tid;
    const [result] = await db.execute(
      `delete from transactions where tid=? and uid=?`,
      [tid, uid],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }
    return res.status(200).json({
      message: "Succesfully deleted Transaction",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Could not delete transaction",
    });
  }
}
