// pages/result.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SolanaSuperChat from "@/components/solana-super-chat";


export default function Page() {
    return <SolanaSuperChat />
}

// pages/index.tsx
// export default function Result() {
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const address = searchParams.get('address') || 'No address provided'
//     const [transactionData, setTransactionData] = useState<any>(null)

//     useEffect(() => {
//         // Fetch data based on the address
//         // Replace this with your actual data fetching logic
//         const fetchTransactionData = async () => {
//             // Placeholder for API call or data fetching
//             const data = { message: 'Fetching data for address: ' + address }
//             setTransactionData(data)
//         }

//         fetchTransactionData()
//     }, [address])

//     return (
//         <Card className="w-full max-w-md mx-auto mt-12">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-bold">Transaction Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="grid w-full items-center gap-4">
//                     <div className="flex flex-col space-y-1.5">
//                         <p className="text-lg font-semibold">Solana Address:</p>
//                         <p>{address}</p>
//                         <div className="mt-4">
//                             <p className="text-lg font-semibold">Transaction Data:</p>
//                             <pre>{JSON.stringify(transactionData, null, 2)}</pre>
//                         </div>
//                     </div>
//                 </div>
//             </CardContent>
//             <CardFooter>
//                 <Button type="button" onClick={() => router.push('/')} className="w-full">Back to Home</Button>
//             </CardFooter>
//         </Card>
//     )
// }
