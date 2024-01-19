export interface Claim {
  id?: number;
  postId: number;	
  ownerId: number;	
  message: string;
  status?: string;
}