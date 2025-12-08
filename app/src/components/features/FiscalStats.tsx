"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  CreditCard,
  Users,
  Building2,
  Wallet,
  HelpCircle,
} from "lucide-react";
import fiscalData from "~/public/data/fiscalOverviewData/izumo_2023_fiscal_overview.json";

// 千円を億円に変換するヘルパー関数
const toOkuEn = (senEn: number) => Math.round(senEn / 100000);

// 歳入歳出データ（千円単位で保持、表示時に億円変換）
const revenueExpenditureData = [
  {
    name: "歳入",
    金額: fiscalData.finance.revenue_total,
    金額億円: toOkuEn(fiscalData.finance.revenue_total),
  },
  {
    name: "歳出",
    金額: fiscalData.finance.expenditure_total,
    金額億円: toOkuEn(fiscalData.finance.expenditure_total),
  },
  {
    name: "差引残高",
    金額: fiscalData.finance.balance,
    金額億円: toOkuEn(fiscalData.finance.balance),
  },
];

// 基金残高データ（千円単位で保持）
const fundData = [
  {
    name: "財政調整基金",
    金額: fiscalData.fund_balances.fiscal_adjustment_fund,
    金額億円: toOkuEn(fiscalData.fund_balances.fiscal_adjustment_fund),
    color: "#3b82f6",
  },
  {
    name: "減債基金",
    金額: fiscalData.fund_balances.debt_reduction_fund,
    金額億円: toOkuEn(fiscalData.fund_balances.debt_reduction_fund),
    color: "#10b981",
  },
  {
    name: "その他目的基金",
    金額: fiscalData.fund_balances.other_purpose_funds,
    金額億円: toOkuEn(fiscalData.fund_balances.other_purpose_funds),
    color: "#f59e0b",
  },
];

// 地方債残高データ（千円単位で保持）
const debtData = [
  {
    name: "地方債残高",
    value: fiscalData.finance.local_bonds.balance,
    億円: toOkuEn(fiscalData.finance.local_bonds.balance),
  },
  {
    name: "臨時財政対策債除く",
    value: fiscalData.finance.local_bonds.excluding_temp_finance_bonds,
    億円: toOkuEn(fiscalData.finance.local_bonds.excluding_temp_finance_bonds),
  },
];

const COLORS = ["#ef4444", "#3b82f6"];

// 職員データ
const staffData = [
  {
    職種: "一般職員",
    人数: fiscalData.personnel.general_staff.staff.count,
    平均給与: (
      fiscalData.personnel.general_staff.staff.salary_avg_100yen / 100
    ).toFixed(1),
  },
  {
    職種: "消防職員",
    人数: fiscalData.personnel.general_staff.firefighters.count,
    平均給与: (
      fiscalData.personnel.general_staff.firefighters.salary_avg_100yen / 100
    ).toFixed(1),
  },
  {
    職種: "教育公務員",
    人数: fiscalData.personnel.general_staff.teachers.count,
    平均給与: (
      fiscalData.personnel.general_staff.teachers.salary_avg_100yen / 100
    ).toFixed(1),
  },
];

