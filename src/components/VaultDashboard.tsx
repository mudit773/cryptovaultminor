import Header from "./Header";
import UserProfile from "./UserProfile";
import FileUpload from "./FileUpload";
import FileCard from "./FileCard";
import Vaultng from "../assets/vault.jpeg";

import Footer from "./Footer";
// Mock data for demonstration
const mockFiles = [
  {
    id: "1",
    name: "financial_report_q4_2024.pdf",
    uploadDate: "Dec 20, 2024 - 14:32",
    encryptionType: "AES-256",
    blockchainStatus: "verified",
    syncStatus: "synced",
    size: "2.4 MB"
  },
  {
    id: "2", 
    name: "project_blueprints_v2.zip",
    uploadDate: "Dec 19, 2024 - 09:15",
    encryptionType: "AES-256",
    blockchainStatus: "verified",
    syncStatus: "synced",
    size: "15.7 MB"
  },
  {
    id: "3",
    name: "security_audit_report.docx",
    uploadDate: "Dec 18, 2024 - 16:45",
    encryptionType: "AES-128",
    blockchainStatus: "pending",
    syncStatus: "syncing",
    size: "876 KB"
  },
  {
    id: "4",
    name: "database_backup_dec.sql",
    uploadDate: "Dec 17, 2024 - 23:10",
    encryptionType: "AES-256",
    blockchainStatus: "verified",
    syncStatus: "synced",
    size: "45.2 MB"
  },
  {
    id: "5",
    name: "client_contracts_2024.zip",
    uploadDate: "Dec 16, 2024 - 11:28",
    encryptionType: "AES-256",
    blockchainStatus: "verified",
    syncStatus: "synced",
    size: "8.9 MB"
  },
  {
    id: "6",
    name: "research_data_analysis.xlsx",
    uploadDate: "Dec 15, 2024 - 13:52",
    encryptionType: "AES-128",
    blockchainStatus: "verified",
    syncStatus: "synced",
    size: "3.1 MB"
  }
];

const VaultDashboard = () => {
  return (
    <div
      className="min-h-screen bg-background bg-cover bg-center "
      >
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* User Profile Section */}
        <UserProfile />

        {/* Upload Section */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            Upload Files
            <div className="ml-2 h-px flex-1 bg-gradient-primary opacity-90" />
          </h2>
          <FileUpload />
        </section>  

        {/* Files Grid Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground flex items-center">
              Your Vault
              <span className="ml-3 text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                {mockFiles.length} files
              </span>
              <div className="ml-4 h-px flex-1 bg-gradient-primary opacity-30" />
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {mockFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VaultDashboard;