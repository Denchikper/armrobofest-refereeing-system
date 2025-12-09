export default function BackgroundImages() {
  return (
    <div>
      <img 
        src="/images/Chain glass 1.svg" 
        alt="background left" 
        className="absolute left-[0%] top-[20%] w-[10 %] "
      />
      {/* Левое изображение - справа сверху */}
      <img 
        src="/images/Perforated ring glass 1.svg" 
        alt="background left" 
        className="absolute right-[5%] top-[8%] w-[16%] "
      />
      <img 
        src="/images/Globe spiral glass 1.svg" 
        alt="background left" 
        className="absolute right-[0%] top-[42%] w-[10%] "
      />
      <img 
        src="/images/Telephone wire glass 3.svg" 
        alt="background left" 
        className="absolute right-[15%] bottom-[3%] w-[20%] "
      />
      <img 
        src="/images/Star ring glass 1.svg" 
        alt="background left " 
        className="absolute left-[10%] bottom-[11%] w-[23%] "
      /> 
    </div>
  );
}