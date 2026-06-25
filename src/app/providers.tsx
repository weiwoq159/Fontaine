import { App as AntdApp, ConfigProvider } from 'antd'
import type { ReactNode } from 'react'
import { fontaineTheme } from './theme'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ConfigProvider theme={fontaineTheme}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  )
}
