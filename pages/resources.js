import Head from "next/head";
import React from "react";
import PartnerCard from "../components/PartnerCard";

export default function Resources() {
  const resources = [
    {
      title: "Climate Alliance",
      description:
        "The Climate Alliance is a global network of climate change research and action groups that work to advance the cause of climate change.",
      image: "/climate-alliance.jpg",
      link: "https://climatealliance.org/",
    },
    {
      title: "United Nations",
      description:
        "The United Nations is a world-wide organization that is responsible for the promotion of international peace and security.",
      image: "/united-nations.png",
      link: "https://www.un.org/sustainabledevelopment/climate-change/",
    },
    {
      title: "Climate Action Network",
      description:
        "The Climate Action Network is a global network of climate change research and action groups that work to advance the cause of climate change.",
      image: "/climate-network.jpg",
      link: "https://climatenetwork.org/",
    },
  ];

  return (
    <>
      <Head>
        <title>Resources | GreenPrint</title>
      </Head>
      <h1 className="text-2xl font-bold tracking-tight">More Resources:</h1>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {resources.map((resource) => (
          <PartnerCard
            key={resource.title}
            title={resource.title}
            description={resource.description}
            image={resource.image}
          />
        ))}
      </div>
    </>
  );
}
