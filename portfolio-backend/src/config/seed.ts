import Admin from "../modules/auth/auth.model";
import { createAdminSchema } from "../modules/auth/auth.schema";
import bcrypt from "bcrypt";

export async function seedAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log("Admin already exists. Skipping seeding.");
      return;
    }

    // Create initial admin (CA)
    const adminData = {
      email: "suman011@gmail.com", // Change to CA's actual email
      hashedPassword: "Suman123$", // Change to CA's actual password
      name: "Mohan Sir",
      isActive: true,
      image: null,
      // Change to CA's actual name
    };
    const isValid = createAdminSchema.safeParse(adminData);
    if (!isValid.success) {
      console.log("zod validation error");
      return;
    }

    const admin = new Admin({
      email: isValid.data.email,
      name: isValid.data.name,
      role: isValid.data.role,
      isActive: isValid.data.isActive,
      image: isValid.data.image ?? null,
      hashedPassword: await bcrypt.hash(isValid.data.hashedPassword, 12),
    });
    await admin.save();

    console.log(" Admin seeded successfully:");
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
  } catch (error) {
    console.error("seeding error:", error);
    throw error;
  }
}
