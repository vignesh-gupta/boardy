"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DASHBOARD_ROUTE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const poppinsFont = Poppins({
  weight: ["600"],
  subsets: ["latin"]
});

const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div
      className={cn(
        "hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5",
        poppinsFont.className
      )}
    >
      <Link href={DASHBOARD_ROUTE}>
        <div className="flex items-center gap-x-2">
          <Image src="logo.svg" alt="Logo" height={45} width={45} />
          <span>MiroClone</span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white"
            }
          }
        }}
      />

      <div className="space-y-1 w-full">
        <Button
          variant={!favorites ? "default" : "ghost"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={DASHBOARD_ROUTE}>
            <LayoutDashboard className="w-4 h-4 mr-2" /> Team Boards
          </Link>
        </Button>
        <Button
          variant={favorites ? "default" : "ghost"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: DASHBOARD_ROUTE,
              query: { favorites: true }
            }}
          >
            <Star className="w-4 h-4 mr-2" /> Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;
