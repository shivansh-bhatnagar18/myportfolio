import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-[#393A59]">
      <div className="flex flex-col max-w-[800px] w-full h-[500px] overflow-hidden rounded-[6px] border-[1px] border-gray-500 m-[20px] cursor-text">
        <div className="flex items-center text-center flex-row h-[24px] w-full bg-[#424040] cursor-default py-[8px]">
          <div className="flex flex-row absolute">
            <div className="w-[12px] h-[12px] rounded-[50%] mr-[8px] cursor-pointer bg-[#f5544d]"></div>
            <div className="w-[12px] h-[12px] rounded-[50%] mr-[8px] cursor-pointer bg-[#fabd2f]"></div>
            <div className="w-[12px] h-[12px] rounded-[50%] mr-[8px] cursor-pointer bg-[#47d043]"></div>
          </div>
          <div className="flex-1 text-center">
            <a href="https://github.com/shivansh-bhatnagar18" target="_blank" className="text-[#EEEEEE]">
              <i className='fab fa-github'></i>
              <h1 className="bg-[#9c9c9c] text-[13px]">github.com/shivansh-bhatnagar18</h1>
            </a>
          </div>
        </div>
        <div className="flex flex-col bg-[#282a35] w-full h-full p-[8px] overflow-auto">

        </div>
      </div>
    </div>
  );
}
