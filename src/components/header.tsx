import type React from 'react'

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between pa3 bg-navy">
      <div className="flex items-center">
        <a href="https://github.com/ipfs/helia" title="home">
          <img
            alt="Helia logo"
            src="https://unpkg.com/@helia/css@1.0.1/logos/outlined/helia-wordmark.svg"
            style={{ height: '60px' }}
            className="v-top"
          />
        </a>
      </div>
    </header>
  )
}
