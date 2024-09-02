// lib/solana.ts
import {
  Connection,
  PublicKey,
  TransactionResponse,
  GetVersionedTransactionConfig,
} from "@solana/web3.js";

const network =
  "https://mainnet.helius-rpc.com/?api-key=c28171d1-a446-4377-9a5a-6ed44d87c533";
const connection = new Connection(network, "confirmed");

export const getRecentTransactions = async (publicKeyString: string) => {
  try {
    const publicKey = new PublicKey(publicKeyString);
    const signatures = await connection.getSignaturesForAddress(publicKey, {
      limit: 10,
    });

    // Define the config to use the versioned transaction API
    const config: GetVersionedTransactionConfig = {
      maxSupportedTransactionVersion: 1,
    };

    // Fetch transactions with the new API
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        const tx = await connection.getTransaction(sig.signature, config);
        return tx;
      })
    );
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

// export const getRecentTransactions = async (publicKeyString: string) => {
//   try {
//     const publicKey = new PublicKey(publicKeyString);
//     const signatures = await connection.getSignaturesForAddress(publicKey, {
//       limit: 10,
//     });

//     // Define the config to use the versioned transaction API
//     const config: GetVersionedTransactionConfig = {
//       maxSupportedTransactionVersion: 1,
//     };

//     // Fetch transactions with the new API
//     const transactions = await Promise.all(
//       signatures.map(async (sig) => {
//         const tx = await connection.getTransaction(sig.signature, config);

//         return tx;
//       })
//     );
//     const recentTransactions = transactions
//       .filter(
//         (tx) =>
//           tx && tx.blockTime && tx.blockTime > Date.now() / 1000 - 24 * 60 * 60
//       )
//       .sort((a, b) => (b?.blockTime || 0) - (a?.blockTime || 0));
//     return recentTransactions;
//   } catch (error) {
//     console.error("Error fetching transactions:", error);
//     return [];
//   }
// };
