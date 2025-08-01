import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { axiosServices } from "../../../../../services/axios";
import { InputText } from "primereact/inputtext";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

interface balikanUserData {
  id: string | number;
}

const KelolaDataKategori = () => {
  const toastRef = useRef<Toast>(null);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [filterInput, setFilterInput] = useState("");
  const [lastPage, setLastPage] = useState(1);
  const [isDataFetching, setIsDataFetching] = useState(false);
  const [userData, setUserData] = useState<balikanUserData | null>(null);
  const [visibleRight4, setVisibleRight4] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosServices().get(
        `/api/v1/unibookstore/buku/kategori/list`,
        {
          params: {
            page: page,
            "per-page": rows,
            keyword: filterInput,
          },
        }
      );
      return response.data.data_kategori;
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (
          [
            400, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413,
            414, 415, 416, 417, 418, 422, 423, 424, 425, 426, 428, 429, 431,
            451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
          ].includes(status)
        ) {
          toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: data.message || "Terjadi kesalahan",
            life: 3000,
          });
        }
      }
    }
  };

  const DetailDataFetch = async (id: any, visibilityOption: any) => {
    try {
      if (!isDataFetching) {
        setIsDataFetching(true);

        const response = await axiosServices().post(
          `/api/v1/unibookstore/buku/kategori/edit`,
          {
            id,
          }
        );

        if (!response.data.success) {
          toastRef.current?.show({
            severity: "error",
            summary: "Gagal",
            detail: response.data.message || "Gagal memuat data penetapan",
            life: 3000,
          });
          return;
        }

        const kategoriBukuDataArray = response.data.data_kategori;
        setUserData(kategoriBukuDataArray);

        switch (visibilityOption) {
          case 2:
            navigate("/admin/kelola-kategori-buku/detail-kategori", {
              state: {
                detailData: kategoriBukuDataArray,
              },
              replace: true,
            });
            break;
          case 3:
            navigate("/admin/kelola-kategori-buku/update-kategori", {
              state: {
                detailData: kategoriBukuDataArray,
              },
              replace: true,
            });
            break;
          case 4:
            setVisibleRight4(true);
            break;
        }
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (
          [
            400, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413,
            414, 415, 416, 417, 418, 422, 423, 424, 425, 426, 428, 429, 431,
            451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
          ].includes(status)
        ) {
          toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: data.message || "Terjadi kesalahan",
            life: 3000,
          });
        }
      }
    } finally {
      setIsDataFetching(false);
    }
  };

  const {
    data: dataListKategoriBuku,
    isFetching: isRefetchingListKategoriBuku,
    refetch: refetchListKategoriBuku,
  } = useQuery({
    queryKey: "listKategoriBuku" + page + rows,
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setLastPage(data?.last_page || 1);
    },
  });

  const aksiDropdown = (data: any) => {
    return (
      <>
        <div className="flex items-center justify-center gap-1">
          <Button
            type="button"
            icon="pi pi-eye"
            className="p-button-sm text-xs"
            severity="warning"
            size="small"
            onClick={() => DetailDataFetch(data.id, 2)}
            disabled={isRefetchingListKategoriBuku}
            outlined
          />
          <Button
            type="button"
            icon="pi pi-pencil"
            className="p-button-sm text-xs"
            severity="info"
            size="small"
            onClick={() => DetailDataFetch(data.id, 3)}
            disabled={isRefetchingListKategoriBuku}
            outlined
          />
          <Button
            type="button"
            icon="pi pi-trash"
            className="p-button-sm text-xs"
            severity="danger"
            size="small"
            onClick={() => DetailDataFetch(data.id, 4)}
            disabled={isRefetchingListKategoriBuku}
            outlined
          />
        </div>
      </>
    );
  };

  const onDeleteData = async () => {
    try {
      const response = await axiosServices().delete(
        `/api/v1/unibookstore/buku/kategori/delete`,
        {
          data: { id: userData?.id },
        }
      );
      const responseDatamessage = response.data;
      if (responseDatamessage.success === true) {
        refetchListKategoriBuku();
        toastRef.current?.show({
          severity: "success",
          summary: "Sukses",
          detail: responseDatamessage.message,
          life: 3000,
        });
        setVisibleRight4(false);
      } else if (responseDatamessage.success === false) {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: responseDatamessage.message,
          life: 3000,
        });
        setVisibleRight4(false);
      } else {
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: responseDatamessage.message,
          life: 3000,
        });
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (
          [
            400, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413,
            414, 415, 416, 417, 418, 422, 423, 424, 425, 426, 428, 429, 431,
            451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
          ].includes(status)
        ) {
          toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: data.message || "Terjadi kesalahan",
            life: 3000,
          });
        }
      }
    }
  };

  const onResetFilter = () => {
    setPage(1);
    setRows(10);
    setFilterInput("");
  };

  const onPageChange = (event: any) => {
    setPage(event.page + 1);
    setRows(event.rows);
  };

  const handleSidebarDeleteHide = () => {
    setVisibleRight4(false);
  };

  useEffect(() => {
    if (filterInput === "") {
      refetchListKategoriBuku();
    }
  }, [filterInput]);

  return (
    <>
      <Toast ref={toastRef} />
      <div className="relative p-4">
        {isRefetchingListKategoriBuku && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <svg
                className="animate-spin h-6 w-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center gap-3">
          <div className="grid base-card bg-background gap-2 bg-white">
            <div className="flex justify-between items-center p-2">
              <div className="font-semibold text-xl">
                Kelola Data Kategori Buku
              </div>
              <Button
                type="button"
                label="Kembali"
                className="p-button-sm text-xs"
                severity="success"
                onClick={() =>
                  navigate("/admin", {
                    replace: true,
                  })
                }
                size="small"
                disabled={isRefetchingListKategoriBuku}
              />
            </div>
            <div className="grid base-card-with-title p-2 gap-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
                <InputText
                  className="p-inputtext-sm w-full text-xs"
                  placeholder="Cari data Kategori Buku"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      refetchListKategoriBuku();
                    }
                  }}
                  value={filterInput}
                  onChange={(event) => setFilterInput(event.target.value)}
                />
                <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
                  <Button
                    type="button"
                    label="Reset"
                    className="w-full md:w-[12rem] p-button-sm text-xs"
                    icon="pi pi-refresh"
                    severity="danger"
                    onClick={onResetFilter}
                    size="small"
                    disabled={isRefetchingListKategoriBuku}
                  />
                  <Button
                    type="button"
                    label="Tambah Kategori Buku"
                    className="w-full md:w-[12rem] p-button-sm text-xs"
                    icon="pi pi-plus"
                    severity="info"
                    onClick={() =>
                      navigate("/admin/kelola-kategori-buku/add-kategori", {
                        replace: true,
                      })
                    }
                    size="small"
                    disabled={isRefetchingListKategoriBuku}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="max-h-[650px] overflow-y-auto bg-white rounded-xl w-full">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-[#0D48A0] text-white text-xs">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      No.
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      Nama Kategori Buku
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!dataListKategoriBuku ||
                  dataListKategoriBuku?.success === false ||
                  dataListKategoriBuku?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src="/UNIBOOKSTORE/table-no-entry-data.svg"
                            alt="data tidak ditemukan"
                            className="w-48 h-48 mb-4"
                          />
                          <span className="text-sm">
                            <b>Belum ada data Kategori.</b> <br />
                            Silakan menambahkan data Kategori.
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    dataListKategoriBuku?.data?.map((item: any, idx: any) => (
                      <tr key={idx} className="border-t text-xs">
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {item.nama_kategori}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {aksiDropdown(item)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm p-3 bg-white rounded-xl gap-3">
            <div className="flex items-center">
              <span className="mr-2">Tampilkan</span>
              <select
                className="border rounded px-2 py-1 mr-2"
                value={rows}
                onChange={(e) =>
                  onPageChange({
                    page: 0,
                    first: 0,
                    rows: parseInt(e.target.value),
                  })
                }
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>
                Item dari total <b>{dataListKategoriBuku?.total}</b>
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="mr-2">Halaman</span>
              <input
                type="number"
                className="border w-12 px-1 py-1 text-center rounded mr-1"
                value={page}
                onChange={(e) => {
                  let newPage = parseInt(e.target.value);
                  if (newPage >= 1 && newPage <= lastPage) {
                    onPageChange({
                      page: newPage - 1,
                      first: (newPage - 1) * rows,
                      rows,
                    });
                  }
                }}
              />
              <span className="mr-2">dari {dataListKategoriBuku?.to}</span>

              {/* First */}
              <button
                className="border p-1 rounded"
                disabled={page <= 1}
                onClick={() => onPageChange({ page: 0, first: 0, rows })}
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              {/* Prev */}
              <button
                className="border p-1 rounded"
                disabled={page <= 1}
                onClick={() => {
                  if (page > 1) {
                    onPageChange({
                      page: page - 2,
                      first: (page - 2) * rows,
                      rows,
                    });
                  }
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next */}
              <button
                className="border p-1 rounded"
                disabled={page >= lastPage}
                onClick={() => {
                  if (page < lastPage) {
                    onPageChange({
                      page: page,
                      first: page * rows,
                      rows,
                    });
                  }
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last */}
              <button
                className="border p-1 rounded"
                disabled={page >= lastPage}
                onClick={() =>
                  onPageChange({
                    page: lastPage - 1,
                    first: (lastPage - 1) * rows,
                    rows,
                  })
                }
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        visible={visibleRight4}
        onHide={handleSidebarDeleteHide}
        header="Konfirmasi Hapus Data"
        modal={true}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        footer={
          <>
            <div className="flex justify-end items-center">
              <Button
                type="button"
                label="Batal"
                className="p-inputtext-sm text-xs"
                severity="danger"
                onClick={handleSidebarDeleteHide}
                size="small"
                outlined
              />
              <Button
                type="submit"
                label="Ya, Hapus Sekarang"
                className="p-inputtext-sm text-xs"
                severity="danger"
                onClick={onDeleteData}
                size="small"
              />
            </div>
          </>
        }
      >
        Apakah Anda yakin ingin <b>Menghapus data tersebut?</b>
      </Dialog>
    </>
  );
};

export default KelolaDataKategori;
