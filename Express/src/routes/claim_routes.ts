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


// Protected route: Create a new post
router.post('/getClaimsByPostId', authenticateToken, async (req: IAuthenticatedRequest, res: Response)  => {
  await claimController.getClaimsByPostId(req, res);
});

// Protected route: Create a new post
router.get('/myClaims', authenticateToken, async (req: IAuthenticatedRequest, res: Response)  => {
  await claimController.getClaimsByUserId(req, res);
});

// Protected route: Change status of claim (DENIED or ACCEPTED)
router.post('/changeStatus', authenticateToken, async (req: IAuthenticatedRequest, res: Response)  => {
  await claimController.changeStatus(req, res);
});

export default router;
