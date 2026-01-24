export default function ParticipantPanel({participant}) {
  if (!participant) {
    return <div>Ошибка</div>; // или можно показать skeleton / loader
  }
  return (
    <div className="fixed top-[11%] left-1/2 -translate-x-1/2 z-50">
      <div className="p-6 text-center">
          <h3 className="text-4xl futura-heavy text-[#2E2E2E]">{participant.firstName}</h3>
          <p className="text-3xl text-[#2E2E2E] futura-heavy">{participant.secondName} {participant.lastName}</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <p className="futura-demi text-xl text-[#2E2E2E]"> {participant.class} класс</p>
            <div className="text-white futura-demi text-2xl bg-[#3AC318] rounded-lg px-2">{participant.teamName}/{participant.pod_team_id}</div>
          </div>
          <p className=" futura-demi text-lg mt-2 text-[#2E2E2E]">{participant.organizationName}</p>
      </div>
    </div>
  );
}