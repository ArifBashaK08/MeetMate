import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"
import { UserButton, SignedIn } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="navbar-style">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/logo.png"
          alt="MeetUp"
          width={70}
          height={70}
          className="max-sm:size-10"
        />
        <p className="text-lg font-extrabold  text-blue-1">Virtual<br/>Verse</p>
      </Link>

      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        
        <MobileNav />
      </div>

    </nav>
  )
}
export default Navbar