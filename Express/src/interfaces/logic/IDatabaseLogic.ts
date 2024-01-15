export interface IDatabaseLogic {
    resetDatabase(): Promise<void>;
    seedDatabase(): Promise<void>;
}