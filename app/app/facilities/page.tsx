import { BackToHome } from "../../src/components/base/BackToHome";

type PublicFacility = {
  id: string;
  name: string;
  category: string;
  address: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  openingHours?: string;
};

async function getPublicFacilities(): Promise<PublicFacility[]> {
  const res = await fetch("http://localhost:3000/data/public-facilities.json", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.publicFacilities;
}

export default async function FacilitiesPage() {
  const facilities = await getPublicFacilities();

  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6"></div>

        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          🏛️ 公共施設
        </h1>

        <div className="grid gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {facility.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{facility.name}</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>住所:</strong> {facility.address}
                </p>
                {facility.phone && (
                  <p>
                    📞 <strong>電話:</strong> {facility.phone}
                  </p>
                )}
                {facility.openingHours && (
                  <p>
                    🕐 <strong>開館時間:</strong> {facility.openingHours}
                  </p>
                )}
                {facility.latitude && facility.longitude && (
                  <p className="text-sm text-gray-500">
                    座標: {facility.latitude}, {facility.longitude}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
