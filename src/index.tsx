import React from 'react'
import ReactDOM from 'react-dom/client'
import BsddSearch from './components/BsddSearch'

// function callback(data: any) {
//   console.log(data)
//   alert(JSON.stringify(data, null, 2))
// }

// const config = {
//   defaultDomains: [
//     {
//       value: 'https://identifier.buildingsmart.org/uri/digibase/volkerwesselsbv-0.1',
//       label: 'VolkerWessels Bouw & Vastgoed',
//     },
//   ],
// }

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export function insertBsddSearch(domElement: HTMLElement, callback: any, config: any) {
  const root = ReactDOM.createRoot(domElement as HTMLElement)
  root.render(
    <React.StrictMode>
      <BsddSearch callback={callback} config={config} />
    </React.StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

export default { BsddSearch }
