
import { NextPage } from "next";

import MainContent from "@/components/screens/main";
import LeadsTable from "@/components/screens/leads";
import { AuthProvider } from "@/app/authContext";

const PageMain: NextPage = async () => {
  
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

export default PageMain;
