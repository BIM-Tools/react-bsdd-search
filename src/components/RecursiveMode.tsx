import React from 'react'
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { recursiveModeState } from './BsddAtoms'
import { useRecoilState } from 'recoil'

function RecursiveMode() {
  const [recursiveMode, setRecursiveMode] = useRecoilState(recursiveModeState)
  // const [selectOptions, setSelectOptions] = useState<any[]>([])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecursiveMode(e.target.checked)
  }

  return (
    <OverlayTrigger overlay={<Tooltip>show nested classifications</Tooltip>} placement='bottom'>
      <Form.Check type='switch' id='custom-switch' checked={recursiveMode} onChange={(e) => handleOnChange(e)} />
    </OverlayTrigger>
  )
}
export default RecursiveMode
