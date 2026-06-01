
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { GoWeekIcon } from './go-week-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { CheckCircle2 } from 'lucide-react'
import { 
  DialogTrigger 
} from './ui/dialog'
import { getSummary } from '../http/get-summary'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { PendingGoals } from './pendingGoals'

dayjs.locale('pt-br')

export function Summary() {

    const {data } = useQuery({
        queryKey: ['summary'],
        queryFn: getSummary,
        staleTime: 1000 * 60,
    })

    if (!data) return null;

    const firstDayOfWeek = dayjs().startOf('week').format('DD/MM')
    const lastDayOfWeek = dayjs().endOf('week').format('DD/MM')

    const completedPercentage = Math.round((data.completed / data.total) * 100) 
    return (
        <div className="py-10 px-5 max-w-[480px] mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <GoWeekIcon />
                <span className="text-lg font-semibold capitalize">
                    {`Semana de ${firstDayOfWeek}  -  ${lastDayOfWeek}`}
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
                <Progress value={completedPercentage} max={100}>
                    <ProgressIndicator style={{width: `${completedPercentage}%`}} />
                </Progress>

                <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Metas concluídas <span className="text-zinc-100">{data?.completed || 0}</span>, metas restantes <span className="text-zinc-100">{data?.total && data.total - (data.completed || 0)}</span></span>
                <span>{completedPercentage}%</span>
            </div>

            <Separator />

            <PendingGoals />

            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-semibold">
                    Sua semana
                </h2>

               {Object.entries(data.goalsPerDay).map(([date, goals]) => {
                    const weekDay = dayjs(date).format('dddd')
                    const formattedDate = dayjs(date).format('DD/MM/YYYY')

                    return (
                        <div key={date} className="flex flex-col gap-3">
                            <h3 className="font-medium capitalize">
                                <span className="capitalize">{weekDay}</span>{' '}
                                <span className="text-zinc-400 text-xs">({formattedDate})</span>
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {goals.map(goal => {
                                    const time = dayjs(goal.completedAt).format('HH:mm')

                                    return (
                                        <li key={goal.id} className="flex items-center gap-2">
                                            <CheckCircle2 className="size-4 text-blue-500" />
                                            <span className="text-sm text-zinc-400">
                                                Você completou "
                                                <span className="text-zinc-100">{goal.title}</span>" às{''}
                                                <span className="text-zinc-100"> {time}h</span>
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
               })}
            </div>
        </div>
    </div>
    )
}