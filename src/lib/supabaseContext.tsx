import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { AlertCircle } from 'lucide-react';

interface SupabaseContextType {
  isConnected: boolean;
  connectionError: string | null;
}

export const SupabaseContext = createContext<SupabaseContextType>({
  isConnected: false,
  connectionError: null,
});

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.from('_realtime').select('*').limit(1);
        
        if (error && error.message.includes('authentication')) {
          setConnectionError('Authentication failed. Please check your Supabase credentials.');
          setIsConnected(false);
        } else {
          setIsConnected(true);
          setConnectionError(null);
        }
      } catch (err) {
        setIsConnected(false);
        setConnectionError('Could not connect to Supabase. Please check your internet connection.');
      }
    }

    checkConnection();

    // Set up a periodic connection check every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SupabaseContext.Provider value={{ isConnected, connectionError }}>
      {connectionError && (
        <div className="fixed top-0 left-0 right-0 bg-red-50 p-4 flex items-center justify-center z-50">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <span className="text-red-700">{connectionError}</span>
        </div>
      )}
      {children}
    </SupabaseContext.Provider>
  );
}