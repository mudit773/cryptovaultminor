// CryptoVault/src/pages/Audit.tsx

import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, Lock, FileText } from 'lucide-react'; // Added lucide icons
import { Header } from "@/components/Header"; // Kept your Header import

// Define the structure of the data expected from the Django API
interface FileLog {
    id: number;
    file: string; // The URL path segment to the file (e.g., secure_vault_files/file.pdf)
    uploaded_at: string;
    blockchain_hash: string;
}

// DRF often wraps list data in this structure (e.g., if using pagination)
interface DRFListResponse {
    results: FileLog[];
    // count, next, previous, etc. are also common here
}

const Audit = () => {
    const [logs, setLogs] = useState<FileLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            console.log("Fetching logs from API...");
            try {
                const response = await fetch("/api/files"); 
                
                if (!response.ok) {
                    // Log the failure status
                    console.error("API Fetch Failed with Status:", response.status, response.statusText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                // 🎯 FIX 1: Log the raw response and handle potential DRF list wrapping
                const rawData = await response.json();
                console.log("Raw Data Received from Django:", rawData);

                let fileList: FileLog[] = [];
                
                // If DRF sends a list object (like when using pagination)
                if (Array.isArray(rawData)) {
                    fileList = rawData;
                } else if (rawData && Array.isArray(rawData.results)) {
                    // If DRF sends a paginated object
                    fileList = rawData.results;
                }
                
                // 🎯 FIX 2: Check if the received list is populated
                if (fileList.length === 0) {
                    console.warn("API returned successfully, but the list of files is empty.");
                }

                setLogs(fileList);
            } catch (error) {
                console.error("❌ Fatal Error during fetch or JSON parse:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);
    
    // ... (rest of the component remains the same)
    const constructFileUrl = (filePath: string) => {
        // Constructs the full public access URL by prepending the media URL prefix
        return `/media/${filePath}`; 
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">
                        Blockchain <span className="bg-gradient-crypto bg-clip-text text-transparent">Audit Trail</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Immutable records of all file operations and transactions
                    </p>
                </div>

                <div className="bg-vault-surface p-8 rounded-xl border border-vault-border">
                    {loading ? (
                        <p className="text-center text-muted-foreground">Loading Secure Ledger...</p>
                    ) : logs.length === 0 ? (
                        <p className="text-center text-muted-foreground">No files have been recorded to the ledger yet.</p>
                    ) : (
                        <div className="space-y-6">
                            {logs.map((log) => (
                                <div key={log.id} className="p-4 border rounded-lg shadow-sm">
                                    <div className="flex items-center space-x-3 text-lg font-semibold text-primary mb-2">
                                        <FileText className="h-5 w-5"/>
                                        <span>Record ID: {log.id}</span>
                                    </div>
                                    
                                    {/* 1. Working File Link */}
                                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                                        <LinkIcon className="h-4 w-4"/>
                                        <a 
                                            href={constructFileUrl(log.file)} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="underline hover:text-white transition-colors truncate max-w-lg"
                                        >
                                            {constructFileUrl(log.file)}
                                        </a>
                                    </div>
                                    
                                    {/* 2. Blockchain Hash */}
                                    <div className="text-xs text-security-green flex items-center space-x-2">
                                        <Lock className="h-4 w-4"/>
                                        <span className="font-mono">Hash: {log.blockchain_hash || 'N/A (Update Hash)'}</span>
                                    </div>

                                    <p className="text-xs text-muted-foreground pt-1">
                                        Uploaded: {new Date(log.uploaded_at).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Audit;
