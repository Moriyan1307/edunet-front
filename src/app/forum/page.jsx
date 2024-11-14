"use client";
import React from "react";
import { useRouter } from "next/compat/router";

function page() {
  const router = useRouter();
  console.log(router);
  return <div>page</div>;
}

export default page;
