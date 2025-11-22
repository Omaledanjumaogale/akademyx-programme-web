import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Create an admin user
 * This should only be used for initial setup
 */
export const createAdminUser = mutation({
    args: {
        email: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        phone: v.string(),
        password: v.optional(v.string()), // For future password-based auth
    },
    handler: async (ctx, args) => {
        // Check if admin already exists
        const existingAdmin = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        if (existingAdmin) {
            throw new Error("User with this email already exists");
        }

        const now = Date.now();
        const userId = await ctx.db.insert("users", {
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            phone: args.phone,
            role: "admin",
            isActive: true,
            createdAt: now,
            updatedAt: now,
        });

        return {
            userId,
            message: "Admin user created successfully",
            credentials: {
                email: args.email,
                role: "admin",
            },
        };
    },
});

/**
 * Get all admin users
 */
export const getAdminUsers = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("role"), "admin"))
            .collect();
    },
});

/**
 * Create sample data for testing
 */
export const createSampleData = mutation({
    handler: async (ctx) => {
        const now = Date.now();

        // Create sample applications
        const sampleApplications: Array<Parameters<typeof ctx.db.insert<"applications">>[1]> = [
            {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                phone: "+2348012345678",
                age: 25,
                occupation: "Student",
                location: "Lagos",
                ninNumber: "12345678901",
                stateOfResident: "Lagos",
                stateOfOrigin: "Ogun",
                motivation: "I want to learn tech skills to improve my career prospects",
                experience: "Basic computer skills",
                goals: "Become a software developer",
                status: "pending" as const,
                referralCode: undefined,
                referralType: "direct" as const,
                partnerId: undefined,
                amount: 50000,
                paymentStatus: "pending" as const,
                createdAt: now - 86400000, // 1 day ago
                updatedAt: now - 86400000,
            },
            {
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@example.com",
                phone: "+2348087654321",
                age: 28,
                occupation: "Teacher",
                location: "Abuja",
                ninNumber: "98765432109",
                stateOfResident: "FCT",
                stateOfOrigin: "Kano",
                motivation: "I want to transition into tech",
                experience: "No prior tech experience",
                goals: "Learn web development",
                status: "approved" as const,
                referralCode: undefined,
                referralType: "direct" as const,
                partnerId: undefined,
                amount: 50000,
                paymentStatus: "completed" as const,
                createdAt: now - 172800000, // 2 days ago
                updatedAt: now - 86400000,
            },
            {
                firstName: "Ahmed",
                lastName: "Ibrahim",
                email: "ahmed.ibrahim@example.com",
                phone: "+2348098765432",
                age: 22,
                occupation: "Graduate",
                location: "Kano",
                ninNumber: "45678901234",
                stateOfResident: "Kano",
                stateOfOrigin: "Kano",
                motivation: "Want to start a tech career",
                experience: "Self-taught programming",
                goals: "Become a full-stack developer",
                status: "pending" as const,
                referralCode: "REF001",
                referralType: "individual" as const,
                partnerId: undefined,
                amount: 50000,
                paymentStatus: "pending" as const,
                createdAt: now - 43200000, // 12 hours ago
                updatedAt: now - 43200000,
            },
        ];

        for (const app of sampleApplications) {
            await ctx.db.insert("applications", app);
        }

        // Create sample referral partner
        const partnerId = await ctx.db.insert("referralPartners", {
            name: "University of Lagos",
            type: "institution",
            email: "partnerships@unilag.edu.ng",
            phone: "+2348011111111",
            ninNumber: "11111111111",
            stateOfResident: "Lagos",
            stateOfOrigin: "Lagos",
            referralCode: "UNILAG2024",
            institutionName: "University of Lagos",
            studentUnionPresident: {
                name: "Chidi Okonkwo",
                email: "chidi.okonkwo@unilag.edu.ng",
                phone: "+2348022222222",
            },
            bankingDetails: {
                bankName: "First Bank of Nigeria",
                accountNumber: "1234567890",
                accountName: "University of Lagos",
            },
            totalReferrals: 15,
            confirmedReferrals: 10,
            totalCommission: 75000,
            paidCommission: 50000,
            pendingCommission: 25000,
            status: "active",
            isApproved: true,
            createdAt: now - 2592000000, // 30 days ago
            updatedAt: now,
        });

        // Create sample individual partner
        await ctx.db.insert("referralPartners", {
            name: "Emeka Eze",
            type: "individual",
            email: "emeka.eze@example.com",
            phone: "+2348033333333",
            ninNumber: "22222222222",
            stateOfResident: "Enugu",
            stateOfOrigin: "Enugu",
            referralCode: "EMEKA2024",
            bankingDetails: {
                bankName: "GTBank",
                accountNumber: "0987654321",
                accountName: "Emeka Eze",
            },
            totalReferrals: 8,
            confirmedReferrals: 5,
            totalCommission: 40000,
            paidCommission: 25000,
            pendingCommission: 15000,
            status: "active",
            isApproved: true,
            createdAt: now - 1296000000, // 15 days ago
            updatedAt: now,
        });

        // Create sample commissions
        await ctx.db.insert("commissions", {
            partnerId,
            applicationId: undefined as any, // Would link to actual application
            amount: 5000,
            referralCode: "UNILAG2024",
            status: "paid",
            createdAt: now - 604800000, // 7 days ago
        });

        await ctx.db.insert("commissions", {
            partnerId,
            applicationId: undefined as any,
            amount: 5000,
            referralCode: "UNILAG2024",
            status: "pending",
            createdAt: now - 86400000, // 1 day ago
        });

        return {
            message: "Sample data created successfully",
            created: {
                applications: sampleApplications.length,
                referralPartners: 2,
                commissions: 2,
            },
        };
    },
});

/**
 * Clear all sample data (use with caution!)
 */
export const clearSampleData = mutation({
    handler: async (ctx) => {
        // This is a dangerous operation - only use in development
        const applications = await ctx.db.query("applications").collect();
        const partners = await ctx.db.query("referralPartners").collect();
        const commissions = await ctx.db.query("commissions").collect();

        for (const app of applications) {
            await ctx.db.delete(app._id);
        }

        for (const partner of partners) {
            await ctx.db.delete(partner._id);
        }

        for (const commission of commissions) {
            await ctx.db.delete(commission._id);
        }

        return {
            message: "All sample data cleared",
            deleted: {
                applications: applications.length,
                referralPartners: partners.length,
                commissions: commissions.length,
            },
        };
    },
});

