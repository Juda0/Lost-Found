import { Claim } from "models/claim";

export interface IClaimDAL {
  createClaim(claim: Claim): Promise<any>;
}