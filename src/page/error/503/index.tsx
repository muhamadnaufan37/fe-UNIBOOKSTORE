import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Info } from "lucide-react";

const DiluarJamLayananPage = () => {
  const toastRef = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} />
      <div className="flex flex-col h-[100dvh] iphone-cursor">
        <div className="flex flex-col gap-3 px-4 py-3">
          <img
            src="/sapawarga/503-logo.svg"
            alt="503-logo"
            className="object-cover rounded-md mx-auto"
          />
          <div className="max-w-md flex flex-col gap-1 mx-auto">
            <h2 className="text-green-700 text-xl font-semibold">
              Layanan Tidak Tersedia
            </h2>
            <p className="mt-2 text-sm font-normal leading-4 text-gray-700">
              Mohon maaf wargi, untuk saat ini layanan tidak tersedia. Silakan
              akses kembali layanan pada Waktu berikut:
            </p>
            <ul className="mt-2 text-sm font-normal leading-4 list-disc list-inside text-gray-700">
              <li>
                Senin - Kamis: <strong>09.00 - 13.00 WIB</strong>
              </li>
              <li>
                Jumat: <strong>09.00 - 14.30 WIB</strong>
              </li>
            </ul>

            <div className="bg-[#E3F2FD] border border-[#0D48A0] p-2 rounded-md flex items-center gap-2 text-xs my-2">
              <Info className=" text-[#0D48A0]" size={25} />
              <span className="font-normal text-sm leading-4 text-[#212121]">
                Layanan Tidak Tersedia Pada Hari Sabtu, Minggu, & Hari Libur
                Lainnya.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiluarJamLayananPage;
