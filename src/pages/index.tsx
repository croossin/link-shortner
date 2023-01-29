import Head from "next/head";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_URLS = [
  "https://hooli.io",
  "https://piedpiper.app",
  "https://bachmanity.inc",
];

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [linkToShorten, setLinkToShorten] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    setLoading(true);

    try {
      // Make a call to backend to generate the short link
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          link: linkToShorten,
        }),
      });
      const body = await res.json();

      // Set
      setShortenedLink(body.link);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Tiny Link</title>
        <meta name="description" content="Nifty link shortner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="isolate bg-white">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  This demo is part of a blog post.{" "}
                  <a
                    href="https://roo.app/articles/link-shortner"
                    className="font-semibold text-indigo-600"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Middle-out
                  </span>
                  <br />
                  link compression
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Revolutionzie your link strategy with our AI-powered link
                  shortner
                </p>
                <div className="mt-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleShorten();
                    }}
                  >
                    <div className="mt-1 flex animate-border rounded-xl bg-white from-teal-500 via-purple-500 to-pink-500 bg-[length:400%_400%] p-0.5 transition bg-gradient-to-r shadow-xl focus:outline-none focus:ring">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <LinkIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="text"
                          ref={inputRef}
                          type="text"
                          className="block w-full rounded-r-[10px] rounded-l-[10px] pl-10 focus:ring-0 focus:outline-none focus:ring-offset-0 sm:text-sm min-h-[50px] lowercase"
                          placeholder={
                            PLACEHOLDER_URLS[
                              Math.floor(
                                Math.random() * PLACEHOLDER_URLS.length
                              )
                            ]
                          }
                          value={linkToShorten}
                          onChange={(e) => {
                            setLinkToShorten(e.target.value);
                          }}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {loading && <p className="mt-8">Loading...</p>}
                {shortenedLink && (
                  <div className="mt-8">
                    <p>Your shortened link:</p>
                    <p className="text-xs text-slate-500">(Tap to copy)</p>
                    <p
                      className="text-lg font-semibold mt-2 hover:cursor-pointer"
                      onClick={() => {
                        try {
                          navigator.clipboard.writeText(shortenedLink);
                        } catch (e) {
                          console.warn("Can't access navigator");
                        }
                      }}
                    >
                      {shortenedLink}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".3"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#9089FC" />
                    <stop offset={1} stopColor="#FF80B5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
