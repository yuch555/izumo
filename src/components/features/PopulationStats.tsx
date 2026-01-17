"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Home,
  TrendingUp,
  TrendingDown,
  Globe,
  MapPin,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import juuminData from "~/public/data/artificialData/izumo_jumin_daicho_202510.json";

// 地区別人口データの変換
const districtData = juuminData["地区別世帯・人口集計"].map((district) => ({
  地区名: district["地区"],
  男: district["男"],
  女: district["女"],
  計: district["計"],
}));

// 国籍別人口データの変換
const nationalityData = [
  { name: "日本人", value: juuminData["国籍・地域別人口"]["日本"]["合計"] },
  {
    name: "外国人住民",
    value: juuminData["国籍・地域別人口"]["外国人住民計"]["合計"],
  },
];

// 地域別合計人口データの変換
const regionTotalData = juuminData["地域別合計"].map((region) => ({
  地域名: region["地域名"].replace("合計", ""),
  人口: region["計"],
}));

// 円グラフの色
const COLORS = ["#0088FE", "#00C49F"];

export function PopulationStats() {
  const monthChange = juuminData["比較増減（前月比）"]["計"];
  const isIncrease = monthChange > 0;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="space-y-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border border-blue-100 dark:border-gray-600">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            出雲市 住民統計
          </h1>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">調査基準日: {juuminData["調査基準日"]}</p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          出典: {juuminData["出典"]}
        </p>
      </div>

      {/* 総合計の概要 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-orange-600" />
              総世帯数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {juuminData["総合計"]["世帯数"].toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {juuminData["比較増減（前月比）"]["世帯数"] > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <p
                className={`text-sm font-medium ${
                  juuminData["比較増減（前月比）"]["世帯数"] > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                前月比:{" "}
                {juuminData["比較増減（前月比）"]["世帯数"] > 0 ? "+" : ""}
                {juuminData["比較増減（前月比）"]["世帯数"].toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              総人口
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {juuminData["総合計"]["計"].toLocaleString()}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {isIncrease ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <p
                className={`text-sm font-medium ${
                  isIncrease ? "text-green-600" : "text-red-600"
                }`}
              >
                前月比: {monthChange > 0 ? "+" : ""}
                {monthChange.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              男女比
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  男性
                </span>
                <span className="text-xl font-bold text-blue-600">
                  {juuminData["総合計"]["男"].toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  女性
                </span>
                <span className="text-xl font-bold text-pink-600">
                  {juuminData["総合計"]["女"].toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 地区別人口の積み上げ棒グラフ */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            地区別人口（男女別）
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            各地区の男女別人口の積み上げ表示
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={400} minWidth={600}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="地区名"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  style={{ fontSize: "11px" }}
                />
                <YAxis style={{ fontSize: "11px" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="男" stackId="a" fill="#3b82f6" name="男性" />
                <Bar dataKey="女" stackId="a" fill="#ec4899" name="女性" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 国籍別人口の円グラフ */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            国籍別人口
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            日本人と外国人住民の割合
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 凡例をグラフの上に表示 */}
          <div className="flex justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: COLORS[0] }}
              ></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                日本人: {nationalityData[0].value.toLocaleString()}人
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: COLORS[1] }}
              ></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                外国人住民: {nationalityData[1].value.toLocaleString()}人
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={nationalityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percent }) =>
                  percent ? `${(percent * 100).toFixed(1)}%` : ""
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {nationalityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => value.toLocaleString() + "人"}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 地域別合計人口の棒グラフ */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            地域別合計人口
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            各地域の総人口の比較
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={400} minWidth={500}>
              <BarChart data={regionTotalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="地域名"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  style={{ fontSize: "11px" }}
                />
                <YAxis style={{ fontSize: "11px" }} />
                <Tooltip
                  formatter={(value: number) => value.toLocaleString() + "人"}
                />
                <Legend />
                <Bar dataKey="人口" fill="#10b981" name="総人口" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
