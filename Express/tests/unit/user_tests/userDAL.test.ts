// tests/unit/user_tests/userDAL.test.ts

import { Prisma } from '@prisma/client';
import { UserDAL } from '../../../src/dal/user_dal';
import { prismaMock } from './singleton';

describe('UserDAL', () => {
  const userDAL = new UserDAL(prismaMock);

  it('Should create a new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.create.mockResolvedValue({
      ...userData,
      id: 1,
    });

    const result = await userDAL.createUser(
      userData.username,
      userData.email,
      userData.password
    );

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.username).toBe(userData.username);
    expect(result.email).toBe(userData.email);
  });

  it('Should get a user by email', async () => {
    const userEmail = 'test@example.com';

    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: userEmail,
      password: 'testpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await userDAL.getUserByEmail(userEmail);

    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.username).toBe('testuser');
    expect(result.email).toBe(userEmail);
  });

  // Should handle unique constraint for email
  it('Should handle unique constraint for email', async () => {
    const duplicateEmail = 'test@example.com';

    // Mock the behavior when Prisma throws an error for duplicate email
    prismaMock.user.create.mockRejectedValue({
      code: 'P2002',
      message: 'Email must be unique',
    });

    await expect(userDAL.createUser('testuser', duplicateEmail, 'testpassword')).rejects.toEqual({
      code: 'P2002',
      message: 'Email must be unique',
    });
  });

});
