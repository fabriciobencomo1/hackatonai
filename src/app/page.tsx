import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Demo AI</h1>
        <p className="text-xl text-gray-600">AI-Powered Car Sales Professional Platform</p>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/onboarding"
            className="btn-primary"
          >
            Register Salesperson
          </Link>
          
          <a
            className="btn-secondary"
            href="https://github.com/fabriciobencomo1/hackatonai"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code
          </a>
        </div>
      </main>
      
      <footer className="row-start-3 text-center text-gray-500">
        © 2025 Demo AI. All rights reserved.
      </footer>
    </div>
  );
}
