/** Clerk user id that receives the fictional demo caseload on first login. */
export const DEMO_CLERK_USER_ID = "user_3H00chWDFb5d61UkU3xdPTPm3Ud";

export function isDemoClerkUser(userId: string | null | undefined): boolean {
  return Boolean(userId && userId === DEMO_CLERK_USER_ID);
}
