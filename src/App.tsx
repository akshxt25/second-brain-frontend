
import './App.css'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {

  return (
    <div className="">
      <Button startIcon={<PlusIcon size="md" />}  endIcon={<ShareIcon size="md"/>} variant='secondary' size="md" text={"hi thrre"} onClick={() => {}} />
      <Button startIcon={<PlusIcon size="sm" />}  endIcon={<ShareIcon size="sm"/>} variant='primary' size="sm" text={"hi thrre"} onClick={() => {}} />

      <Card />
    </div>
  )
}

export default App
