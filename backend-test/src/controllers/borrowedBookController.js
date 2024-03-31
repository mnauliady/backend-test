const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getCurrentDate } = require("../utils/util.js");

// create borrow book
const createBorrowBook = async (req, res) => {
  try {
    const { bookCode, memberCode } = req.body;
    if (!bookCode || !memberCode) {
      return res.status(400).json({ message: "member code and book name is required" });
    }

    // checking book code
    const checkBook = await prisma.books.findFirst({
      where: { code: bookCode },
    });

    // if book code not found
    if (!checkBook) {
      return res.status(404).json({ message: "book code not found" });
    }

    // checking book stock
    if (checkBook.stock < 1) {
      return res.status(400).json({ message: "book is out of stock" });
    }

    // checking member code
    const checkMember = await prisma.members.findFirst({
      where: { code: memberCode },
    });

    // if member not found
    if (!checkMember) {
      return res.status(404).json({ message: "member code not found" });
    }

    // checking member is on penalty
    if (checkMember.penalty) {
      // get date time now
      const currentDate = getCurrentDate();
      if (checkMember.penaltyDate > currentDate) {
        return res.status(400).json({ message: "this member is currently under penalty" });
      } else {
        // if the penalty date has passed
        await prisma.members.update({
          where: { code: memberCode },
          data: { penalty: false, penaltyDate: null },
        });
      }
    }

    // checking member borrow more than 2 books
    const checkBorrowedBook =
      await prisma.$queryRaw`SELECT "Members".code, COUNT("Members".code) AS total FROM "Members" INNER JOIN "borrowedBook" ON "Members".code = "borrowedBook"."memberCode" WHERE "Members".code = ${memberCode} AND "borrowedBook"."returnAt" is NULL GROUP BY "Members".code HAVING COUNT("Members".code) >= 2;`;

    if (checkBorrowedBook.length > 0) {
      return res.status(400).json({ message: "this member has borrowed two books" });
    }

    // get date time now
    const borrowedAt = getCurrentDate();

    // time now + 7 days for maximum return date
    const maxReturnAt = getCurrentDate();
    maxReturnAt.setUTCDate(maxReturnAt.getUTCDate() + 7);

    // insert to db
    const borrowBook = await prisma.borrowedBook.create({
      data: { borrowedAt, maxReturnAt, bookCode, memberCode },
    });

    // if success update stock
    await prisma.books.update({
      where: { code: bookCode },
      data: { stock: { increment: -1 } },
    });

    return res.status(201).json({ message: "Borrow book created successfully", data: borrowBook });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating borrow book data" });
  }
};

// get all
const getBorrowedBook = async (req, res) => {
  try {
    const borrowedBooks = await prisma.borrowedBook.findMany();
    return res.status(200).json({ data: borrowedBooks.length, borrowedBooks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Failed to fetch data" });
  }
};

// update borrowed book (return book)
const updateBorrowedBook = async (req, res) => {
  try {
    const { bookCode, memberCode } = req.body;
    if (!bookCode || !memberCode) {
      return res.status(400).json({ message: "member code and book name is required" });
    }

    const checkBorrowedBook = await prisma.borrowedBook.findFirst({
      where: { bookCode: bookCode, memberCode: memberCode, returnAt: null },
    });

    if (!checkBorrowedBook) {
      return res.status(400).json({ message: `members ${memberCode} do not borrow books ${bookCode}` });
    }

    // get date time now
    const returnAt = getCurrentDate();

    // return book
    await prisma.borrowedBook.update({
      where: { code: checkBorrowedBook.code },
      data: { returnAt: returnAt },
    });

    // update the stock
    await prisma.books.update({
      where: { code: bookCode },
      data: { stock: { increment: 1 } },
    });

    // if return date more than 7 days (maxReturnAt) add penalty
    if (returnAt > checkBorrowedBook.maxReturnAt) {
      // time now + 3 days for penalty
      returnAt.setUTCDate(returnAt.getUTCDate() + 3);
      await prisma.members.update({
        where: { code: memberCode },
        data: { penalty: true, penaltyDate: returnAt },
      });
    }

    return res.status(200).json({ message: `success return book` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to return book" });
  }
};

module.exports = { createBorrowBook, getBorrowedBook, updateBorrowedBook };
