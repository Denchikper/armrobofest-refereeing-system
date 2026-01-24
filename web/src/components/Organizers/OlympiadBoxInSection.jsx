import { Lock, Unlock } from "lucide-react";

export default function OlympiadBoxInSection({title, onClickHandle, isClosed}) {
  const statusText = isClosed ? "закрыта" : "открыта";
  const StatusIcon = isClosed ? Lock : Unlock;
  const buttonText = isClosed ? "ОТКРЫТЬ" : "ЗАКРЫТЬ";
  const buttonColor = isClosed ? "#3ac318" : "#EE2222";

  return (
    <div 
      className="inline-flex flex-col items-center justify-center gap-4 pt-4 pb-3 px-4 bg-[#EFEFEF] rounded-4xl transition-all duration-300"
    >
      <div className="flex flex-col items-center">
        <div className="futura-heavy text-[#909090] text-2xl">
          {title}
        </div>

        <div className="flex items-center justify-center gap-1.5">
          <span className="futura-medium text-lg font-medium text-[#909090]">
            {statusText}
          </span>
          <StatusIcon className="w-4 h-4 text-[#909090]" />
        </div>
      </div>

      <button 
        className="cursor-pointer -mt-2 flex w-[153px] h-[37px] items-center justify-center rounded-3xl transition-colors disabled:cursor-not-allowed hover:opacity-90"
        style={{ 
          backgroundColor: buttonColor,
        }}
        onClick={() => onClickHandle()}
      >
        <span className="futura-heavy font-normal text-white text-xl whitespace-nowrap">
          {buttonText}
        </span>
      </button>
    </div>
  );
}