import React from 'react';

const OfflineOverlay = ({ isVisible, isChecking, onRetry }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-red-900/30 to-orange-900/30 p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Проблемы с соединением
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Связь с сервером потеряна
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-200 mb-6 text-center">
            Приложение временно недоступно.
            <span className="font-bold text-yellow-300">
              {' '}Не переходите на другие страницы
            </span>
            {' '}— данные могут быть потеряны.
          </p>

          <div className="space-y-3">
            <button
              onClick={onRetry}
              disabled={isChecking}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChecking ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Попытка подключения...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Проверить подключение</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineOverlay;
