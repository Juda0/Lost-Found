export interface Post {
  id?: number;
  title: string;
  description: string;
  latitude?: number;
  longitude?: number;
  tags?: string;
  userId: number;
  imagePath?: string;
}