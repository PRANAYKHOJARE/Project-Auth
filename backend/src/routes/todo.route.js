import express from "express";
import Todo from "../models/Todo.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();



router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


router.post("/", authMiddleware, async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      user: req.user.id,
    });

    const savedTodo = await todo.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        completed: req.body.completed,
      },
      {
        new: true,
      },
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
