import express from 'express';
import policyController from '../controllers/policyController.js';

const router = express.Router();

/**
 * @swagger
 * /api/policies:
 *   post:
 *     summary: Create a new policy
 *     description: Creates a new policy entry in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               policyId:
 *                 type: string
 *               coverageAmount:
 *                 type: number
 *               policyholderId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Policy created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', policyController.createPolicy);

/**
 * @swagger
 * /api/policies/{id}:
 *   get:
 *     summary: Get policy by ID
 *     description: Retrieves the details of a policy by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The policy's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Policy found successfully
 *       404:
 *         description: Policy not found
 */
router.get('/:id', policyController.getPolicyById);

/**
 * @swagger
 * /api/policies/{id}:
 *   put:
 *     summary: Update policy by ID
 *     description: Updates an existing policy by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The policy's unique ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coverageAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Policy updated successfully
 *       404:
 *         description: Policy not found
 */
router.put('/:id', policyController.updatePolicy);

/**
 * @swagger
 * /api/policies/{id}:
 *   delete:
 *     summary: Delete policy by ID
 *     description: Deletes a policy by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The policy's unique ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Policy deleted successfully
 *       404:
 *         description: Policy not found
 */
router.delete('/:id', policyController.deletePolicy);

/**
 * @swagger
 * /api/policies/{id}/coverage:
 *   patch:
 *     summary: Update coverage of a policy
 *     description: Updates the coverage of a policy by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The policy's unique ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coverageAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Coverage updated successfully
 *       404:
 *         description: Policy not found
 */
router.patch('/:id', policyController.updateCoverage);

export default router;
