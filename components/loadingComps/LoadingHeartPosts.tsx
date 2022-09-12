import SpinnerSVG from '../svgComps/SpinnerSVG';

export default function LoadingHeartPosts() {
  return (
    <div className="absolute top-6 right-[-80px] h-[280px] w-[270px] cursor-default text-[#262626] dark:text-[#f1f5f9]   sm:right-[-12px] sm:w-[440px]">
      <div className="ml-auto mr-[84px] flex h-4 w-4 items-center justify-center overflow-hidden sm:mr-4">
        <div className="mt-5 h-4 w-4 rotate-45 bg-white dark:bg-[#131313]" />
      </div>
      <div
        className="flex h-full items-center justify-center rounded-md
    bg-white py-4 shadow-[-2px_-2px_10px_2px_rgba(0,0,0,0.1)]
    dark:bg-[#131313] dark:shadow-[-2px_-2px_5px_2px_rgba(0,0,0,0.7)]"
      >
        <div className=" h-6 w-6 ">
          <SpinnerSVG />
        </div>
      </div>
    </div>
  );
}
