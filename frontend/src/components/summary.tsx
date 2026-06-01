
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { GoWeekIcon } from './go-week-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'
import { CheckCircle2 } from 'lucide-react'
import { 
  DialogTrigger 
} from './ui/dialog'

export function Summary() {
  return (
    <div className="py-10 px-5 max-w-[480px] mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <GoWeekIcon />
                <span className="text-lg font-semibold">
                    5 a 10 de Agosto
                </span>
            </div>
            <DialogTrigger asChild>
              <Button className="focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
                <Plus className="size-4" />
                Cadastrar meta
              </Button>
            </DialogTrigger>          
        </div>

        <div className="flex flex-col gap-3">
            <Progress value={8} max={15}>
                <ProgressIndicator style={{ width: '50%' }} />
            </Progress>

            <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Metas concluídas <span className="text-zinc-100">8</span>, metas restantes <span className="text-zinc-100">15</span></span>
                <span>50%</span>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-3">
                <OutlineButton>
                    <Plus className="size-4 text-zinc-600"/>
                    Meditar
                </OutlineButton>
                    <OutlineButton>
                    <Plus className="size-4 text-zinc-600"/>
                    Nadar
                </OutlineButton>
                    <OutlineButton>
                    <Plus className="size-4 text-zinc-600"/>
                    Andar
                </OutlineButton>
                    <OutlineButton>
                    <Plus className="size-4 text-zinc-600"/>
                    Correr
                </OutlineButton>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-semibold">
                    Sua semana
                </h2>

                <div className="flex flex-col gap-3">
                    <h3 className="font-medium">
                        Domingo{' '}
                        <span className="text-zinc-400 text-xs">(30 de Junho)</span>
                    </h3>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-blue-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou "
                                <span className="text-zinc-100">Acordar cedo</span>" às{''}
                                <span className="text-zinc-100"> 08:13</span>
                            </span>
                        </li>
                        
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-blue-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou "
                                <span className="text-zinc-100">Se alimentar bem</span>" às{''}
                                <span className="text-zinc-100"> 08:13</span>
                            </span>
                        </li>

                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-blue-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou "
                                <span className="text-zinc-100">Montar o plano de negócios</span>" às{''}
                                <span className="text-zinc-100"> 08:13</span>
                            </span>
                        </li>
                    </ul>
                </div>

                 <div className="flex flex-col gap-3">
                    <h3 className="font-medium">
                        Segunda-feira{' '}
                        <span className="text-zinc-400 text-xs">(30 de Junho)</span>
                    </h3>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-blue-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou "
                                <span className="text-zinc-100">Acordar cedo</span>" às{''}
                                <span className="text-zinc-100"> 08:13</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}