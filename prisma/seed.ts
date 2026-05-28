import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.gamingPc.deleteMany();
  await prisma.gamingPc.createMany({
    data: [
      {
        name: "Starter Gaming PC",
        description: "Solider Einsteiger-PC fuer 1080p Gaming",
        priceCents: 89900,
        gpu: "RTX 4060",
        cpu: "Ryzen 5 5600",
        ramGb: 16,
        storageGb: 1000,
        mainboard: "B550 Mainboard",
        inStock: true,
      },
      {
        name: "High-End RTX Gaming PC",
        description: "Leistungsstarker PC fuer 1440p und 4K Gaming",
        priceCents: 219900,
        gpu: "RTX 4080 Super",
        cpu: "Ryzen 7 7800X3D",
        ramGb: 32,
        storageGb: 2000,
        mainboard: "X670 Mainboard",
        inStock: true,
      },
      {
        name: "Budget Esports PC",
        description: "Preiswerter PC fuer Valorant, CS2 und Fortnite",
        priceCents: 64900,
        gpu: "RX 6600",
        cpu: "Ryzen 5 5500",
        ramGb: 16,
        storageGb: 500,
        mainboard: "A520 Mainboard",
        inStock: false,
      },
    ],
  });

  console.log("Seed data created");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });