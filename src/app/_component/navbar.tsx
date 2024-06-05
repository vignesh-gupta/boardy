import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <header className="fixed top-0 left-0 right-0 px-4 border-b shadow-md lg:px-6 h-14 bg-background">
      <div className="container relative flex items-center h-full">
        <Link className="flex items-center justify-center" href="/">
          <Image src="/logo.svg" alt="Boardy" width={50} height={20} />
          <span className="ml-1 text-lg font-bold">Boardy</span>
        </Link>
        <nav className="hidden gap-4 ml-auto mr-5 sm:gap-6 lg:flex">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Contact
          </Link>
        </nav>
        <div className="float-end">
          {user ? (
            <UserButton />
          ) : (
            <Button asChild>
              <SignInButton mode="modal">Sign In</SignInButton>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
