
import prisma from "../db.js";

// Get incoming and outgoing requests for the logged-in user
export const getMyRequests = async (req, res) => {
    try {
        const userId = req.user.userId;

        const requestDetails = {
            sender: {
                select: {
                    id: true,
                    fullName: true,
                    course: true,
                    yearOfStudy: true,
                },
            },
            receiver: {
                select: {
                    id: true,
                    fullName: true,
                    course: true,
                    yearOfStudy: true,
                },
            },
            requestedSkill: {
                include: {
                    category: true,
                },
            },
            offeredSkill: {
                include: {
                    category: true,
                },
            },
        };

        const [incomingRequests, outgoingRequests] = await Promise.all([
            prisma.exchangeRequest.findMany({
                where: { receiverId: userId },
                include: requestDetails,
                orderBy: { createdAt: "desc" },
            }),

            prisma.exchangeRequest.findMany({
                where: { senderId: userId },
                include: requestDetails,
                orderBy: { createdAt: "desc" },
            }),
        ]);

        return res.status(200).json({
            success: true,
            incomingRequests,
            outgoingRequests,
        });

    } catch (error) {
        console.error("Get requests error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch exchange requests.",
        });
    }
};


// Send a new exchange request
export const createRequest = async (req, res) => {
    try {
        const senderId = req.user.userId;

        const receiverId = Number(req.body.receiverId);
        const requestedSkillId = Number(req.body.requestedSkillId);

        const offeredSkillId = req.body.offeredSkillId
            ? Number(req.body.offeredSkillId)
            : null;

        const { message } = req.body;

        // Validate IDs
        if (
            !Number.isInteger(receiverId) ||
            receiverId <= 0 ||
            !Number.isInteger(requestedSkillId) ||
            requestedSkillId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid student or skill ID.",
            });
        }

        // Prevent sending requests to yourself
        if (senderId === receiverId) {
            return res.status(400).json({
                success: false,
                message: "You cannot send a request to yourself.",
            });
        }

        // Verify that the requested skill belongs to the receiver
        const requestedSkill = await prisma.userSkill.findFirst({
            where: {
                userId: receiverId,
                skillId: requestedSkillId,
                type: "TEACHING",
            },
        });

        if (!requestedSkill) {
            return res.status(404).json({
                success: false,
                message: "This student is no longer offering this skill.",
            });
        }

        // If an offered skill was supplied, verify ownership
        if (offeredSkillId !== null) {
            if (!Number.isInteger(offeredSkillId) || offeredSkillId <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid offered skill ID.",
                });
            }

            const offeredSkill = await prisma.userSkill.findFirst({
                where: {
                    userId: senderId,
                    skillId: offeredSkillId,
                    type: "TEACHING",
                },
            });

            if (!offeredSkill) {
                return res.status(400).json({
                    success: false,
                    message: "You can only offer a skill from your teaching list.",
                });
            }
        }

        // Prevent duplicate pending requests
        const existingRequest = await prisma.exchangeRequest.findFirst({
            where: {
                senderId,
                receiverId,
                requestedSkillId,
                status: "PENDING",
            },
        });

        if (existingRequest) {
            return res.status(409).json({
                success: false,
                message: "You already have a pending request for this skill.",
            });
        }

        const newRequest = await prisma.exchangeRequest.create({
            data: {
                senderId,
                receiverId,
                requestedSkillId,
                offeredSkillId,
                message: typeof message === "string"
                    ? message.trim() || null
                    : null,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                requestedSkill: true,
                offeredSkill: true,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Exchange request sent successfully!",
            request: newRequest,
        });

    } catch (error) {
        console.error("Create request error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to send exchange request.",
        });
    }
};


// Accept or reject an incoming request
export const updateRequestStatus = async (req, res) => {
    try {
        const userId = req.user.userId;
        const requestId = Number(req.params.id);
        const { status } = req.body;

        if (!Number.isInteger(requestId) || requestId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid request ID.",
            });
        }

        if (!["ACCEPTED", "REJECTED"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be ACCEPTED or REJECTED.",
            });
        }

        // Only the receiver can update the request
        const existingRequest = await prisma.exchangeRequest.findFirst({
            where: {
                id: requestId,
                receiverId: userId,
            },
        });

        if (!existingRequest) {
            return res.status(404).json({
                success: false,
                message: "Exchange request not found.",
            });
        }

        if (existingRequest.status !== "PENDING") {
            return res.status(409).json({
                success: false,
                message: "This request has already been processed.",
            });
        }

        const updatedRequest = await prisma.exchangeRequest.update({
            where: {
                id: requestId,
            },
            data: {
                status,
            },
        });

        return res.status(200).json({
            success: true,
            message: `Request ${status.toLowerCase()} successfully!`,
            request: updatedRequest,
        });

    } catch (error) {
        console.error("Update request error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update exchange request.",
        });
    }
};
