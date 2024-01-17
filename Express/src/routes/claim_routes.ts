// routes/postRoutes.ts
import express, { Router, Response } from 'express';
import authenticateToken from '../middleware/authentication';
import { IAuthenticatedRequest } from '../interfaces/middleware/IAuthenticatedRequest';
import { ClaimDAL } from '../dal/claim_dal';
import { ClaimLogic } from '../logic/claim_logic';
import { ClaimController } from '../controllers/claim_controller';

const router: Router = express.Router();
const claimDAL = new ClaimDAL();
const claimLogic = new ClaimLogic(claimDAL);
const claimController = new ClaimController(claimLogic);

// Protected route: Create a new post
router.post('/create', authenticateToken, async (req: IAuthenticatedRequest, res: Response) => {
  await claimController.createClaim(req, res);
});

export default router;
