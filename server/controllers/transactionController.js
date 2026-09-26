import db from "../config/db";

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

    const { description, date, amount, type, category } = req.body;

    // TODO: Check values to make sure they are ok before inserting into database

    await db.execute(
      `insert into transactions(description, date, amount, type, category, uid) values (?,?,?,?,?,?)`,
      [description, date, amount, type, category, uid],
    );

    return res.status(200).json({
      message: "successfully added transaction into db",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to add transaction.",
    });
  }
}

export async function updateTransaction(req, res){

}

export async function deleteTransaction(req, res){
  
}