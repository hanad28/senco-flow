import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily("delete expired enquiries", { hourUTC: 2, minuteUTC: 0 }, internal.enquiries.cleanupExpired);

export default crons;
