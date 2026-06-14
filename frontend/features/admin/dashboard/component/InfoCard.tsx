export default function InfoCard({
    heading,
    count = 1,
    onClick,
}: {
    heading: string;
    count: string | number;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="shadow-sm border  rounded-xl p-4 min-w-40 max-w-55 min-h-30 flex flex-col items-start justify-center gap-2"
        >
            <h4 className="text-lg font-medium">{heading}</h4>
            <p
                className={`font-bold text-4xl ${
                    heading === "Passed Checks"
                        ? "text-[#23B5A9]"
                        : heading === "Vulnerabilities"
                          ? "text-[#F56A2E]"
                          : "text-black"
                }`}
            >
                {heading === "Passed Checks" ? `${count}%` : count}
            </p>
        </div>
    );
}
