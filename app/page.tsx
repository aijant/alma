import { NextPage } from "next";

import PageForm from "./form/page";
import PageLeads from "./leads/page";
import { AuthProvider } from "@/app/authContext";

const PageMain: NextPage = () => {
  return (
    <AuthProvider>
      <PageLeads />
    </AuthProvider>
  );
};

export default PageMain;
