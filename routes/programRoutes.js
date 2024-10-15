const express = require("express");
const router = express.Router();
const {
  createProgram,
  getPrograms,
  getProgramById,
} = require("../controller/programController");
const { IsAdmin, authenticate } = require("../middleware/authenticate ");


/**
 * @swagger
 * /programs/add:
 *   post:
 *     summary: Create a new fitness program
 *     tags: [Programs]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       201:
 *         description: Program created successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Unauthorized, admin access required
 */
router.post("/add", authenticate, IsAdmin, createProgram);

/**
 * @swagger
 * /programs:
 *   get:
 *     summary: Get all fitness programs
 *     tags: [Programs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of fitness programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 *       403:
 *         description: Unauthorized, admin access required
 */
router.get("/", authenticate, IsAdmin, getPrograms);

/**
 * @swagger
 * /programs/{id}:
 *   get:
 *     summary: Get a fitness program by ID
 *     tags: [Programs]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the program to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single fitness program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 *       403:
 *         description: Unauthorized, admin access required
 */
router.get("/:id", authenticate, IsAdmin, getProgramById);

module.exports = router;
