import GrannloppisLogoWhite from "../public/logos/grannloppis_logo_white.svg"
import Link from "next/link"
import { UserIcon } from "@heroicons/react/solid"

const Header = () => {
  return (
    <div className="container flex justify-between p-2">
      <Link href="/">
        <a>
          <GrannloppisLogoWhite className="w-32" />
        </a>
      </Link>
      <UserIcon className="h-8 w-8" />
    </div>
  )
}

export default Header
