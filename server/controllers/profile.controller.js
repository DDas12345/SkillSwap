import prisma from "../db.js";

// GET the logged-in student's profile
export const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                fullName: true,
                email: true,
                course: true,
                yearOfStudy: true,
                bio: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Profile not found.",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        console.error("Get profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load your profile.",
        });
    }
};


// UPDATE the logged-in student's profile
export const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { fullName, course, yearOfStudy, bio } = req.body;

        const updateData = {};

        if (fullName !== undefined) {
            if (typeof fullName !== "string" || !fullName.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Full name cannot be empty.",
                });
            }

            updateData.fullName = fullName.trim();
        }

        if (course !== undefined) {
            if (typeof course !== "string") {
                return res.status(400).json({
                    success: false,
                    message: "Course must be text.",
                });
            }

            updateData.course = course.trim() || null;
        }

        if (yearOfStudy !== undefined) {
            if (typeof yearOfStudy !== "string") {
                return res.status(400).json({
                    success: false,
                    message: "Year of study must be text.",
                });
            }

            updateData.yearOfStudy = yearOfStudy.trim() || null;
        }

        if (bio !== undefined) {
            if (typeof bio !== "string" || bio.length > 500) {
                return res.status(400).json({
                    success: false,
                    message: "Bio must be text with a maximum of 500 characters.",
                });
            }

            updateData.bio = bio.trim() || null;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No profile information was provided.",
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                fullName: true,
                email: true,
                course: true,
                yearOfStudy: true,
                bio: true,
                createdAt: true,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            user: updatedUser,
        });

    } catch (error) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update your profile.",
        });
    }
};