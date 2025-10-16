import express, { Request, Response } from "express";

const router = express.Router();

// This route is required by Facebook to comply with data deletion policies.
router.get("/data-deletion", (req: Request, res: Response) => {
  return res.status(200).json({
    message:
      "If you wish to delete your data associated with this app, please contact our support team or delete your account from your profile settings.",
    contact: "support@yourecommerce.com",
    instructions:
      "Go to your account settings and click 'Delete Account' to remove your data.",
  });
});

export default router;
