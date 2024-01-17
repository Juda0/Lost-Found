import { Claim } from "models/claim";

export interface IClaimLogic {
  createClaim(claim: Claim): Promise<any>;
}
