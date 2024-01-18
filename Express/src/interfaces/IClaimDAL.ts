import { Claim } from "models/claim";

export interface IClaimDAL {
  createClaim(claim: Claim): Promise<any>;
  setPostStatusToOwnerFound(postId: number): Promise<any>;
  changeStatus(postCreatorId: number, claimId: number, status: string): Promise<any>;
  getClaimsByPostId(postCreator: number, postId: number): Promise<any>;
  getClaimsByUserId(userId:number ): Promise<any>;
}