
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'

function App() {

  return (
    <div className="text-red-500">
      <Button startIcon={<PlusIcon size="lg" />}  variant='secondary' size="sm" text={"hi thrre"} onClick={() => {}} />
    </div>
  )
}

export default App
