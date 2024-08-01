// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RequiredFields from './components/RequiredFields'
import useVoucherData from './hooks/useVocuherData'
import EligibilityFields from "./components/EligibilityFields"
import Output from "./components/Output"
import { Button } from "./components/ui/button"

function App() {
  const [data, action] = useVoucherData()

  return (
    <>
        <main className="  m-8 mb-20 space-y-16  ">
          <div className=" grid grid-cols-2 gap-2">
           <div className=" space-y-16">
           <Tabs defaultValue="required" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="required">
                  <h1 className="text-xl font-semibold">Required</h1>
                </TabsTrigger>
                <TabsTrigger value="eligibility">
                  <h1 className="text-xl font-semibold">Eligibility</h1>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="required">
                <RequiredFields data={data} update={action} />
              </TabsContent>
              <TabsContent value="eligibility">
                <EligibilityFields data={data} update={action} />
              </TabsContent>
            </Tabs>
            <Button onClick={action.createVoucherData}>Confirm voucher data</Button>
           </div>
            <Output data={data} />
          </div>
        </main>
        <Toaster />
    </>
  )
}

export default App
