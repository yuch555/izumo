import { BackToHome } from "@/components/base/BackToHome";
import { FiscalStats } from "../../src/components/features/FiscalStats";

export default function FiscalPage() {
  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <BackToHome />
      <FiscalStats />
    </div>
  );
}
