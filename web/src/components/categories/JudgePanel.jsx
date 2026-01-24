export default function JudgePanel({judge, icon}) {
    if (!judge) {
    return null; // или можно показать skeleton / loader
  }
  return (
    <div className="relative left-1/2 -translate-x-1/2 z-50">
      <div className="p-6 text-center">
         <img 
            src={`/icons/${icon}.svg`} 
            alt="judge" 
            className="w-16 h-auto mx-auto mb-4"/>
          <h3 className="text-xl futura-heavy text-[#2E2E2E]">{judge.firstName}</h3>
          <p className="text-lg text-[#2E2E2E] -mt-2 futura-heavy">{judge.secondName} {judge.lastName}</p>
          <p className="futura-medium text-2xl -mt-3 text-[#909090]">судья</p>
      </div>
    </div>
  );
}