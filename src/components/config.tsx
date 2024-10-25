/**
 * A configuration component for changing the configuration
 */
import { useContext } from 'react'
import { ConfigContext } from '../providers/config-provider.js'

export const Config: React.FC = () => {
  const { enableWss, enableWebTransport, enableGatewayProviders, setConfig } = useContext(ConfigContext)

  return (
    <div>
      <div>
        <label htmlFor="enableWss">Enable WebSocketsSecure</label>
        <input type="checkbox" id="enableWss" name="enableWss" checked={enableWss} onChange={() => { setConfig({ enableWss: !enableWss }) }} />
      </div>
      <div>
        <label htmlFor="enableWebTransport">Enable WebTransport</label>
        <input type="checkbox" id="enableWebTransport" name="enableWebTransport" checked={enableWebTransport} onChange={() => { setConfig({ enableWebTransport: !enableWebTransport }) }} />
      </div>
      <div>
        <label htmlFor="enableGatewayProviders">Enable Gateway Providers</label>
        <input type="checkbox" id="enableGatewayProviders" name="enableGatewayProviders" checked={enableGatewayProviders} onChange={() => { setConfig({ enableGatewayProviders: !enableGatewayProviders }) }} />
      </div>
    </div>
  )
}
