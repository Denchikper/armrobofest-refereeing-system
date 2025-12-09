export default function ParticipantMissionPanel({ participant }) {
  if (!participant) {
    return <div>Ошибка</div>;
  }

  return (
      <div className="text-center z-50 w-full">
        <div className="flex items-center justify-center gap-2">
            <p className="text-xl futura-demi text-[#2E2E2E]">
          {participant.firstName} {participant.secondName} {participant.lastName} |
            </p>
            <p className="text-[20px] futura-demi text-[#2E2E2E] ">{participant.class} класс</p>
            <div className="text-white futura-demi ml-1 text-2xl bg-[#00B7CF] rounded-lg px-2">{participant.teamName}</div>

        </div>
        
        <div className="">
          <p className="text-xl futura-demi text-[#2E2E2E]">
            {participant.organizationName}
          </p>
      </div>
    </div>
  );
}