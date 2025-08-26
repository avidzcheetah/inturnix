import { Router } from "express";
const router = Router();
import { createEweekHistroy,getEweekHistroy,getEweekHistroyById,deleteEweekHistoryById,updateEweekHistoryById } from "../controllers/EweekHistroyController.js";



router.post("/createEweekHistroy", createEweekHistroy);
router.get("/getEweekHistroy",getEweekHistroy)
router.post("/getEweekHistroyById",getEweekHistroyById)
router.post("/deleteEweekHistoryById",deleteEweekHistoryById)
router.post("/updateEweekHistoryById",updateEweekHistoryById)
export default router;