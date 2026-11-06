export const getHealth = (req, res) => {
    res.status(200).json({
        success: true,
        message: "SkillSwap Campus backend is healthy!",
        status: "running"
    });
};