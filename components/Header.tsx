import Link from "next/link"
import { UserIcon, ArrowNarrowLeftIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"

const Header = () => {
  const router = useRouter()
  const { area } = router.query

  return (
    <div className="container flex justify-between p-2 flex flex-col">
      <div className="container flex justify-between mb-20 p-3">
      <Link href="/">
          <a>
            <ArrowNarrowLeftIcon className="h-8 w-8" />
          </a>
        </Link>
        <UserIcon className="h-8 w-8" />
      </div>
        <h1 className="text-5xl font-bold uppercase text-center">{area}</h1>
    </div>
  )
}

export default Header
