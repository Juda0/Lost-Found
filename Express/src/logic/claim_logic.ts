// post_logic.ts
import { IClaimLogic } from 'interfaces/logic/IClaimLogic';
import { Claim } from 'models/claim';
import { IClaimDAL } from 'interfaces/IClaimDAL';
import { MessageTooShortError } from '../errors/claim/MessageTooShortError';
import { DuplicateClaimError } from '../errors/claim/DuplicateClaimError';


export class ClaimLogic implements IClaimLogic {
  claimDAL: IClaimDAL;

  constructor(claimDAL: IClaimDAL) {
    this.claimDAL = claimDAL;
  }

  private validateClaimData(claim: Claim) {
    // Check if title, description, and userId are not empty
    if (!claim.message || claim.message.length < 20) {
      throw new MessageTooShortError('Claim message must be at least 20 characters long');
    }
  }

  createClaim = async (claim: Claim) => {
    try {
      // Convert latitude and longitude to floats
      this.validateClaimData(claim);
      return await this.claimDAL.createClaim(claim);
    } catch (error) {
      if (error instanceof Error && error.message.includes('P2002')) {
        console.log('There is a unique constraint violation, a new user cannot be created with this email');
        throw new DuplicateClaimError('You already sent a claim for this post');
      } else {
        // Handle errors or rethrow if needed
        throw error;
      }
    }
  }

  getClaimsByPostId = async (postCreatorId: number, givenPostId: number) => {
    try {
      return await this.claimDAL.getClaimsByPostId(postCreatorId, givenPostId);
    } catch (error) {
      // Handle errors or rethrow if needed
      throw error;
    }
  }

  
  getClaimsByUserId = async (userId: number) => {
    try {
      return await this.claimDAL.getClaimsByUserId(userId);
    } catch (error) {
      // Handle errors or rethrow if needed
      throw error;
    }
  }

  // Function to set post status to 'OWNER_FOUND' (called when a claim is accepted)
  updatePostStatus = async (postId:number) => {
    try {
      await this.claimDAL.setPostStatusToOwnerFound(postId);
    } catch (error) {
      // Handle errors
      console.error('Error updating post status:', error);
      throw error;
    }
  };

  // Changing status of a claim
  changeStatus = async (postCreatorId:number ,claimId: number, status:string) => {
    try {
      const claim = await this.claimDAL.changeStatus(postCreatorId, claimId, status);

        // Check if the new status is 'ACCEPTED'
      if (status === 'ACCEPTED') {
        // Perform additional actions: delete pending and denied claims, update post status
        await this.updatePostStatus(claim.post.id);
      }

      return claim;
    } catch (error) {
      // Handle errors or rethrow if needed
      throw error;
    }
  }
}
