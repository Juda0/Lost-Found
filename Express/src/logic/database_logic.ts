
import { IDatabaseLogic } from "interfaces/logic/IDatabaseLogic";
import { IDatabaseDAL } from "interfaces/IDatabaseDAL";
export class DatabaseLogic implements IDatabaseLogic {

    databaseDAL: IDatabaseDAL;
  
    constructor(databaseDAL: IDatabaseDAL) {
      this.databaseDAL = databaseDAL;
    }

  async resetDatabase(): Promise<void> {
    try {
      console.log("Resetting database from logic layer");
      await this.databaseDAL.resetDatabase();
    } catch (error) {
      console.error('Error resetting database from logic layer:', error);
      throw error; // Rethrow the error to be handled in the controller or middleware
    }
  }

  async seedDatabase(): Promise<void> {
    try {
      console.log("Seeding database from logic layer");
      await this.databaseDAL.seedDatabase();
    } catch (error) {
      console.error('Error seeding database from logic layer:', error);
      throw error; // Rethrow the error to be handled in the controller or middleware
    }
  }
}
