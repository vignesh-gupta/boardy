"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization
} from "@clerk/nextjs";

import InviteButton from "./_components/sidebar/invite-button";
import SearchInput from "./_components/sidebar/search-input";

const Navbar = () => {
  const { organization } = useOrganization();
  return (
    <div className="flex items-center gap-x-5 p-5">
      <div className="hidden lg:flex flex-1 ">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "367px"
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
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </div>
  );
};

export default Navbar;
