import express from 'express';
import claimController from '../controllers/claimController.js';

const router = express.Router();

/**
 * @swagger
 * /api/claims:
 *   post:
 *     summary: Create a new claim
 *     description: Creates a new claim entry in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claimId:
 *                 type: string
 *               claimAmount:
 *                 type: number
 *               policyId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Claim created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', claimController.createClaim);

/**
 * @swagger
 * /api/claims/{id}:
 *   get:
 *     summary: Get claim by ID
 *     description: Retrieves the details of a claim by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The claim's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Claim found successfully
 *       404:
 *         description: Claim not found
 */
router.get('/:id', claimController.getClaimById);

/**
 * @swagger
 * /api/claims/{id}:
 *   put:
 *     summary: Update claim by ID
 *     description: Updates an existing claim by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The claim's unique ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claimAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Claim updated successfully
 *       404:
 *         description: Claim not found
 */
router.put('/:id', claimController.updateClaim);

/**
 * @swagger
 * /api/claims/{id}:
 *   delete:
 *     summary: Delete claim by ID
 *     description: Deletes a claim by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The claim's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Claim deleted successfully
 *       404:
 *         description: Claim not found
 */
router.delete('/:id', claimController.deleteClaim);

export default router;
