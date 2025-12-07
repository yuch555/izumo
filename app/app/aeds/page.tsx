import { BackToHome } from "../../src/components/base/BackToHome";

type AED = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  location: string;
  availability: string;
};

async function getAEDs(): Promise<AED[]> {
  const res = await fetch("http://localhost:3000/data/aeds.json", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.aeds;
}

export default async function AEDsPage() {
  const aeds = await getAEDs();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6"></div>

        <h1 className="text-4xl font-bold mb-8">❤️ AED設置場所</h1>

        <div className="grid gap-6">
          {aeds.map((aed) => (
            <div
              key={aed.id}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-2xl font-bold mb-2">{aed.name}</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>住所:</strong> {aed.address}
                </p>
                <p>
                  <strong>設置場所:</strong> {aed.location}
                </p>
                <p>
                  🕐 <strong>利用可能時間:</strong> {aed.availability}
                </p>
                <p className="text-sm text-gray-500">
                  座標: {aed.latitude}, {aed.longitude}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
