import electronLogo from './assets/electron.svg'
import { Table } from 'antd'

function App(): React.JSX.Element {
  const ipcHandle = async (): Promise<void> => {
    // window.electron.ipcRenderer.send('test')
    let result = await window.api.test.test1()
    console.log("ipcRenderer", result)
  }

  return (
    <>
    <Table className='w-full h-full'></Table>
    </>
  )
}

export default App
