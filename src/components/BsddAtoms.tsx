import { atom } from 'recoil'
import { ClassificationContractV4, DomainContractV3 } from './BsddApi'

interface Option {
  label: string
  value: string
}

export const recursiveModeState = atom<boolean>({
  key: 'recursiveMode',
  default: false,
})
export const classificationsState = atom<ClassificationContractV4[]>({
  key: 'classifications',
  default: [],
})
export const activeClassificationUriState = atom<string>({
  key: 'activeClassificationUri',
  default: '',
})
export const activeDomainsState = atom<Option[]>({
  key: 'activeDomains',
  default: [],
})
export const domainsState = atom<{ [id: string]: DomainContractV3 }>({
  key: 'domains',
  default: {},
})
export const propertySetsState = atom<{ [id: string]: IfcPropertySet }>({
  key: 'propertySets',
  default: {},
})
