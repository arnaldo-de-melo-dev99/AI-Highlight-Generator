import letStart from './assets/background.svg'
import logo from './assets/logo.svg'
import { Plus } from 'lucide-react'

export function App() {

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} className="w-0.5rem h-0.5rem" alt="Let's Start" />
      <img src={letStart} className="w-1/2 h-1/2" alt="GoWeek" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Não perca mais tempo, organize sua semana de forma eficiente
      </p>
      <button 
        type="button"
        className="px-4 py-2.5 rounded-lg bg-violet-500 text-violet-50 flex items-center gap-2 hover:bg-violet-600 duration-200 transition-colors text-sm font-medium tracking-tight focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Plus className="size-4" />
        Cadastrar meta
      </button>
    </div>
  )
}