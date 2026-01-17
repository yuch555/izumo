import { ParkingList } from "@/components/features/ParkingList";
import { Suspense } from "react";

export const metadata = {
  title: "駐車場空き情報 - 出雲市お役立ちWEBサイト",
  description: "出雲市内の駐車場のリアルタイム空き情報を確認できます",
};

export default function ParkingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            駐車場空き情報
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            出雲市内の駐車場情報をエリア別に確認できます
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <ParkingList />
        </Suspense>
      </div>
    </main>
  );
}
