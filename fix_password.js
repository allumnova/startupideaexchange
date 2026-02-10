const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    const email = 'demo.founder@exchange.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Updating password for:', email);
    try {
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });
        console.log('Password updated successfully.');
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
