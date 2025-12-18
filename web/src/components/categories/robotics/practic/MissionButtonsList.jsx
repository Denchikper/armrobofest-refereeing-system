import MissionButton from "./MissionButton";

export default function MissionButtonsList({navigate}) {
  
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mt-30 px-4">
      <MissionButton numMission={1} disabled={false} onClick={() => navigate("/robotics/practic/missionOne")} />
      <MissionButton numMission={2} disabled={false} onClick={() => navigate("/robotics/practic/missionTwo")}  />
      <MissionButton numMission={3} disabled={false} onClick={() => navigate("/robotics/practic/missionThree")}  />
    </div>
  );
}