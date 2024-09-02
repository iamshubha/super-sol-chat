// import SolanaSuperChat from "@/components/solana-super-chat";


// export default function Page() {
//   return <SolanaSuperChat />
// }

// pages/index.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Coins, Zap } from 'lucide-react'

export default function Component() {
  const [address, setAddress] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (address.trim()) {
      // Navigate to the next page with the address as a query parameter
      router.push(`/result?address=${encodeURIComponent(address)}`)
    }
  }

  return (
    <div className="flex flex-col h-screen animated-background">
      <header className="bg-purple-800 bg-opacity-50 backdrop-blur-md p-6 text-white border-b border-purple-700 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Coins className="h-8 w-8 text-yellow-400" />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-3xl font-bold">Solana Super Chat</h1>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span>Live</span>
          </div>
        </div>
      </header>
      <Card className="w-full max-w-md mx-auto mt-12 bg-opacity-30 backdrop-blur-md border-purple-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Enter Solana Address</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Solana Address</Label>
                <Input
                  id="address"
                  placeholder="Paste your Solana address here"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
