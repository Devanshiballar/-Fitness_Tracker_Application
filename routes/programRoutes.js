const express = require("express");
const router = express.Router();
const {
  createProgram,
  getPrograms,
  getProgramById,
  GetAllUser,
  DeleteUser,
  GetAggrigate,
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
// router.get("/", authenticate, IsAdmin, getPrograms);

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
// router.get("/:id", authenticate, IsAdmin, getProgramById);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *       400:
 *         description: Bad request
 */
// router.get("/user", authenticate, IsAdmin, GetAllUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */

router.delete("/users/:id", authenticate, IsAdmin, DeleteUser);

/**
 * @swagger
 * /workout-stats:
 *   get:
 *     summary: Get aggregated workout statistics
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the statistics (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the statistics (YYYY-MM-DD)
 *       - in: query
 *         name: activityType
 *         required: false
 *         schema:
 *           type: string
 *         description: Type of activity (e.g., running, cycling)
 *     responses:
 *       200:
 *         description: Successfully retrieved workout statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 workoutStats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       activityType:
 *                         type: string
 *                       totalDuration:
 *                         type: integer
 *                       totalCalories:
 *                         type: integer
 *                       averageCalories:
 *                         type: integer
 *                       count:
 *                         type: integer
 *                 goalStats:
 *                   type: object
 *                   properties:
 *                     totalGoals:
 *                       type: integer
 *                     achievedGoals:
 *                       type: integer
 *                     onTrackGoals:
 *                       type: integer
 *                     behindGoals:
 *                       type: integer
 *       400:
 *         description: Bad request
 */

router.get("/workout-stats", authenticate, IsAdmin, GetAggrigate);

module.exports = router;
