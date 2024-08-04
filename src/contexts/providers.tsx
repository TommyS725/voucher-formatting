import { ComponentProps } from "react";
import { SettingProvider } from "./setting-provider";
import { ThemeProvider } from "./theme-provider";
import { VoucherDataProvider } from "./voucher-data-provider";


const SETTING_CONFIG = {
  autoIncrement: {
    StorageKey: 'autoIncrement',
    defaultValue: false
  }
} satisfies ComponentProps<typeof SettingProvider>['config']


function Providers({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider defaultTheme='system' storageKey="vite-ui-theme">
      <SettingProvider config={SETTING_CONFIG}>
        <VoucherDataProvider>
          {children}
        </VoucherDataProvider>
      </SettingProvider>
    </ThemeProvider>
  );
}

export default Providers;