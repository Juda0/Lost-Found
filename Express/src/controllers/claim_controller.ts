// controllers/postController.ts
import { Response } from 'express';
import { IAuthenticatedRequest } from '../interfaces/middleware/IAuthenticatedRequest'
import { IClaimLogic } from '../interfaces/logic/IClaimLogic';
import { Claim } from 'models/claim';
import { MessageTooShortError } from '../errors/claim/MessageTooShortError';
import { DuplicateClaimError } from '../errors/claim/DuplicateClaimError';

export class ClaimController {
  claimLogic: IClaimLogic;

  constructor(claimLogic: IClaimLogic) {
    this.claimLogic = claimLogic;
  }

  createClaim = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // Check if user id is set
      if (req.user?.userId === undefined) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      // Create post data
      const claim: Claim = {
        postId: parseInt(req.body.postId),
        ownerId: req.user?.userId,
        message: req.body.message,
      };

      console.log(claim)

      // Call create post method in logic
      const newClaim = await this.claimLogic.createClaim(claim);

      res.status(201).json({ message: 'Claim created successfully', claim: newClaim });
    } catch (error) {
      if (error instanceof MessageTooShortError) {
        res.status(422).json({ error: 'Invalid claim message length', message: error.message });
      } else if (error instanceof DuplicateClaimError) {
        res.status(409).json({ error: 'Duplicate claim error', message: error.message });
      } else if (error instanceof Error) {
        res.status(500).json({ error: 'Failed to create your claim on the server', message: 'Failed to create your claim on the server' });
      } else {
        // Handle any other types of errors here
        console.error(error);
        res.status(500).json({ error: 'Failed to create your claim on the server' });
      }
    }
  }

  getClaimsByPostId = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // Check if user id is set
      if (req.user?.userId === undefined) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      // Create post data
      const postId = parseInt(req.body.postId);

      if(isNaN(postId)){
        res.status(422).json({ error: 'Invalid post id', message: 'Invalid post id' });
        return;
      }

      // Call create post method in logic
      const claimList = await this.claimLogic.getClaimsByPostId(req.user?.userId ,postId);

      res.status(201).json({ message: 'List of claims succesfully fetched', claims: claimList });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create your claim on the server' });
    }
  }

  getClaimsByUserId = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // Check if user id is set
      if (req.user?.userId === undefined) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      // Call create post method in logic
      const claimList = await this.claimLogic.getClaimsByUserId(req.user?.userId);

      res.status(201).json({ message: 'Personal claims fetched', claims: claimList });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create your claim on the server' });
    }
  }

  
  changeStatus = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
       // Create post data
       const claimId = parseInt(req.body.claimId);
       const status = req.body.status;

      // Check if user id is set
      if (req.user?.userId === undefined) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }
     
      if(status !== 'ACCEPTED' && status !== 'DENIED'){
        res.status(422).json({ error: 'InvalidStatus', message: 'The provided status should be ACCEPTED|DENIED' });
        return;
      }

      // Call create post method in logic
      const result = await this.claimLogic.changeStatus(req.user?.userId ,claimId, status);

      res.status(201).json({ message: 'List of claims succesfully fetched', data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create your claim on the server' });
    }
  }
}


