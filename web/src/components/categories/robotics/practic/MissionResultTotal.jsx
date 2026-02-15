export default function MissionResultTotal({ total, max, time }) {
  const formatTime = (t) => t 
    ? `${String(t.minutes || 0).padStart(2, '0')}:${String(t.seconds || 0).padStart(2, '0')}:${String(t.milliseconds || 0).padStart(3, '0')}`
    : "00:00:000";

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex items-center gap-3 text-2xl futura-demi uppercase">
        <span>ИТОГО</span>
        <div className="bg-[#3AC318] text-white px-4 py-1 rounded-full">
          {total} / {max}
        </div>
        {time && (
          <div className="flex items-center gap-1 text-lg futura-demi text-blue-600 bg-blue-50 px-3 py-1 rounded-lg ml-2">
            <span>⏱</span>
            <span className="font-mono">{formatTime(time)}</span>
          </div>
        )}
      </div>
    </div>
  );
}