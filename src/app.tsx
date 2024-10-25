import { Body } from './components/body'
import { Config } from './components/config.jsx'
import { Header } from './components/header.jsx'
import { ConfigProvider } from './providers/config-provider.js'
import { Libp2pProvider } from './providers/libp2p-provider'

export const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Libp2pProvider>
        <Header />
        <Config />
        <Body />
      </Libp2pProvider>
    </ConfigProvider>
  )
}

export default App
