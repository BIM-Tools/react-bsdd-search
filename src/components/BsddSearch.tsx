import { useEffect } from 'react'
import { Form, Accordion, Row, Col, Card } from 'react-bootstrap'
import Search from './Search'
import Classifications from './Classifications'
import PropertySets from './PropertySets'
import RecursiveMode from './RecursiveMode'
import SelectDomains from './SelectDomains'
import Apply from './Apply'
import { useSetRecoilState } from 'recoil'
import { activeDomainsState } from './BsddAtoms'

interface Option {
  label: string
  value: string
}

interface Config {
  defaultDomains: Option[]
}

interface Props {
  callback: (value: any) => void
  config: Config
}

function BsddSearch(props: Props) {
  const setActiveDomains = useSetRecoilState(activeDomainsState)

  useEffect(() => {
    setActiveDomains(() => {
      if (props.config && props.config.defaultDomains && props.config.defaultDomains.length) {
        return props.config.defaultDomains
      }
      return []
    })
  }, [])

  return (
    <Card>
      <Form id='bSDD_form'>
        <Card.Body>
          {/* <Card.Title as="h4">bSDD search</Card.Title> */}
          <input type='hidden' name='ifcType' id='ifcType' value='' />
          <input type='hidden' name='name' id='name' value='' />
          <input type='hidden' name='material' id='material' value='' />
          <Row className='mb-3'>
            <Col xs={7}>
              <Search />
            </Col>
            <Col xs={4}>
              <SelectDomains />
            </Col>
            <Col>
              <RecursiveMode />
            </Col>
          </Row>

          <div className='mb-3 row'>
            <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Classifications</Accordion.Header>
                <Accordion.Body>
                  <Classifications />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>Propertysets</Accordion.Header>
                <Accordion.Body>
                  <PropertySets />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <Form.Group className='mb-3 row'>
            <Apply callback={props.callback} />
          </Form.Group>
        </Card.Body>
      </Form>
    </Card>
  )
}

export default BsddSearch
