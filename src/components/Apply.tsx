import { useRecoilValue } from 'recoil'
import { ClassificationContractV4, DomainContractV3 } from './BsddApi'
import { classificationsState, domainsState, propertySetsState } from './BsddAtoms'

interface Props {
  callback: (value: any) => void
}

function Apply(props: Props) {
  const domains: { [id: string]: DomainContractV3 } = useRecoilValue(domainsState)
  const classifications: ClassificationContractV4[] = useRecoilValue(classificationsState)
  const propertySets: { [id: string]: IfcPropertySet } = useRecoilValue(propertySetsState)

  function getIfcEntity(propertySets: { [id: string]: IfcPropertySet }): IfcEntity {
    const ifc: IfcEntity = {}
    if (classifications.length) {
      ifc.hasAssociations = classifications.map((classification) => getIfcClassificationReference(classification))
    }
    const ifcPropertySets: IfcPropertySet[] = Object.values(propertySets)
    if (ifcPropertySets.length) {
      ifc.isDefinedBy = ifcPropertySets
    }
    return ifc
  }

  function getIfcClassification(domainNamespaceUri: string): IfcClassification | null {
    if (domainNamespaceUri in domains) {
      const domain: DomainContractV3 = domains[domainNamespaceUri]
      if (domain) {
        const ifc: IfcClassification = {
          type: 'IfcClassification',
          name: domain.name,
        }
        return ifc
      }
    }
    return null
  }

  function getIfcClassificationReference(bsdd: ClassificationContractV4): IfcClassificationReference {
    const ifc: IfcClassificationReference = {
      type: 'IfcClassificationReference',
      name: bsdd.name,
    }
    if (bsdd.namespaceUri) {
      ifc.location = bsdd.namespaceUri
    }
    if (bsdd.code) {
      ifc.identification = bsdd.code
    }
    if (bsdd.domainNamespaceUri) {
      const referencedSource = getIfcClassification(bsdd.domainNamespaceUri)
      if (referencedSource) {
        ifc.referencedSource = referencedSource
      }
    }
    return ifc
  }

  const handleOnChange = () => {
    props.callback(getIfcEntity(propertySets))
  }

  return (
    <div>
      <button type='button' className='btn btn-secondary w-100' onClick={() => handleOnChange()}>
        Apply
      </button>
    </div>
  )
}

export default Apply
