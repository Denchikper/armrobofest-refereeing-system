export default function Header({ olympiadText, upJudgeOn, upJudge }) {
  
  const formatJudgeName = (judge) => {
    if (!judge || !judge.firstName) return judge?.name || "";
    
    const { firstName, lastName, secondName } = judge;
    let formatted = firstName || "";
    
    if (secondName) {
      formatted += ` ${secondName.charAt(0).toUpperCase()}.`;
    }
    
    if (lastName) {
      formatted += `${lastName.charAt(0).toUpperCase()}.`;
    }
    
    return formatted;
  };
  
  return (
    <div className="w-full px-5 pt-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Левый блок */}
        <div className="flex items-center">
          <img
            src="/images/logo_fest.svg"
            alt="logo"
            className="w-[178px] h-[52px] mr-3 pointer-events-none select-none"
          />

          <div className="flex items-center space-x-3">
            <img 
              src="/icons/robot.svg" 
              alt="robot"
              className="w-9 h-9 pointer-events-none select-none"
            />
    
            <div>
              <h1 className="text-3xl futura-bold tracking-wide text-[#0056C1]">
                ПОМОЩНИК СУДЬИ
              </h1>
              
              {olympiadText && (
                <p className="futura-heavy text-[#2e2e2e] text-xl">{olympiadText}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Правый блок с судьей */}
        {upJudgeOn && upJudge && (
          <div className="flex items-center gap-3">
            <img 
              src="/icons/profile.svg"
              alt="Судья"
              className="w-12 h-12 pointer-events-none select-none"
            />
            <div className="text-left">
              <p className="text-3xl futura-heavy text-[#2E2E2E]">
                {formatJudgeName(upJudge)}
              </p>
              <p className="text-xl futura-medium -mt-2 text-[#909090]">{upJudge.role || "Cудья"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}