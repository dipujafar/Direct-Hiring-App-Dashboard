export const tagTypes = {
  auth: "auth",
  profile: "profile",
  user: "user",
  admin: "admin",
  earning: "earning",
  helper: "helper",
  announcement: "announcement",
} as const;

export const tagTypesList = [
  tagTypes.auth,
  tagTypes.profile,
  tagTypes.user,
  tagTypes.admin,
  tagTypes.earning,
  tagTypes.helper,
  tagTypes.announcement,
];