export function FiscalStats() {
  const populationChange =
    fiscalData.population.basic_residents_growth_rate_percent;
  const isPopulationIncrease = populationChange > 0;
  const singleYearBalance = fiscalData.finance.single_year_balance;
  const isBalancePositive = singleYearBalance > 0;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="space-y-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border border-emerald-100 dark:border-gray-600">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              出雲市 財政状況
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {fiscalData.metadata.year} | {fiscalData.metadata.municipality}
          </p>
        </div>

        {/* 人口・世帯の概要 */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                人口
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {fiscalData.population.basic_residents_2024_01_01.toLocaleString()}
                人
              </p>
              <div className="flex items-center gap-1 mt-2">
                {isPopulationIncrease ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <p
                  className={`text-sm font-medium ${
                    isPopulationIncrease ? "text-green-600" : "text-red-600"
                  }`}
                >
                  前年比: {populationChange > 0 ? "+" : ""}
                  {populationChange}%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                世帯数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {fiscalData.population.households.toLocaleString()}世帯
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                人口密度: {fiscalData.population.density_per_km2}人/km²
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-orange-600" />
                財政力指数
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      自治体の財政的な自立度を示す指標。1.0以上で地方交付税の不交付団体となる。数値が高いほど財源に余裕がある。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {fiscalData.finance.financial_power_index}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  将来負担比率: {fiscalData.finance.future_burden_ratio}%
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      将来支払う借金などの負担が、自治体の財政規模に対してどれくらいの割合かを示す指標。400%以上で早期健全化基準。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 歳入歳出・収支 */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-600" />
                歳入総額
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      自治体が1年間に得た収入の合計。税収、国からの交付金、手数料など。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {toOkuEn(fiscalData.finance.revenue_total).toLocaleString()}
                億円
              </p>
              <div className="flex items-center gap-1 mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  標準財政規模:{" "}
                  {toOkuEn(
                    fiscalData.finance.standard_financial_size
                  ).toLocaleString()}
                  億円
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      自治体の通常使える収入の標準的な規模。財政の健全性を測る基準となる。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-red-600" />
                歳出総額
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      自治体が1年間に使った支出の合計。福祉、教育、公共事業などに使われる。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {toOkuEn(fiscalData.finance.expenditure_total).toLocaleString()}
                億円
              </p>
              <div className="flex items-center gap-1 mt-2">
                {isBalancePositive ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <p
                  className={`text-sm font-medium ${
                    isBalancePositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  単年度収支: {toOkuEn(singleYearBalance).toLocaleString()}億円
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      その年度の歳入から歳出を引いた収支。プラスなら黒字、マイナスなら赤字。
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 歳入歳出バランス */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-blue-600" />
              歳入歳出バランス
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    自治体の収入(歳入)と支出(歳出)のバランス。歳入が歳出を上回れば黒字、下回れば赤字となる。
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              令和5年度の財政収支状況
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-3 h-3 text-gray-400 cursor-help ml-1 inline-block" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    2023年4月1日から2024年3月31日までの1年間の財政状況を示す。
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={400}>
                <BarChart data={revenueExpenditureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" style={{ fontSize: "11px" }} />
                  <YAxis
                    label={{
                      value: "億円",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    style={{ fontSize: "11px" }}
                  />
                  <RechartsTooltip
                    formatter={(value: number) => `${value}億円`}
                  />
                  <Legend />
                  <Bar dataKey="金額億円" fill="#3b82f6" name="金額" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 基金残高 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-green-600" />
              基金残高
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    自治体が将来の支出に備えて積み立てる貸金。財政調整基金、減債基金、特定目的基金などがある。
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>各種基金の積立状況</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={400}>
                <BarChart data={fundData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" style={{ fontSize: "11px" }} />
                  <YAxis
                    label={{
                      value: "億円",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    style={{ fontSize: "11px" }}
                  />
                  <RechartsTooltip
                    formatter={(value: number) => `${value}億円`}
                  />
                  <Legend />
                  <Bar dataKey="金額億円" name="残高">
                    {fundData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 地方債残高 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-red-600" />
              地方債残高
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    自治体が道路や学校などの公共施設を建設するために借りた長期的な借金。将来世代も含めて返済する。
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>市の借入金残高</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[0] }}
                ></div>
                <span className="text-sm text-gray-700">
                  総残高: {debtData[0].億円.toLocaleString()}億円
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[1] }}
                ></div>
                <span className="text-sm text-gray-700">
                  臨財債除く: {debtData[1].億円.toLocaleString()}億円
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={debtData.map((item) => ({
                    name: item.name,
                    value: item.億円,
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) =>
                    percent ? `${(percent * 100).toFixed(1)}%` : ""
                  }
                  outerRadius={80}
                  dataKey="value"
                >
                  {debtData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: number) => `${value}億円`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 職員数と給与 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              職員数と平均給与
            </CardTitle>
            <CardDescription>職種別の職員数と平均給与（月額）</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={500}>
                <BarChart data={staffData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="職種" style={{ fontSize: "11px" }} />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    label={{ value: "人", angle: -90, position: "insideLeft" }}
                    style={{ fontSize: "11px" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "万円",
                      angle: 90,
                      position: "insideRight",
                    }}
                    style={{ fontSize: "11px" }}
                  />
                  <RechartsTooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="人数"
                    fill="#8b5cf6"
                    name="職員数"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="平均給与"
                    fill="#10b981"
                    name="平均給与（月額）"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                総職員数:{" "}
                {fiscalData.personnel.general_staff.total.count.toLocaleString()}
                人 | 平均給与:{" "}
                {(
                  fiscalData.personnel.general_staff.total.salary_avg_100yen /
                  100
                ).toFixed(1)}
                万円/月
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
