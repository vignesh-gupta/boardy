"use client";
import Hint from "@/components/hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

type OrganizationItemProps = {
  id: string;
  name: string;
  imageUrl: string;
};

const OrganizationItem = ({ id, imageUrl, name }: OrganizationItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div className="aspect-square relative ">
      <Hint align="start" side="right" sideOffset={15} label={name}>
        <Image
          fill
          src={imageUrl}
          alt={name}
          onClick={onClick}
          className={cn(
            "rounded-full cursor-pointer opacity-75 hover:opacity-100 transition-all",
            isActive && "opacity-100 rounded-md"
          )}
        />
      </Hint>
    </div>
  );
};

export default OrganizationItem;
