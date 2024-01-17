import { Prisma, PrismaClient } from '@prisma/client';
import { Claim } from 'models/claim';
import { IClaimDAL } from 'interfaces/IClaimDAL';
import { DuplicateClaimError } from '../errors/claim/DuplicateClaimError';

export class ClaimDAL implements IClaimDAL {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createClaim(claim: Claim) {
    try {
      const { message, postId, ownerId } = claim;
      return await this.prisma.claim.create({
        data: { message, postId, ownerId }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2022: Unique constraint failed
        if (error.code === 'P2002') {
          console.log('Duplicate claim', error)
          throw new DuplicateClaimError('You already sent a claim for this post')
        }
      }
      
      console.log(error)
      throw error;
    }
  }
}

export default ClaimDAL;
