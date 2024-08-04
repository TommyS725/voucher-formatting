import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RequiredFields from './components/RequiredFields'
import EligibilityFields from "./components/EligibilityFields"
import Output from "./components/Output"
import Providers from "./contexts/providers"
import VoucherJsonData from "./components/voucher-json-data"


function App() {

  return (
    <>
      <Providers>
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
                  <RequiredFields  />
                </TabsContent>
                <TabsContent value="eligibility">
                  <EligibilityFields  />
                </TabsContent>
              </Tabs>
            </div>
            <Output />
          </div>
         <VoucherJsonData />
        </main>
        <Toaster />
      </Providers>
    </>
  )
}

export default App
