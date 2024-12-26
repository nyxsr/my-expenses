export default function LoadingState() {
  return (
    <div className="flex min-h-[20rem] w-full flex-col items-center justify-center">
      <div className="relative h-24 w-24 animate-spin">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`absolute h-full w-full rounded-full border-4`}
            style={{
              borderColor: `rgba(0, 0, 0, ${0.3 + index * 0.2})`,
              borderTopColor: 'transparent',
              animation: `spin 1.5s cubic-bezier(0.55, 0.25, 0.25, 0.70) infinite`,
              animationDelay: `${index * 0.15}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="mt-4 text-xl font-semibold">Loading</div>
    </div>
  );
}
