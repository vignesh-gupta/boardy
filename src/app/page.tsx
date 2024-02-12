import Image from "next/image";
import Link from "next/link";

import ScreenSize from "@/components/screen-size";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignUpButton, currentUser } from "@clerk/nextjs";
import { BoxSelect, Github, HeartHandshakeIcon, Route } from "lucide-react";
import Navbar from "./_component/navbar";
import { DASHBOARD_ROUTE } from "@/lib/constants";

const HomePage = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col min-h-[100dvh] container">
      <Navbar />
      <main className="flex-1">
        <ScreenSize>
          <Button asChild className="gap-2 rounded-full">
            <Link
              href={
                process.env.TWEET_LINK ?? "https://twitter.com/vigneshfixes/"
              }
              target="_blank"
            >
              <Image
                src="icons/x-logo.svg"
                alt="X logo"
                width={15}
                height={15}
              />
              Introducing Boardy
            </Link>
          </Button>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Your Collaborative Whiteboard
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              A collaborative space for your team to sketch, ideate, and
              innovate. Share your ideas in real-time.
            </p>
          </div>
          <div className="flex justify-evenly gap-x-6">
            {user ? (
              <Link className={buttonVariants()} href="/dashboard">
                Go to Dashboard &rarr;
              </Link>
            ) : (
              <Button asChild>
                <SignUpButton
                  afterSignUpUrl={DASHBOARD_ROUTE}
                  afterSignInUrl={DASHBOARD_ROUTE}
                  mode="modal"
                >
                  Get Started
                </SignUpButton>
              </Button>
            )}
            <Link
              href="https://github.com/vignesh-gupta/boardy/"
              className={buttonVariants({
                variant: "outline"
              })}
            >
              <Github className="h-5 w-5 mr-2" /> Star on GitHub
            </Link>
          </div>
        </ScreenSize>
        <ScreenSize className="border-t">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Whiteboard. Redefined.
            </h2>
            <p className="mx-auto max-w-[600px] text-pretty  text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Let your team unleash creativity and boost productivity with our
              advanced tools and a platform designed to bring your ideas to life
            </p>
          </div>
          <div className="max-w-5xl gap-6 py-12">
            <ul className="grid grid-cols-1 text-center place-content-center lg:grid-cols-3 md:grid-cols-2 gap-y-7 gap-x-5">
              <li className="max-w-[350px]">
                <div className="grid gap-1">
                  <span className="flex items-center justify-center mx-auto bg-blue-200 rounded-full text-blue-950 w-14 h-14">
                    <HeartHandshakeIcon size={30} />
                  </span>
                  <h3 className="text-xl font-bold">Collaboration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Foster seamless teamwork with our collaborative features,
                    ensuring connected and productive teams.
                  </p>
                </div>
              </li>
              <li className="max-w-[350px]">
                <div className="grid gap-1">
                  <span className="flex items-center justify-center mx-auto bg-blue-200 rounded-full text-blue-950 w-14 h-14">
                    <BoxSelect size={30} />
                  </span>
                  <h3 className="text-xl font-bold">Innovate</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Ignite innovation with our cutting-edge tools, inspiring
                    creativity and propelling projects to new heights.
                  </p>
                </div>
              </li>
              <li className="max-w-[350px]">
                <div className="grid gap-1">
                  <span className="flex items-center justify-center mx-auto bg-blue-200 rounded-full text-blue-950 w-14 h-14">
                    <Route size={30} />
                  </span>
                  <h3 className="text-xl font-bold">Plan</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Efficiently strategize and organize projects with our
                    intuitive planning features, streamlining your workflow
                    effortlessly.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </ScreenSize>
      </main>
      <footer className="flex flex-col items-center w-full gap-2 p-4 border-t sm:flex-row shrink-0 md:px-6">
        <p className="text-gray-600">
          Project By{" "}
          <Link
            className="hover:underline underline-offset-4"
            href="http://vigneshgupta.tech/"
          >
            Vignesh Gupta
          </Link>
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            href="https://github.com/vignesh-gupta/boardy/"
            target="_blank"
            className="p-1 transition rounded-full hover:bg-black hover:text-white"
          >
            <Github size={20} />
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;
