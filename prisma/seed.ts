import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ✅ Default Admin
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@stylusqr.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@stylusqr.com",
      password: "admin123", // ⚠️ hash this in real app
      fullName: "Super Admin",
      role: "super_admin",
    },
  });

  // ✅ Default Subscription Plans
  const free = await prisma.subscription.upsert({
    where: { name: "Free" },
    update: {},
    create: {
      name: "Free",
      description: "Basic plan with limited QR codes",
      priceMonthly: 0,
      priceYearly: 0,
      qrCodesLimit: 5,
      features: JSON.stringify(["Basic QR generation", "Limited scans"]),
    },
  });

  const basic = await prisma.subscription.upsert({
    where: { name: "Basic" },
    update: {},
    create: {
      name: "Basic",
      description: "Good for small businesses",
      priceMonthly: 19900, // ₹199
      priceYearly: 199000, // ₹1990
      qrCodesLimit: 50,
      features: JSON.stringify(["Advanced QR options", "Scan analytics"]),
    },
  });

  const pro = await prisma.subscription.upsert({
    where: { name: "Pro" },
    update: {},
    create: {
      name: "Pro",
      description: "Unlimited QR codes and features",
      priceMonthly: 49900, // ₹499
      priceYearly: 499000, // ₹4990
      qrCodesLimit: -1,
      features: JSON.stringify(["Unlimited QRs", "Priority support", "Advanced analytics"]),
    },
  });

  console.log({ admin, free, basic, pro });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
