import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToHome() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all hover:shadow-2xl hover:scale-105 shadow-xl"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">ホームに戻る</span>
      </Link>
    </div>
  );
}
