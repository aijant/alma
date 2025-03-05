import LeadsTable from "@/components/screens/leads";
import { AuthProvider } from "@/app/authContext";

const PageLeads = () => {
  return (
    <AuthProvider>
      <LeadsTable />
    </AuthProvider>
  );
};

export default PageLeads;
