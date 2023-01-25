import { Hero } from "@/components/Hero";
import { MemberCard } from "@/components/MemberCard";
import { Navbar } from "@/components/Navbar";
import Head from "next/head";

export default function Home() {

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
                <Hero />

                <p className="mt-0.5">Conent Below!!!</p>
            </main>
        </>
    );
}
