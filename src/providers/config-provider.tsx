/**
 * A provider for the application configuration
 */
import { createContext, useState } from 'react'

export interface ConfigOptions {
  enableWss: boolean
  enableWebTransport: boolean
  enableGatewayProviders: boolean
}

export interface ConfigContextValue extends ConfigOptions {
  setConfig(config: Partial<ConfigOptions>): void
}

const defaultConfig: ConfigContextValue = {
  enableWss: true,
  enableWebTransport: true,
  enableGatewayProviders: false,
  setConfig: () => {}
}
// eslint-disable-next-line react-refresh/only-export-components
export const ConfigContext = createContext<ConfigContextValue>(defaultConfig)

export const ConfigProvider: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const [config, setConfig] = useState<ConfigOptions>(defaultConfig)

  const setConfigFn = (newConfig: Partial<ConfigOptions>): void => {
    setConfig((config) => ({ ...config, ...newConfig }))
  }

  return (
    <ConfigContext.Provider value={{ ...config, setConfig: setConfigFn }}>
      {children}
    </ConfigContext.Provider>
  )
}
