export interface Post {
  id?: number;
  title: string;
  description: string;
  latitude: number | 0;
  longitude: number | 0;
  tags?: string;
  userId: number;
  imagePath?: string;
}