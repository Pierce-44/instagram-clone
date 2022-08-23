function HomeLoadingContent() {
  const circles = [1, 2, 3, 4, 5, 6];
  return (
    <div className="h-full">
      <div className="mx-auto  max-w-[822px]">
        <div className="mt-6 flex w-[470px] justify-between rounded-lg border border-stone-300 bg-white px-5 py-4 dark:border-stone-700 dark:bg-[#1c1c1c]">
          {circles.map((index) => (
            <div
              key={index}
              className="h-14 w-14 rounded-full bg-[#ebebeb] dark:bg-[#313131]"
            />
          ))}
        </div>
        <div className="mt-6 w-[470px]  rounded-lg border border-stone-300 bg-white dark:border-stone-700 dark:bg-[#1c1c1c]">
          <div className="flex h-14 items-center">
            <div className="ml-5 h-8 w-8 rounded-full bg-[#ebebeb] dark:bg-[#313131]" />
            <div className="ml-5 h-5 w-[200px] rounded-lg bg-[#ebebeb] dark:bg-[#313131]" />
          </div>
          <div className="h-[300px] bg-[#ebebeb] dark:bg-[#313131]" />
          <div className="flex h-14 items-center">
            <div className="ml-5 h-5 w-[200px] rounded-lg bg-[#ebebeb] dark:bg-[#313131]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeLoadingContent;
