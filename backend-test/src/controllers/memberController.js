const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create new member
const createMember = async (req, res) => {
  try {
    const { code, name } = req.body;
    if (!code || !name) {
      return res.status(400).json({ message: "code and name is required" });
    }

    const checkCode = await checkMemberCode(code);

    if (checkCode) {
      return res.status(400).json({ message: "member code already exist" });
    }

    const member = await prisma.members.create({
      data: { code, name },
    });

    return res.status(201).json({ message: "Member created successfully", membeer: member });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating member" });
  }
};

// get all member
const getAllMember = async (req, res) => {
  try {
    const members = await prisma.members.findMany();
    return res.status(200).json({ "data length": members.length, members });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Failed to fetch data" });
  }
};

// get the number of books being borrowed by each member (now)
const getBorrowedBookByMember = async (req, res) => {
  try {
    const numberOfBooks =
      await prisma.$queryRaw`SELECT "Members".code, "Members"."name", COUNT("Members".code) AS total FROM "Members" INNER JOIN "borrowedBook" ON "Members".code = "borrowedBook"."memberCode" WHERE "borrowedBook"."returnAt" is NULL GROUP BY "Members".code, "Members"."name"`;

    const convertedData = numberOfBooks.map((item) => ({
      ...item,
      total: item.total.toString(),
    }));
    return res.status(200).json({ "data length": convertedData.length, data: convertedData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Failed to fetch data" });
  }
};

// get history of borrowed book
const getHistory = async (req, res) => {
  try {
    const numberOfBooks =
      await prisma.$queryRaw`SELECT "Members".code, "Members"."name", COUNT("Members".code) AS total FROM "Members" INNER JOIN "borrowedBook" ON "Members".code = "borrowedBook"."memberCode" GROUP BY "Members".code, "Members"."name"`;
    const convertedData = numberOfBooks.map((item) => ({
      ...item,
      total: item.total.toString(),
    }));
    return res.status(200).json({ "data length": convertedData.length, data: convertedData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Failed to fetch data" });
  }
};

// update member data
const putMember = async (req, res) => {
  try {
    const { code, name, penalty, penaltyDate } = req.body;
    if (!code) {
      return res.status(400).json({ message: "code is required" });
    }

    // checking member code
    const checkCode = await checkMemberCode(code);

    // if member code not found
    if (!checkCode) {
      return res.status(404).json({ message: "Member code not found" });
    }

    await prisma.members.update({
      where: { code: code },
      data: { name: name, penalty: penalty, penaltyDate: penaltyDate },
    });

    return res.status(200).json({ message: "Update successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error update member" });
  }
};

// delete member by code
const deleteMember = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
      return res.status(400).json({ message: "code is required" });
    }

    // checking member code
    const checkCode = await checkMemberCode(code);

    // if member code not found
    if (!checkCode) {
      return res.status(404).json({ message: "Member code not found" });
    }

    await prisma.members.delete({
      where: { code: code },
    });

    return res.status(200).json({ message: "Delete successfully" });
  } catch (error) {}
};

// Checkcing member code
const checkMemberCode = async (code) => {
  try {
    const checkCode = await prisma.members.findFirst({
      where: { code: code },
    });

    return checkCode;
  } catch (error) {
    console.log(error);
    throw new Error("Error checking member code");
  }
};
module.exports = { createMember, getAllMember, getBorrowedBookByMember, getHistory, putMember, deleteMember };
