"use client";

import RenameModel from "@/components/models/rename-modal";
import { useEffect, useState } from "react";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <>
      <RenameModel />
    </>
  );
};

export default ModelProvider;
