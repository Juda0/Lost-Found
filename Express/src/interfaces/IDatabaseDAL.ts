export interface IDatabaseDAL {
    seedDatabase(): Promise<void>;
    resetDatabase(): Promise<void>;
}