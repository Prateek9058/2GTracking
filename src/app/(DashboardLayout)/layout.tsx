import FullLayout from "@/app/(DashboardLayout)/layout/FullLayout";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getServerSession(authOptions);

  if (session?.status === "loading") {
    return <p> Loading.....</p>;
  }
  return (
    <html lang="en">
      <body>
        <FullLayout>{children}</FullLayout>
      </body>
    </html>
  );
}


