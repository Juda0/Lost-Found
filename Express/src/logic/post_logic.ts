// post_logic.ts
import { IPostDAL } from '../interfaces/IPostDAL';
import { Post } from 'models/post';
import { FileLogic } from './FileLogic';
import { IPostLogic } from 'interfaces/logic/IPostLogic';

export class PostLogic implements IPostLogic {
  postDAL: IPostDAL;
  fileLogic: FileLogic;

  constructor(postDAL: IPostDAL) {
    this.postDAL = postDAL;
    this.fileLogic = new FileLogic();
  }

  private convertCoordinates(latitudeStr: number | undefined, longitudeStr: number | undefined): { latitude: number, longitude: number } {
    const latitude = latitudeStr ? parseFloat(latitudeStr.toString()) : 0;
    const longitude = longitudeStr ? parseFloat(longitudeStr.toString()) : 0;
    return { latitude, longitude };
  }

  private async processFileUpload(file: Express.Multer.File | undefined): Promise<string | undefined> {
    if (file) {
      return await this.fileLogic.saveFile(file);
    }
    return undefined;
  }

  private validatePostData(postData: Post) {
    // Check if title, description, and userId are not empty
    if (!postData.title || !postData.description || !postData.userId) {
      throw new Error('Title, description, and a valid user must be provided');
    }
  }

  getPosts = async (userId: number) => {
    try {
      return this.postDAL.getPosts(userId);
    } catch (error) {
      throw error;
    }
  }

  getPostById = async (id: number) => {
    try {
      return this.postDAL.getPostById(id);
    } catch (error) {
      throw error;
    }
  }

  createPost = async (postData: Post, file: Express.Multer.File | undefined) => {
    try {
      // Convert latitude and longitude to floats
      const { latitude, longitude } = this.convertCoordinates(postData.latitude, postData.longitude);

      // Update post data with converted values
      postData.latitude =  latitude;
      postData.longitude = longitude;

      // Validate postData
      this.validatePostData(postData);

      // Handle file upload
      const filePath = await this.processFileUpload(file);
      if (filePath) {
        postData.imagePath = filePath;
      }

      // Call create post method in Prisma or other data access layer
      const newPost = await this.postDAL.createPost(postData);

      return newPost;
    } catch (error) {
      // Handle errors or rethrow if needed
      throw error;
    }
  }
}
