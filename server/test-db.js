import prisma from "./db.js";

try {
    await prisma.$connect();

    console.log("Successfully connected to PostgreSQL!");

    const result = await prisma.$queryRaw`
        SELECT current_database() AS database,
               current_user AS username
    `;

    console.log("Database details:", result);

} catch (error) {
    console.error("Database connection failed:", error);
} finally {
    await prisma.$disconnect();
}