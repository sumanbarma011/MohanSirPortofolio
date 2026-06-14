"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description =
  "A chart to showcase the different content of admin.";

const chartConfig = {
  posts: {
    label: "Posts",
  },
  chrome: {
    label: "Blog",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Event",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

type ChartDataType = {
  postType: string;
  posts: number;
  fill: string;
};

type DashboardPieChartProps = {
  blogsCount: number;
};

export function AdminDashboardPieChart({ blogsCount }: DashboardPieChartProps) {
  const chartData: ChartDataType[] = [
    {
      postType: "Blogs",
      posts: blogsCount || 0,
      fill: "#2563EB",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">Post Distribution Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="flex justify-betweenss">
          <div className="flex-1">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] max-w-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="posts"
                  nameKey="postType"
                  innerRadius={60}
                />
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 place-items-center">
        {/* chart label */}
        {chartData.map((data) => (
          <div key={data.postType}>
            <div
              className={`size-4 ${data.postType === "Blogs" ? "bg-[#2563EB]" : "bg-[#F97316]"} border-2 border-[${data.fill}] rounded-[4px]`}
            ></div>
            <p className="flex gap-2">
              {data.postType} <span>({data.posts})</span>
            </p>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
