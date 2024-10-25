/**
 * A context provider for libp2p
 */
import { createDelegatedRoutingV1HttpApiClient } from '@helia/delegated-routing-v1-http-api-client'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { devToolsMetrics } from '@libp2p/devtools-metrics'
import { identify } from '@libp2p/identify'
import { webRTC, webRTCDirect } from '@libp2p/webrtc'
import { webSockets } from '@libp2p/websockets'
import { webTransport } from '@libp2p/webtransport'
import { libp2pDefaults as getLibp2pDefaults } from 'helia'
import { createLibp2p, type Libp2p } from 'libp2p'
import { createContext, useContext, useEffect, useState } from 'react'
import { ConfigContext } from './config-provider.jsx'

export interface Libp2pContextValue {
  libp2p: Libp2p | null
}
export const Libp2pContext = createContext<Libp2pContextValue>({ libp2p: null })

const defaultTransports = {
  'circuit-relay': circuitRelayTransport(),
  webrtc: webRTC(),
  'webrtc-direct': webRTCDirect(),
  websockets: webSockets(),
  webtransport: webTransport()
}

export const Libp2pProvider: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const [libp2p, setLibp2p] = useState<Libp2p | null>(null)
  const { enableWss, enableWebTransport, enableGatewayProviders } = useContext(ConfigContext)

  useEffect(() => {
    void (async () => {
      if (libp2p != null) {
        await libp2p.stop()
      }
      // eslint-disable-next-line no-console
      console.log('debug: resetting libp2p')
      const libp2pDefaults = getLibp2pDefaults()

      libp2pDefaults.addresses = {
        ...libp2pDefaults.addresses,
        listen: []
      }
      libp2pDefaults.metrics = devToolsMetrics()
      libp2pDefaults.services.identify = identify({
        runOnConnectionOpen: false
      })
      libp2pDefaults.transports = Object.entries(defaultTransports).reduce<NonNullable<typeof libp2pDefaults.transports>>((acc, [key, value]) => {
        if (key === 'webtransport' && !enableWebTransport) {
          console.log('debug: skipping webtransport transport')
          return acc
        }
        if (key === 'websockets' && !enableWss) {
          console.log('debug: skipping websockets transport')
          return acc
        }

        acc.push(value)
        return acc
      }, [])

      libp2pDefaults.services.delegatedRouting = () => createDelegatedRoutingV1HttpApiClient('https://delegated-ipfs.dev', {
        filterProtocols: ['unknown', 'transport-bitswap', 'transport-ipfs-gateway-http'],
        filterAddrs: ['https', 'webtransport', 'webrtc', 'webrtc-direct', 'wss', 'tls']
      })

      setLibp2p(await createLibp2p(libp2pDefaults))
    })().catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Failed to create libp2p', err)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableWss, enableWebTransport, enableGatewayProviders])

  useEffect(() => {
    if (libp2p != null) {
      void libp2p.start()
    }
    return () => {
      if (libp2p?.status === 'started') {
        void libp2p?.stop()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libp2p?.status])

  const value: Libp2pContextValue = {
    libp2p
  }

  return (

    <Libp2pContext.Provider value={value}>
      {children}
    </Libp2pContext.Provider>
  )
}
