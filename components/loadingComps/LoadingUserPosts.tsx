function LoadingUserPosts() {
  const mapArray = [1, 2, 3];

  return (
    <div className="grid max-w-[935px] animate-pulse grid-cols-3 gap-1  pb-10 sm:gap-4">
      {mapArray.map((index) => (
        <div
          key={`userPost${index}`}
          className="h-[175px] max-w-[300px] bg-[#ebebeb] dark:bg-[#313131] sm:h-[300px]"
        />
      ))}
    </div>
  );
}

export default LoadingUserPosts;
