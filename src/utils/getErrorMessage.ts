export const getErrorMessage = (error: unknown): string => {
  console.log("Error object:", error);

  // RTK Query error format
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data === "object"
  ) {
    const data = (error as any).data;

    // Check custom API errorSources
    if (Array.isArray(data.errorSources) && data.errorSources.length > 0) {
      const err = data.errorSources[0];
      return err.path ? `${err.path}: ${err.message}` : err.message;
    }

    // Check Zod validation errors
    if (data.err?.issues?.length > 0) {
      const issue = data.err.issues[0];
      const path = Array.isArray(issue.path)
        ? issue.path.join(".")
        : issue.path;
      return path ? `${path}: ${issue.message}` : issue.message;
    }

    // Fallback to top-level message
    return data.message || "An unexpected error occurred";
  }

  // Axios style
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as any).response === "object"
  ) {
    return (
      (error as any).response?.data?.message || "An unexpected error occurred"
    );
  }

  // Native Error
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};
