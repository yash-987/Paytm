const expressAsyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");
const { default: mongoose } = require("mongoose");

const getBalance = expressAsyncHandler(async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });

  if (!account)
    return res.status(400).json({
      message: "No account with this userId",
    });
  res.json({
    userId:account.userId,
    balance: account.balance,
  });
});

const transferFunds = expressAsyncHandler(async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session,
  );
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
  ).session(session);
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(
    session,
  );

  await session.commitTransaction();

  res.json({
    message: "Transfer Successfull",
  });
});

module.exports = { getBalance, transferFunds };
