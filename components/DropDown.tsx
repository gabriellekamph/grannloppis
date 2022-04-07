import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ArrowNarrowDownIcon } from '@heroicons/react/solid'

function MyLink(props: any) {
  let { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

const DropDown = () => {
  return (
    <div className="flex justify-center">
      <Menu as="div" className="relative inline-block text-center max-w-sm">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border px-4 py-3 bg-transparent text-md font-small focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            <p className="text-md text-center">Välj loppis att delta på</p>
            <ArrowNarrowDownIcon className="-mr-1 ml-2 h-5 w-4" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="origin-top-right absolute right-0 mt-2 py-2 w-full bg-white text-main rounded-lg bg-transparent flex flex-wrap flex-col">
            <Menu.Item>
              <MyLink href="/krusboda">Krusboda</MyLink>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default DropDown
