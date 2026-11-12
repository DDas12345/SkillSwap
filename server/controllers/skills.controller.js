import prisma from "../db.js";

export const getMySkills = async (req, res) => {
  try {
    // Get the logged-in user's ID from the JWT middleware
    const userId = req.user.userId;

    // Fetch all skills belonging to this user
    const userSkills = await prisma.userSkill.findMany({
      where: {
        userId: userId,
      },
      include: {
        skill: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      skills: userSkills,
    });
  } catch (error) {
    console.error("Get skills error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your skills.",
    });
  }
};

export const addSkill = async (req, res) => {
  try {
    // 1. Get the logged-in user's ID
    const userId = req.user.userId;

    // 2. Get skill name and type from request body
    const { name, type } = req.body;

    // 3. Validate skill name
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required.",
      });
    }

    // 4. Validate skill type
    if (!["TEACHING", "LEARNING"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Skill type must be TEACHING or LEARNING.",
      });
    }

    const normalizedName = name.trim();

    // 5. Perform database operations in one transaction
    const userSkill = await prisma.$transaction(async (tx) => {
      // Find or create the General category
      const category = await tx.category.upsert({
        where: {
          name: "General",
        },
        update: {},
        create: {
          name: "General",
        },
      });

      // Find or create the skill
      const skill = await tx.skill.upsert({
        where: {
          name_categoryId: {
            name: normalizedName,
            categoryId: category.id,
          },
        },
        update: {},
        create: {
          name: normalizedName,
          categoryId: category.id,
        },
      });

      // Connect the skill with the logged-in user
      return tx.userSkill.create({
        data: {
          userId,
          skillId: skill.id,
          type,
        },
        include: {
          skill: {
            include: {
              category: true,
            },
          },
        },
      });
    });

    return res.status(201).json({
      success: true,
      message: "Skill added successfully!",
      skill: userSkill,
    });
  } catch (error) {
    // Handle duplicate skill associations
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "You have already added this skill.",
      });
    }

    console.error("Add skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add skill.",
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    // 1. Get the logged-in user's ID
    const userId = req.user.userId;

    // 2. Get the skill association ID from the URL
    const userSkillId = Number(req.params.id);

    // 3. Validate the ID
    if (!Number.isInteger(userSkillId) || userSkillId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid skill ID.",
      });
    }

    // 4. Delete only this user's skill association
    const result = await prisma.userSkill.deleteMany({
      where: {
        id: userSkillId,
        userId: userId,
      },
    });

    // 5. Check whether a record was deleted
    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Skill not found in your profile.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill removed successfully!",
    });

  } catch (error) {
    console.error("Delete skill error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to remove skill.",
    });
  }
};