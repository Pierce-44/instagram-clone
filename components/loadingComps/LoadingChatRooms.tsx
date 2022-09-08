function LoadingChatRooms() {
  const filler = [1, 2, 3, 4, 5];

  return (
    <div className="px-2 py-2 md:px-5">
      {filler.map((index) => (
        <div
          className="flex animate-pulse items-center py-1"
          key={`fillerChat${index}`}
        >
          <div className="h-6 w-6 rounded-full bg-[#ebebeb] dark:bg-[#313131] md:h-14 md:w-14" />
          <div className="rounded-xs ml-2 h-3 w-[60%] bg-[#efefef] dark:bg-[#313131] md:h-5 md:w-[40%] md:rounded-sm" />
        </div>
      ))}
    </div>
  );
}

export default LoadingChatRooms;
