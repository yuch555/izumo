import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-3">
          <p className="text-gray-600 text-sm">
            このサイトは個人による非公式のまとめです。
          </p>
          <a
            href="https://github.com/yuch555/izumo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>作成者: yuch555</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
