
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

export default function AdminDashboardChartSuspense() {
  return (
    <div className="w-full h-[320px] rounded-xl border bg-muted/40 animate-pulse p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-32 rounded bg-muted" />
        <div className="h-4 w-20 rounded bg-muted" />
      </div>

      {/* Chart area */}
      <div className="h-full w-full rounded-lg bg-muted" />
    </div>
  );
}

export const InfoCardSuspense = () => {
    return (
        <div className="shadow-sm border rounded-xl p-4 min-w-40 max-w-55 min-h-30 flex flex-col items-start justify-center gap-2 animate-pulse">
            {/* Heading skeleton */}
            <div className="h-5 w-32 bg-gray-200 rounded-md" />

            {/* Count skeleton */}
            <div className="h-10 w-20 bg-gray-300 rounded-md" />
        </div>
    );
     {/* can be used later on as following */}
                    {/* <Suspense fallback={ <InfoCardSuspense />}>

                    <InfoCard
                        heading={"Blogs"}
                        count={blogs?.length || 0}
                    />
                    </Suspense>
                    <Suspense fallback={<InfoCardSuspense />}>

                    <InfoCard
                        heading={"Events"}
                        count={events?.length || 0}
                    />
                    </Suspense> */}
}



export const  AdminDashboardPieChartSuspense =()=> {
    return (
        <Card className="flex flex-col animate-pulse">
            {/* Header */}
            <CardHeader className="items-center pb-0">
                <div className="h-5 w-64 bg-gray-200 rounded-md" />
            </CardHeader>

            {/* Chart area */}
            <CardContent className="flex-1 pb-0 flex items-center justify-center">
                <div className="aspect-square max-h-[250px] max-w-[250px] w-full rounded-full bg-gray-200" />
            </CardContent>

            {/* Footer legend */}
            <CardFooter className="grid grid-cols-4 place-items-center gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <div className="size-4 bg-gray-300 rounded-sm" />
                        <div className="h-3 w-14 bg-gray-200 rounded-md" />
                    </div>
                ))}
            </CardFooter>
        </Card>
    );
}

