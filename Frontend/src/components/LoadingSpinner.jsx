export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-neutral-700" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 border-r-orange-500 animate-spin" />
      </div>
    </div>
  );
}
