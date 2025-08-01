import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useQuery } from "react-query";
import { axiosServices } from "../../services/axios";
import { InputText } from "primereact/inputtext";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "primereact/button";

const HomePage = () => {
  const toastRef = useRef<Toast>(null);

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [filterInput, setFilterInput] = useState("");
  const [lastPage, setLastPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axiosServices().get(
        `/api/v1/unibookstore/buku/list`,
        {
          params: {
            page: page,
            "per-page": rows,
            keyword: filterInput,
          },
        }
      );
      return response.data.data_buku;
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

  const {
    data: dataListBuku,
    isFetching: isRefetchingListBuku,
    refetch: refetchListBuku,
  } = useQuery({
    queryKey: "listBuku" + page + rows,
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setLastPage(data?.last_page || 1);
    },
  });

  const onResetFilter = () => {
    setPage(1);
    setRows(10);
    setFilterInput("");
  };

  const onPageChange = (event: any) => {
    setPage(event.page + 1);
    setRows(event.rows);
  };

  const renderDataHarga = (data: any) => {
    const total = parseInt(data?.harga);
    return <>{new Intl.NumberFormat("id-ID").format(total)}</>;
  };

  useEffect(() => {
    if (filterInput === "") {
      refetchListBuku();
    }
  }, [filterInput]);

  return (
    <>
      <Toast ref={toastRef} />
      <div className="relative p-4">
        {isRefetchingListBuku && (
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
            <div className="font-semibold text-xl">Data Buku</div>
            <div className="grid base-card-with-title p-2 gap-4">
              <div className="flex items-center gap-3 md:flex-row flex-col w-full">
                <InputText
                  className="p-inputtext-sm w-full text-xs"
                  placeholder="Cari data buku"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      refetchListBuku();
                    }
                  }}
                  value={filterInput}
                  onChange={(event) => setFilterInput(event.target.value)}
                />
                <Button
                  type="button"
                  label="Reset"
                  className="w-full md:w-fit p-button-sm text-xs"
                  icon="pi pi-refresh"
                  severity="danger"
                  onClick={onResetFilter}
                  size="small"
                  disabled={isRefetchingListBuku}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="max-h-[550px] overflow-y-auto bg-white rounded-xl w-full">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-[#0D48A0] text-white text-xs">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      No.
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      ID Buku
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      Katagori
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      Nama Buku
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      Harga
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      Stok
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      Penerbit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!dataListBuku ||
                  dataListBuku?.success === false ||
                  dataListBuku?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src="/UNIBOOKSTORE/table-no-entry-data.svg"
                            alt="data tidak ditemukan"
                            className="w-48 h-48 mb-4"
                          />
                          <span className="text-sm">
                            <b>Belum ada data Buku.</b> <br />
                            Silakan menambahkan data Buku.
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    dataListBuku?.data?.map((item: any, idx: any) => (
                      <tr key={idx} className="border-t text-xs">
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {item.kode_buku}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {item.kategori}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {item.nama_buku}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-right">
                          {renderDataHarga(item)}
                        </td>
                        <td className="px-4 py-2 border border-gray-300 text-center">
                          {item.stok}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {item.nama_penerbit}
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
                Item dari total <b>{dataListBuku?.total}</b>
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
              <span className="mr-2">dari {dataListBuku?.to}</span>

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
    </>
  );
};

export default HomePage;
