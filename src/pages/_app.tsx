import { queryClient } from "@/lib/react-query";
import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className} flex justify-center`}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col justify-center">
          <h1 className="pt-6 text-center text-5xl font-bold text-black">
            CATKNOW
          </h1>
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </main>
  );
}
