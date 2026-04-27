export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-orange-900/25 py-7 px-6 bg-transparent dark:bg-[#0f0a03]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-poppins font-bold text-base text-slate-900 dark:text-[#fef3e2]">
          Shreya<span className="text-blue-500 dark:text-orange-400">.</span>
        </div>
        <p className="font-inter text-xs text-slate-400 dark:text-[#806040] text-center">
          Sri Shreya Danda · Data Analyst · Tampa, FL
        </p>
        <p className="font-inter text-xs text-slate-300 dark:text-[#604830]">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
