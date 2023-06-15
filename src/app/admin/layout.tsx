import Header from "@/components/Header";

interface IRoute {
  path: string;
  label: string;
}

const routes: IRoute[] = [
  {
    path: "/",
    label: "Logout"
  }
];

export const metadata = {
  title: "Admin",
  description: "admin page"
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header routes={routes} />
      <main>{children}</main>
    </>
  );
}
