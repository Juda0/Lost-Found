import { Claim } from "models/claim";

export interface IClaimLogic {
  createClaim(claim: Claim): Promise<any>;
  changeStatus(postCreatorId: number, claimId: number, status: string): Promise<any>;
  getClaimsByPostId(postCreatorId: number, givenPostId: number) : Promise<any>;
  getClaimsByUserId(userId: number): Promise<any>;
}
