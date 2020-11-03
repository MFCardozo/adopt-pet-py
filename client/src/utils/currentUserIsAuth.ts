import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCurrentUserLoginQuery } from "../generated/graphql";

export const currentUserIsAuth = () => {
  const { data, loading } = useCurrentUserLoginQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.currentUserLogin) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [loading, data, router]);
};
