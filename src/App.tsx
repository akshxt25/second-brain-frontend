
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {

  return (
    <div className="text-red-500 flex">
      <Button startIcon={<PlusIcon size="lg" />}  endIcon={<ShareIcon size="lg"/>} variant='secondary' size="lg" text={"hi thrre"} onClick={() => {}} />
      <Button startIcon={<PlusIcon size="md" />}  endIcon={<ShareIcon size="md"/>} variant='secondary' size="md" text={"hi thrre"} onClick={() => {}} />
      <Button startIcon={<PlusIcon size="sm" />}  endIcon={<ShareIcon size="sm"/>} variant='secondary' size="sm" text={"hi thrre"} onClick={() => {}} />
    </div>
  )
}

export default App
