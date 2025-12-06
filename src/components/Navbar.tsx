import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { Icons } from "./Icons";

export default function Navbar() {
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-11 w-11 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Threddit
          </p>
        </Link>

        {/* search bar */}
        {/* <SearchBar /> */}

        {/* actions */}
        {/* {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
          )} */}
        <Link href="/sign-in" className={buttonVariants()}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
