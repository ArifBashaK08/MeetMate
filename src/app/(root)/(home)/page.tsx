
import { MeetingTypes } from "@/components"
import DisplayUpcoming from "@/components/DisplayUpcoming"
const Home = () => {

  const now = new Date()
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  const date = now.toLocaleDateString("en-IN", { dateStyle: "full" })

  return (
    <section className="flex size-full flex-col gap-10">
      <div className="w-full h-[300px] rounded-xl bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
        <DisplayUpcoming />

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold uppercase">
              {time}
            </h1>
            <p className="font-medium text-sky-1 lg:text-xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypes />
    </section>
  )
}
export default Home