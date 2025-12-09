export default function MiniFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-3 px-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <img 
          src="/images/logo_nvmu.svg"
          alt="Логотип НВМУ"
          className="w-[19px] h-auto"
        />
        <p className="text-sm text-gray-600 text-center font-medium">
          Филиал Нахимовского военно-морского ордена Почёта училища в г. Калининграде
        </p>
      </div>
    </footer>
  );
}