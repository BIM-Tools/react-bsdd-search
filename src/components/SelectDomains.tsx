import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Api } from './BsddApi'
import { activeDomainsState, domainsState } from './BsddAtoms'

const api = new Api()
api.baseUrl = 'https://test.bsdd.buildingsmart.org'

interface Option {
  label: string
  value: string
}

export default function SelectDomains() {
  const activeDomains: Option[] = useRecoilValue(activeDomainsState)
  const setDomains = useSetRecoilState(domainsState)
  const setActiveDomains = useSetRecoilState(activeDomainsState)

  const [selectOptions, setSelectOptions] = useState<any[]>(activeDomains)

  useEffect(() => {
    api.api.domainV3List().then((response) => {
      if (response.data) {
        setSelectOptions(
          response.data.map((domain) => ({
            value: domain.namespaceUri,
            label: domain.name,
          })),
        )
        setDomains(
          response.data.reduce((accumulator, domain) => {
            if (domain.namespaceUri) {
              return { ...accumulator, [domain.namespaceUri]: domain }
            }
            return { ...accumulator }
          }, {}),
        )
      }
    })
  }, [setSelectOptions, setDomains])

  const handleOnChange = (e: any) => {
    setActiveDomains(e.map((option: Option) => option))
  }

  return (
    <Select
      isMulti
      name='domains'
      options={selectOptions}
      className='basic-multi-select'
      classNamePrefix='select'
      placeholder={<div> filter domains...</div>}
      onChange={(e) => handleOnChange(e)}
      defaultValue={activeDomains.map((domain) => domain)}
    />
  )
}
