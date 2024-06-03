import { mutation } from '@convex-dev/server';
import { setupConvexClient } from '@convex-dev/client';

// Define your mutation
const addUser = mutation(async ({ db }, { username, password, role }) => {
  await db.table('users').insert({ username, password, role });
});

// Convex client setup
const convexClient = setupConvexClient({
  address: process.env.CONVEX_URL,
  functions: {
    addUser,
  },
});

// Add initial users
const seedDatabase = async () => {
  await convexClient.addUser({ username: 'admin', password: 'adminpass', role: 'ADMIN' });
  await convexClient.addUser({ username: 'user', password: 'userpass', role: 'USER' });
  console.log('Initial users added to the database');
};

// Run the seeding function
seedDatabase().then(() => process.exit());
