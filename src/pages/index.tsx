import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const {
    isError,
    isLoading,
    mutate: createNote,
  } = api.note.create.useMutation({
    // onSuccess: (note) => {},
    // onError: (error) => {},
  });
  console.log({ sessionData });

  return (
    <>
      <Head>
        <title>Notes_</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-black to-gray-800 py-8">
        <div className="flex px-12">
          <h2 className="mr-auto text-3xl font-bold text-gray-200">Notes_</h2>
          <p className="text-center text-base text-white">
            {sessionData && (
              <span>
                Logged in as {sessionData.user?.name}{" "}
                <Image
                  alt="user_avatar"
                  width={24}
                  height={24}
                  className="inline w-12 rounded-full"
                  src={sessionData.user.image as string}
                />{" "}
              </span>
            )}
          </p>
          <button
            className="rounded-lg border border-white bg-white/10 px-6 font-medium text-white no-underline transition hover:bg-white/20"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
