import { ClaimStatus, PostStatus, Prisma, PrismaClient } from '@prisma/client';
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

  async getClaimsByPostId(postCreatorId: number, givenPostId: number) {
    try {
      return await this.prisma.claim.findMany({
        where: {
          status: 'PENDING',
          postId: givenPostId,
          post: {
            userId: postCreatorId
          }
        },
        include: {
          owner: {
            select: {
              username: true
            }
          }
        },
        orderBy: {
          id: 'asc'
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getClaimsByUserId(userId: number): Promise<any> {
    try {
      const claims = await this.prisma.claim.findMany({
        where: {
          ownerId: userId,
        },
        include: {
          post: {
            select: {
              id: true,
              imagePath: true,
              title: true,
              user: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      // Remove email (set email to '') for claims with status 'DENIED' or 'PENDING'
      const filteredClaims = claims.map((claim) => {
        if (claim.status === 'DENIED' || claim.status === 'PENDING') {
          const userWithoutEmail = { ...claim.post.user };
          userWithoutEmail.email = '';
          claim.post.user = userWithoutEmail;
        }
        return claim;
      });

      return filteredClaims;
    } catch (error) {
      // Handle errors or rethrow if needed
      throw error;
    }
  }

  async setPostStatusToOwnerFound(postId: number) {
    try {
      const ownerFound: PostStatus = 'OWNER_FOUND' as PostStatus;
      return await this.prisma.post.update({
        where: {
          id: postId
        },
        data: {
          status: ownerFound
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async changeStatus(postCreatorId: number, claimId: number, status: string) {
    try {
      const claimStatus: ClaimStatus = status as ClaimStatus;
      return await this.prisma.claim.update({
        where: {
          id: claimId,
          post: {
            userId: postCreatorId
          },
        },
        data: {
          status: claimStatus
        },
        include: {
          post: {
            select: {
              id: true
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default ClaimDAL;
