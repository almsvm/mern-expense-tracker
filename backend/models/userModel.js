const mongoose = require("mongoose");
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, reuired: true, minlength: 6 },
  expenses: [{ type: mongoose.Types.ObjectId, required: true, ref: "Expense" }],
  incomes: [{ type: mongoose.Types.ObjectId, required: true, ref: "Income" }],
  expense_categories: [{ type: String, required: true }],
  expense_modes: [{ type: String, required: true }],
  income_modes: [{ type: String, required: true }],
  theme: {
    primary: {
      type: String,
      default: "#81c784",
    },
    secondary: {
      type: String,
      default: "#2979ff",
    },
    background: {
      type: String,
      default: "#e8f5e9",
    },
    paper: {
      type: String,
      default: "#fafafa",
    },
    text: {
      type: String,
      default: "#000000",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the entered password with the stored password using bcrypt.compare
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
