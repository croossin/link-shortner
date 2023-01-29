import React from "react";
import { GetServerSideProps } from "next";
import { redisClient } from "@/utils/redis";

function ShortId() {
  return <></>;
}

export default ShortId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.shortId;

  // If we don't have the shortId redirect home
  if (!query) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  // Fetch the short id from upstash
  const res = await redisClient.get(query);

  // If we have something - redirect to the page
  if (res) {
    return {
      redirect: {
        destination: res,
        permanent: true,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
};
