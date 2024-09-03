'use client'

import { useState, useEffect, useCallback } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Zap, Rocket } from "lucide-react";
import { getRecentTransactions } from '@/lib/solana';
import Timer1 from './timer';

import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from "@/components/ui/button"
interface SuperChat {
  id: number;
  sender: string;
  amount: number;
  message: string;
  timestamp: number;
}

const DISPLAY_DURATION = 10000; // 10 seconds

export default function Component() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const address = searchParams.get('address') || 'No address provided'
  const [transactionData, setTransactionData] = useState<any>(null)

  useEffect(() => {
    // Fetch data based on the address
    // Replace this with your actual data fetching logic
    const fetchTransactionData = async () => {
      // Placeholder for API call or data fetching
      const data = { message: 'Fetching data for address: ' + address }
      setTransactionData(data)
    }

    fetchTransactionData()
  }, [address])

  const [superChats, setSuperChats] = useState<SuperChat[]>([]);
  const [timer, setTimer] = useState(0);

  const addSuperChat = useCallback((newChat: Omit<SuperChat, 'timestamp'>) => {
    setSuperChats(prevChats => [
      ...prevChats,
      { ...newChat, timestamp: Date.now() }
    ]);
  }, []);

  const solanaAccount = address; //'5gjLjKtBhDxWL4nwGKprThQwyzzNZ7XNAVFcEtw3rD4i'; // Replace with the account you want to track

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await getRecentTransactions(solanaAccount);
      const formattedChats: SuperChat[] = transactions.map((tx, index) => ({
        id: index,
        sender: tx?.transaction.message.accountKeys[0].toString() || 'Unknown', // Handle undefined cases
        amount: tx?.meta?.postBalances[0] ? tx.meta.postBalances[0] / 11035.21 : 0, // Default to 0 if undefined
        message: `Transaction signature: ${tx?.transaction.signatures[0] || 'Unknown'}`,
        timestamp: Date.now()
      }));
      setSuperChats(formattedChats);
    };

    fetchTransactions();
    superChats.forEach((chat, index) => {
      setTimeout(() => addSuperChat(chat), index * 3000);
    });

  }, [solanaAccount]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen animated-background">
      <header className="bg-purple-800 bg-opacity-50 backdrop-blur-md p-6 text-white border-b border-purple-700 flex items-center">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Coins className="mr-2 h-8 w-8 text-yellow-400" />
          </div>
          <div className="flex-grow flex items-center justify-center text-center">
            <h1 className="text-3xl font-bold">Solana Super Chat</h1>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Live</span>
            </div>
            <div className="bg-purple-700 rounded-full px-3 py-1">
              {<Timer1 />}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6">
        <Card className="bg-purple-800 bg-opacity-30 backdrop-blur-md border-purple-700">
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-12rem)] p-6">
              <div className="space-y-4">
                {superChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="bg-purple-700 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white shadow-lg animate-fadeIn border border-purple-600"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="h-10 w-10 bg-gradient-to-br from-yellow-400 to-purple-500 border-2 border-white">
                        <AvatarFallback>{chat.sender.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{chat.sender}</h3>
                        <p className="text-sm text-purple-300 flex items-center">
                          <Rocket className="h-4 w-4 mr-1 text-yellow-400" />
                          Approx INR - {chat.amount.toFixed(2)} Rupee in SOL
                        </p>
                      </div>
                    </div>
                    <p className="text-purple-100 bg-purple-800 bg-opacity-30 rounded p-2 mt-2">{chat.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

