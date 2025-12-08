import { BackToHome } from "../../src/components/base/BackToHome";

type Shelter = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity?: number;
  type?: string;
};

async function getShelters(): Promise<Shelter[]> {
  const res = await fetch("http://localhost:3000/data/shelters.json", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.shelters;
}

export default async function SheltersPage() {
  const shelters = await getShelters();

  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6"></div>

        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          🏢 避難所情報
        </h1>

        <div className="grid gap-6">
          {shelters.map((shelter) => (
            <div
              key={shelter.id}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-2xl font-bold mb-2">{shelter.name}</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>住所:</strong> {shelter.address}
                </p>
                {shelter.capacity && (
                  <p>
                    👥 <strong>収容人数:</strong> {shelter.capacity}人
                  </p>
                )}
                {shelter.type && (
                  <p>
                    🏷️ <strong>種別:</strong> {shelter.type}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  座標: {shelter.latitude}, {shelter.longitude}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
