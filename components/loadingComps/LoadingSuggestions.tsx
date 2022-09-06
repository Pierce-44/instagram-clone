function LoadingSuggestions() {
  const filler = [1, 2, 3, 4, 5];

  return (
    <div>
      {filler.map((index) => (
        <div className="flex animate-pulse py-1" key={`fillerKey${index}`}>
          <div className="h-8 w-8 rounded-full bg-[#ebebeb] dark:bg-[#313131]" />
          <div className="flex  flex-col justify-between pl-4">
            <div className="h-3 w-12 rounded-sm bg-[#ebebeb] dark:bg-[#313131]" />
            <div className="h-3 w-24 rounded-sm bg-[#ebebeb] dark:bg-[#313131]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSuggestions;
