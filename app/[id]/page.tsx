/** @format */
"use client";
import React, { useEffect, useState } from "react";
import GridLayout from "../components/GridLayout";
import NavTabs from "../components/NavTabs";
import { LinkPreview } from "@dhaiwat10/react-link-preview";

const Page = () => {
  const tabs = ["Home", "About", "RESSOURCESJJJJ"];
  // const socials = ["https://ui.shadcn.com/charts", "https://x.com/shadcn"];

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch("/api/scrape", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ url: "https://x.com/shadcn" }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //     } else {
  //       console.error("Failed to fetch metadata");
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch metadata", error);
  //   }
  // };
  // useEffect(() => {
  //   handleSubmit();
  // }, []);
  return (
    <div>
      <NavTabs tabs={tabs} />
      <GridLayout />
      <LinkPreview url="https://regisgrumberg.com" />
      {/* <URLInfo url="https://ui.shadcn.com" /> */}
    </div>
  );
};
function URLInfo({ url }: { url: string }) {
  const [info, setInfo] = useState({ title: "", description: "", icon: "" });

  useEffect(() => {
    async function fetchURLInfo() {
      // Remplacer 'API_ENDPOINT' par l'endpoint de votre API ou service
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, response);
      setInfo({
        title: data.title,
        description: data.description,
        icon: data.icon,
      });
    }

    fetchURLInfo();
  }, [url]);

  return (
    <div>
      <h1>{info.title}</h1>
      <p>{info.description}</p>
      {info.icon && <img src={info.icon} alt="Site Icon" />}
    </div>
  );
}

export default Page;
