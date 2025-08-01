import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-4">
        <div className="flex flex-col border border-[#E3E7ED] bg-[#FFFFFF] rounded-lg p-4">
          <button
            className="w-full"
            onClick={() =>
              navigate("/admin/kelola-buku", {
                replace: true,
              })
            }
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <img src="/UNIBOOKSTORE/icon_buku.svg" className="mr-2" />
                <div className="font-semibold text-[21px] leading-8">
                  Kelola Data Buku
                </div>
              </div>
              <ChevronRight />
            </div>
          </button>
        </div>
        <div className="flex flex-col border border-[#E3E7ED] bg-[#FFFFFF] rounded-lg p-4">
          <button
            className="w-full"
            onClick={() =>
              navigate("/admin/kelola-penerbit", {
                replace: true,
              })
            }
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <img src="/UNIBOOKSTORE/icon_penerbit.svg" className="mr-2" />
                <div className="font-semibold text-[21px] leading-8">
                  Kelola Data Penerbit
                </div>
              </div>
              <ChevronRight />
            </div>
          </button>
        </div>
        <div className="flex flex-col border border-[#E3E7ED] bg-[#FFFFFF] rounded-lg p-4">
          <button
            className="w-full"
            onClick={() =>
              navigate("/admin/kelola-kategori-buku", {
                replace: true,
              })
            }
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <img src="/UNIBOOKSTORE/icon_penerbit.svg" className="mr-2" />
                <div className="font-semibold text-[21px] leading-8">
                  Kelola Data Katagori Buku
                </div>
              </div>
              <ChevronRight />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
