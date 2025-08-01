import { useRef } from "react";
import { Toast } from "primereact/toast";

const NotFoundPage = () => {
  const toastRef = useRef<Toast>(null);

  return (
    <>
      <Toast ref={toastRef} />
      <div className="flex flex-col h-[100dvh] iphone-cursor">
        <div className="flex flex-col justify-center items-center text-center gap-3 px-4 py-3 h-full">
          <img
            src="/UNIBOOKSTORE/404-logo.svg"
            alt="404-logo"
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
