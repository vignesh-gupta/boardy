"use client";

import Loading from "@/components/auth/loading";
import { env } from "@/env";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import {
  AuthLoading,
  Authenticated,
  ConvexReactClient,
  Unauthenticated
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

type ConvexClientProviderProps = {
  children: React.ReactNode;
};

const convexURL = env.NEXT_PUBLIC_CONVEX_URL;

const convex = new ConvexReactClient(convexURL);

const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AuthLoading>
          <Loading />
        </AuthLoading>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>{children}</Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
