"use client";

import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch token");
  const data = await res.json();
  return data;
};

const refreshSessionApp = async () => {
  const data = await fetcher("/api/app-refresh");
  console.log("refreshSessionApp: ", data);
};
const refreshSessionPages = async () => {
  const data = await fetcher("/api/pages-refresh");
  console.log("refreshSessionPages: ", data);
};

const getAccessToken = async () => {
  const data = await fetcher("/auth/access-token");
  console.log("accessToken: ", data);
};

const TestInner = () => {
  useEffect(() => {
    getAccessToken();
  }, []);
  return (
    <div className="d-flex flex-row mt-5" style={{ gap: "10px" }}>
      <button
        color="primary"
        onClick={async () => {
          await refreshSessionPages();
          getAccessToken();
        }}
      >
        Pages - Refresh token
      </button>
      <button
        color="primary"
        onClick={async () => {
          await refreshSessionApp();
          getAccessToken();
        }}
      >
        App - Refresh token
      </button>
      <button color="primary" onClick={getAccessToken}>
        Get token
      </button>
    </div>
  );
};

const Test = () => {
  const { user } = useUser();
  if (!user) {
    return <div>Please login to see the test</div>;
  }
  return <TestInner />;
};

export default Test;
