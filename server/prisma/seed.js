// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 🔐 Hash admin password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 👤 Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // 👤 Create sample user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'user@gmail.com',
      password: userPassword,
      role: 'USER',
    },
  });

  // 📚 Create categories
  const fiction = await prisma.category.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction' },
  });

  const sciFi = await prisma.category.upsert({
    where: { name: 'Science Fiction' },
    update: {},
    create: { name: 'Science Fiction' },
  });

  // 📖 Create books with category IDs
  const book1 = await prisma.book.create({
    data: {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A story of the Jazz Age in 1920s America.',
      featured: true,
      categoryId: fiction.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: 'Dune',
      author: 'Frank Herbert',
      description: 'Epic science fiction novel set on the desert planet Arrakis.',
      featured: false,
      categoryId: sciFi.id,
    },
  });

  // ✍️ Create a sample review
  await prisma.review.create({
    data: {
      content: 'Absolutely loved this book!',
      rating: 5,
      userId: user.id,
      bookId: book1.id,
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
