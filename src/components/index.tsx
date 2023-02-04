import React from 'react'
import ReactDOM from 'react-dom/client'
import BsddSearch from './BsddSearch'
import { RecoilRoot } from 'recoil'

export function insertBsddSearch(domElement: HTMLElement, callback: any, config: any) {
  const root = ReactDOM.createRoot(domElement as HTMLElement)
  root.render(
    <RecoilRoot>
      <React.StrictMode>
        <BsddSearch callback={callback} config={config} />
      </React.StrictMode>
    </RecoilRoot>,
  )
}

export default BsddSearch
