import argon2 from "argon2";
import db from "../config/db.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const [existing] = await db.execute(
      `
      SELECT id
      FROM user
      WHERE email = ?
      LIMIT 1
      `,
      [normalizedEmail],
    );

    if (existing.length > 0) {
      return res.status(409).json({
        error: "An account with this email already exists.",
      });
    }

    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    const [result] = await db.execute(
      `
      INSERT INTO user (
        email,
        password,
        name
      )
      VALUES (?, ?, ?)
      `,
      [normalizedEmail, passwordHash, name.toLowerCase()],
    );

    req.session.regenerate(async (error) => {
      if (error) {
        return res.status(500).json({
          error: "Unable to create session.",
        });
      }

      req.session.userId = result.insertId;

      const categories = [
        "Groceries",
        "Transportation",
        "Bills",
        "Shopping",
        "Dining",
        "Entertainment",
        "Others",
      ];

      for (const cat of categories) {
        await db.execute(
          `
          INSERT INTO budgets (
            category,
            uid
          )
          VALUES (?, ?)
          `,
          [cat, result.insertId],
        );
      }

      return res.status(201).json({
        user: {
          id: result.insertId,
          email: normalizedEmail,
          name: name,
        },
      });
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to create account.",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase();

    const [result] = await db.query(
      `
      SELECT id, name, email, password
      FROM user
      WHERE email = ?
      LIMIT 1
      `,
      [normalizedEmail],
    );

    const user = result[0];

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const passwordMatches = await argon2.verify(user.password, password);

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    req.session.regenerate((error) => {
      if (error) {
        return res.status(500).json({
          error: "Unable to create session.",
        });
      }

      req.session.userId = user.id;

      req.session.save((saveError) => {
        if (saveError) {
          return res.status(500).json({
            error: "Unable to save session.",
          });
        }

        return res.status(200).json({
          message: "Login successful.",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      });
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to enter account.",
    });
  }
}

export async function logout(req, res) {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error: ", error);

      return res.status(500).json({
        error: "Unable to log out.",
      });
    }

    res.clearCookie("fintech.sid");

    return res.status(200).json({
      message: "Logged out successfully.",
    });
  });
}

export async function getCurrentUser(req, res) {
  try {
    const userId = req.session.userId;
    console.log(userId);

    if (!userId) {
      return res.status(401).json({
        error: "Not logged in.",
      });
    }

    const [rows] = await db.execute(
      `
      SELECT
        id,
        email,
        name,
        created_on,
        updated_on,
        autoActivateBudget,
        activateBudget
      FROM user
      WHERE id = ?
      LIMIT 1
      `,
      [userId],
    );

    const user = rows[0];

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to get current user.",
    });
  }
}

export async function updateUser(req, res) {
  try {
    const uid = req.session?.userId;
    if (!uid) {
      return res.status(401).json({
        error: "You must be logged in.",
      });
    }

    const { name, email, autoActivateBudget } = req.body;

    const now = new Date();

    const [response] = await db.execute(
      "update user set name=?, email=?, updated_on=?, autoActivateBudget=? where id=?",
      [
        name,
        email,
        now.toISOString().slice(0, 19).replace("T", " "),
        autoActivateBudget,
        uid,
      ],
    );

    if (response.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "Succesfully updated user",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to update user.",
    });
  }
}
