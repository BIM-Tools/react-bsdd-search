import AsyncSelect from 'react-select/async'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Api } from './BsddApi'
import { activeClassificationUriState, activeDomainsState } from './BsddAtoms'

const api = new Api()
api.baseUrl = 'https://test.bsdd.buildingsmart.org'

interface Option {
  label: string
  value: string
}

//https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3
function Search() {
  const activeDomains: Option[] = useRecoilValue(activeDomainsState)
  const setActiveClassificationUri = useSetRecoilState(activeClassificationUriState)

  const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
    if (inputValue.length > 2) {
      const queryParameters = {
        SearchText: inputValue,
        TypeFilter: 'Classifications',
        DomainNamespaceUris: activeDomains.map((domain) => domain.value),
      }
      api.api.textSearchListOpenV5List(queryParameters).then((response) => {
        if (response.data.classifications) {
          callback(
            response.data.classifications.map((c) => ({
              value: c.namespaceUri,
              label: c.name,
            })),
          )
        }
      })
    } else {
      callback([])
    }
  }

  const handleOnChange = (e: any) => {
    setActiveClassificationUri(e.value)
  }

  return (
    <div>
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions
        placeholder={<div>bSDD search...</div>}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  )
}

export default Search
