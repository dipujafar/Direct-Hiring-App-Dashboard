export const tagTypes = {
  auth: "auth",
  profile: "profile",
  user: "user",
  admin: "admin",
  earning: "earning",
  helper: "helper",
} as const;

export const tagTypesList = [tagTypes.auth, tagTypes.profile, tagTypes.user];
