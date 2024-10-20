import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"

const Navbar = () => {
  return (
    <nav className="navbar-style">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg"
          alt="MeetUp"
          width={32}
          height={32}
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold max-sm:hidden">MeetUp</p>
      </Link>

      <div className="flex-between gap-5">
        {/* profile */}
        <MobileNav />
      </div>

    </nav>
  )
}
export default Navbar