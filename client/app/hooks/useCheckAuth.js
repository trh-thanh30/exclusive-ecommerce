// lib/checkAuth.ts
export function checkAuthOrRedirect(roleRequired) {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (!token) {
      window.location.href = "/signin";
      return;
    }

    if (roleRequired && role !== roleRequired) {
      window.location.href = "/";
      return;
    }
  }
}
