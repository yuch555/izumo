import Link from "next/link";
import { Github } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900">出雲市広報</h3>
            <p className="text-sm text-gray-600 mt-1">
              出雲市からのお知らせをお届けします
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <Link
              href="https://github.com/yuch555/izumo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={20} />
              <span className="text-sm font-medium">
                Built by yuch555 • Open Source
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              &copy; {currentYear} 出雲市. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
