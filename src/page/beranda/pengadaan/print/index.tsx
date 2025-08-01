import { Ref, forwardRef } from "react";
import "./style.css";

interface props {
  dataLaporanPrint: any;
}

const ReportPengadaanPdf = forwardRef(
  ({ dataLaporanPrint }: props, ref: Ref<any>) => {
    return (
      <div
        className="grid grid-cols-1 print-container p-3 gap-2 h-full"
        ref={ref}
      >
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#0D48A0] text-white text-xs">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-center">
                No.
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Nama Buku
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
            {dataLaporanPrint?.map((item: any, idx: any) => (
              <tr key={idx} className="border-t text-xs">
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {idx + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.nama_buku}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {item.stok}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.nama_penerbit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default ReportPengadaanPdf;
