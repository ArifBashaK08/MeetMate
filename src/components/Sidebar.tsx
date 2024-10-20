"use client"

import cn from 'classnames'
import Link from "next/link"
import { sidebarLinks } from "@/constants"
import { usePathname } from "next/navigation"
import Image from 'next/image'

const Sidebar = () => {

  const pathname = usePathname()

  return (
    <section className="sidebar-menu">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map(({ route, imgUrl, label }, index) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link key={index}
              href={route}
              className={cn("menu-link justify-start", { "bg-blue-1": isActive })}
            >
              <Image src={imgUrl}
                alt={label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {label}
              </p>
            </Link>
          );
        })}
      </div>

    </section>
  )
}
export default Sidebar