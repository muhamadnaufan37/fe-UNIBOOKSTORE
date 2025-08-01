import { useRef } from "react";
import { Toast } from "primereact/toast";

const NotFoundNikPage = () => {
  const toastRef = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} />
      <div className="flex flex-col h-[100dvh] iphone-cursor">
        <div className="flex flex-col justify-center items-center text-center gap-3 px-4 py-3 h-full">
          <img
            src="/sapawarga/empty-data-params.svg"
            alt="empty-data-params"
            className="object-cover rounded-md"
          />
          <span>Nomor Induk Kependudukan Tidak Diketahui.</span>
        </div>
      </div>
    </>
  );
};

export default NotFoundNikPage;
