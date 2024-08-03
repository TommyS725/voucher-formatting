// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RequiredFields from './components/RequiredFields'
import useVoucherData from './hooks/useVocuherData'
import EligibilityFields from "./components/EligibilityFields"
import Output from "./components/Output"

function App() {
  const [data, action] = useVoucherData()

  return (
    <>
      <main className="  m-8 mb-20 space-y-16    ">
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
          </div>
          <Output data={data} action={action} />
        </div>
        {/* json string of extension to copy */}
        {data.tester && <pre className="bg-gray-100 p-4 rounded-lg hidden" id='v_data'>
          {JSON.stringify(data.voucherJson)}
        </pre>}
      </main>
      <Toaster />
    </>
  )
}

export default App
