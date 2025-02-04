import express from 'express';
import policyholderController from '../controllers/policyholderController.js';

const router = express.Router();

/**
 * @swagger
 * /api/policyholders:
 *   post:
 *     summary: Create a new policyholder
 *     description: Creates a new policyholder in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Policyholder created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', policyholderController.createPolicyholder);

/**
 * @swagger
 * /api/policyholders/{id}:
 *   get:
 *     summary: Get policyholder by ID
 *     description: Retrieves the details of a policyholder by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The policyholder's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Policyholder found successfully
 *       404:
 *         description: Policyholder not found
 */
router.get('/:id', policyholderController.getPolicyholderById);

/**
 * @swagger
 * /api/policyholders/{id}:
 *   put:
 *     summary: Update policyholder by ID
 *     description: Updates the details of a policyholder by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The policyholder's unique ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Policyholder updated successfully
 *       404:
 *         description: Policyholder not found
 */
router.put('/:id', policyholderController.updatePolicyholder);

/**
 * @swagger
 * /api/policyholders/{id}:
 *   delete:
 *     summary: Delete policyholder by ID
 *     description: Deletes a policyholder by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The policyholder's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Policyholder deleted successfully
 *       404:
 *         description: Policyholder not found
 */
router.delete('/:id', policyholderController.deletePolicyholder);

export default router;
