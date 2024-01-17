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

      // Call create post method in Prisma or other data access layer
      const newClaim = await this.claimDAL.createClaim(claim);

      return newClaim;
    } catch (error) {
      console.log('hit!'+error)
      if (error instanceof Error && error.message.includes('P2002')) {
        console.log('There is a unique constraint violation, a new user cannot be created with this email');
        throw new DuplicateClaimError('You already sent a claim for this post');
      }else{
        // Handle errors or rethrow if needed
        throw error;
      }
    }
  }
}
