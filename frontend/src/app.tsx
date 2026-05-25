import logo from './assets/background.svg'
import letStart from './assets/lets-start-ilustration.svg'

export function App() {

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-8 fixed">
        <img src={logo} className="w-1/2 h-1/2" alt="GoWeek" />
        <img src={letStart} className="" alt="Let's Start" />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Não perca mais tempo, organize sua semana de forma eficiente e aproveite ao máximo cada dia com o GoWeek!
        </p>
      </div>
    </>
  )
}