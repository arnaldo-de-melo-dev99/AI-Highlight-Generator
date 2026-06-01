import letStart from "../assets/background.svg"
import logo from "../assets/logo.svg"
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { 
  DialogTrigger 
} from './ui/dialog'

export function EmptyGoal() {
  return (
      <div className="h-screen flex flex-col items-center justify-center gap-8 bg-black">
        <img src={logo} className="w-0.5rem h-0.5rem" alt="Let's Start" />
        <img src={letStart} className="w-1/2 h-1/2" alt="GoWeek" id="go-week" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Não perca mais tempo, organize sua semana de forma eficiente
        </p>

        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
  )
}