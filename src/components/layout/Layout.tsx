import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  userRole?: 'patient' | 'doctor' | 'nurse' | 'caregiver' | 'admin';
  showSidebar?: boolean;
}

export const Layout = ({ children, userRole = 'doctor', showSidebar = true }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar userRole={userRole} />}
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};