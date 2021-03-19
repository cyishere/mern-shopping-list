const router = require("express").Router();
const Item = require("../models/item");
const { auth } = require("../utils/middlewares");
const { badRequestError } = require("../utils/helpers");

/**
 * @route   GET /api/items
 * @desc    Get All Items
 * @access  Pulic
 */
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

/**
 * @route   POST /api/items
 * @desc    Create An Item
 * @access  Private
 */
router.post("/", auth, async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name.trim()) {
      badRequestError("Name cannot be empty.");
    }

    const newItem = new Item({
      name,
    });

    const savedItem = await newItem.save();

    res.json({
      message: "Add successfuly!",
      item: savedItem,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete An Item
 * @access  Private
 */
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const item = await Item.findByIdAndRemove(req.params.id);

    if (!item) {
      badRequestError("Item not found.");
    }

    res.json({ item: item.id, message: "Delete successfuly!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
