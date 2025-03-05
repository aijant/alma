
import { NextPage } from "next";

import MainContent from "@/components/screens/main";
import LeadsTable from "@/components/screens/leads";
import { AuthProvider } from "@/app/authContext";

const PageMain: NextPage = () => {
  
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

export default PageMain;
