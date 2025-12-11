export default function MissionResultTotal({ total, max }) {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center gap-3 text-2xl futura-demi uppercase">
        <span>ИТОГ</span>
        <div className="bg-[#3AC318] text-white px-4 py-1 rounded-full">
          {total} / {max}
        </div>
      </div>
    </div>
  );
}