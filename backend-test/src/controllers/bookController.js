const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all book
const getAllBook = async (req, res) => {
  try {
    const books = await prisma.books.findMany();
    return res.status(200).json({ "data length": books.length, books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch data" });
  }
};

// create new book
const createBook = async (req, res) => {
  try {
    // code, title, author, stock is required
    const { code, title, author, stock } = req.body;
    if (!code || !title || !author || !stock) {
      return res.status(400).json({ message: "code, title, author, stock is required" });
    }

    // checking book code
    const checkCode = await checkBookCode(code);

    // if book code alredy exist
    if (checkCode) {
      return res.status(400).json({ message: "Book code already exist" });
    }

    // input to db
    const book = await prisma.books.create({
      data: { code, title, author, stock: parseInt(stock) },
    });

    return res.status(201).json({ message: "Book created successfully", data: book });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating book" });
  }
};

// get available book
const getAvailableBook = async (req, res) => {
  try {
    const books = await prisma.books.findMany({
      where: { stock: { gt: 0 } },
    });
    return res.status(200).json({ data: books.length, books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch data" });
  }
};

// update book data
const putBook = async (req, res) => {
  try {
    const { code, title, author, stock } = req.body;
    if (!code) {
      return res.status(400).json({ message: "code is required" });
    }

    // checking book code
    const checkCode = await checkBookCode(code);

    // if book code not found
    if (!checkCode) {
      return res.status(404).json({ message: "Book code not found" });
    }

    await prisma.books.update({
      where: { code: code },
      data: { title: title, author: author, stock: stock },
    });

    return res.status(200).json({ message: "Update successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error update book" });
  }
};

// delete book data
const deleteBook = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
      return res.status(400).json({ message: "code is required" });
    }

    // checking book code
    const checkCode = await checkBookCode(code);

    // if book code not found
    if (!checkCode) {
      return res.status(404).json({ message: "Book code not found" });
    }

    await prisma.books.delete({
      where: { code: code },
    });

    return res.status(200).json({ message: "Delete successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error delete book" });
  }
};

// Checkcing book code
const checkBookCode = async (code) => {
  try {
    const checkCode = await prisma.books.findFirst({
      where: { code: code },
    });

    return checkCode;
  } catch (error) {
    console.log(error);
    throw new Error("Error checking book code");
  }
};

module.exports = { getAllBook, createBook, getAvailableBook, putBook, deleteBook };
