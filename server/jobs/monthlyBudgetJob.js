import cron from "node-cron";
import db from "../config/db.js";

const categories = [
  "Groceries",
  "Transportation",
  "Bills",
  "Shopping",
  "Dining",
  "Entertainment",
  "Others",
];

export function startMonthlyBudgetScheduler() {
  cron.schedule(
    "0 0 1 * *",
    async () => {
      try {
        await createMonthlyBudgets();
      } catch (error) {
        console.error("Scheduler error:", error);
      }
    },
    {
      timezone: "America/New_York",
      noOverlap: true,
    },
  );

  console.log("Monthly budget scheduler started!");
}

export async function createMonthlyBudgets() {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [users] = await connection.execute("SELECT id FROM user");

    const now = new Date();
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

    for (const user of users) {
      // Check whether this month's budgets already exist
      const [existingBudgets] = await connection.execute(
        `SELECT category
         FROM budgets
         WHERE uid = ?
         AND date >= ?
         AND date < DATE_ADD(?, INTERVAL 1 MONTH)`,
        [user.id, monthStart, monthStart],
      );

      const existingCategories = new Set(
        existingBudgets.map((budget) => budget.category),
      );

      // Create any missing categories
      for (const category of categories) {
        if (!existingCategories.has(category)) {
          await connection.execute(
            `INSERT INTO budgets (category, uid)
   VALUES (?, ?)`,
            [category, user.id],
          );
        }
      }
    }

    // Reset activation for the new month
    await connection.execute(
      `UPDATE user
       SET activateBudget = autoActivateBudget`,
    );

    await connection.commit();

    console.log("Monthly budgets created successfully!");
  } catch (error) {
    await connection.rollback();
    console.error("Monthly budget job failed:", error);
    throw error;
  } finally {
    connection.release();
  }
}
