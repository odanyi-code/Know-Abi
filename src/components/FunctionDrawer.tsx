import React, { useState } from 'react';

const FunctionDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Açma butonu */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-0 right-0 z-50 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg"
      >
        Fonksiyonlar
      </button>

      {/* Çekmece */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col p-6 transition-transform duration-500 transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        <button
          onClick={() => setOpen(false)}
          className="self-end mb-4 text-gray-500 hover:text-red-500 text-2xl"
          title="Kapat"
        >
          ×
        </button>
        <button
          className="w-full mb-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          onClick={() => document.documentElement.classList.toggle('dark')}
        >
          Koyu/Açık Tema Değiştir
        </button>
        {/* ...istediğin kadar fonksiyon ekleyebilirsin... */}
      </div>
    </>
  );
};

export default FunctionDrawer;