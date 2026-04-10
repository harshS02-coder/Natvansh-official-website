import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // No authenticated user — redirect to sign-in
  if (!user) {
    redirect("/admin/sign-in");
  }

  // Check if the user's email is in the allowed list
  const allowedEmails = (process.env.ALLOWED_ADMIN_EMAILS || "")
    .replace(/"/g, "") // strip any surrounding quotes
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const userEmail = user.primaryEmailAddress?.emailAddress;

  if (!userEmail || !allowedEmails.includes(userEmail)) {
    redirect("/"); // Unauthorized user — send home
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
