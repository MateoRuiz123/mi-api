import express from 'express';
import { createUser, getUserById } from '../../controllers/userController';
import { validateUser } from '../../middleware/joiValidation';

const router = express.Router();

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.post('/', validateUser, createUser);

// ...

/**
 * @openapi
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/:userId', getUserById);


export default router;
