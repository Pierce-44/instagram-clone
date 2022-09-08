function LoadingPosts() {
  return (
    <div className="mt-6 w-full max-w-[470px]  rounded-lg border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c]">
      <div className="flex h-14 items-center">
        <div className="ml-5 h-8 w-8 animate-pulse rounded-full bg-[#ebebeb] dark:bg-[#313131]" />
        <div className="ml-5 h-5 w-[200px] animate-pulse rounded-sm bg-[#ebebeb] dark:bg-[#313131]" />
      </div>
      <div className="h-[300px] animate-pulse bg-[#ebebeb] dark:bg-[#313131]" />
      <div className="flex h-14 items-center">
        <div className="ml-5 h-5 w-[200px] animate-pulse rounded-sm bg-[#ebebeb] dark:bg-[#313131]" />
      </div>
    </div>
  );
}

export default LoadingPosts;
