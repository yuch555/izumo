import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-3">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            このサイトは個人による非公式のまとめです。
          </p>
          <a
            href="https://github.com/yuch555/izumo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>作成者: yuch555</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
