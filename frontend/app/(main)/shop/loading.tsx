export default function ShopLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10 flex-1 flex flex-col animate-pulse">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Skeleton */}
        <div className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6 lg:col-span-1">
          <div className="h-6 w-32 bg-gray-200 rounded-md mb-6 border-b border-gray-200 pb-2" />
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-5/6 bg-gray-200 rounded-md" />
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="h-5 w-24 bg-gray-200 rounded-md mb-4" />
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-gray-200" />
                    <div className="h-4 w-32 bg-gray-200 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-5">
              <div className="h-10 w-full bg-gray-200 rounded-xl" />
              <div className="h-10 w-full bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="lg:col-span-3 flex flex-col min-h-[50vh]">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-64 bg-gray-200 rounded-md" />
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <div className="mb-3 aspect-[4/3] w-full rounded-lg bg-gray-200" />
                  <div className="h-3 w-20 bg-gray-200 rounded-md mb-2" />
                  <div className="h-5 w-48 bg-gray-200 rounded-md mb-2" />
                  <div className="h-4 w-24 bg-gray-200 rounded-md mb-3" />
                  <div className="h-3 w-32 bg-gray-200 rounded-md" />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="h-3 w-24 bg-gray-200 rounded-md" />
                  <div className="h-3 w-20 bg-gray-200 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
