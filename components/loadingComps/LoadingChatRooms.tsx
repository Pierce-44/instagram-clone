function LoadingChatRooms() {
  const filler = [1, 2, 3, 4, 5];

  return (
    <div className="px-5 py-2">
      {filler.map((index) => (
        <div
          className="flex animate-pulse items-center py-1"
          key={`fillerChat${index}`}
        >
          <div className="h-14 w-14 rounded-full bg-[#ebebeb] dark:bg-[#313131]" />
          <div className="ml-2 h-5 w-[40%] rounded-md bg-[#efefef] dark:bg-[#313131]" />
        </div>
      ))}
    </div>
  );
}

export default LoadingChatRooms;
