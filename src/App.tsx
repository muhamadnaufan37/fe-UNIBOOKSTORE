import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import NotFoundPage from "./page/error/404";
import HomePage from "./page/beranda";
import { AnimatePresence } from "framer-motion";
import AdminPage from "./page/beranda/admin";
import KelolaDataBuku from "./page/beranda/admin/buku";
import KelolaDataPenerbit from "./page/beranda/admin/penerbit";
import UpdatePenerbit from "./page/beranda/admin/penerbit/page/UpdatePenerbit";
import DetailPenerbit from "./page/beranda/admin/penerbit/page/DetailPenerbit";
import AddPenerbit from "./page/beranda/admin/penerbit/page/CreatePenerbit";
import AddBuku from "./page/beranda/admin/buku/page/CreateBuku";
import DetailBuku from "./page/beranda/admin/buku/page/DetailBuku";
import UpdateBuku from "./page/beranda/admin/buku/page/UpdateBuku";
import PengadaanBuku from "./page/beranda/pengadaan";
import KelolaDataKategori from "./page/beranda/admin/buku/kategori";
import AddKategoriBuku from "./page/beranda/admin/buku/kategori/page/CreateKategoriBuku";
import DetailKategoriBuku from "./page/beranda/admin/buku/kategori/page/DetailKategoriBuku";
import UpdateKategoriBuku from "./page/beranda/admin/buku/kategori/page/UpdatePenerbit";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/kelola-buku" element={<KelolaDataBuku />} />
          <Route path="/admin/kelola-buku/add-buku" element={<AddBuku />} />
          <Route
            path="/admin/kelola-buku/detail-buku"
            element={<DetailBuku />}
          />
          <Route
            path="/admin/kelola-buku/update-buku"
            element={<UpdateBuku />}
          />

          <Route
            path="/admin/kelola-penerbit"
            element={<KelolaDataPenerbit />}
          />
          <Route
            path="/admin/kelola-penerbit/add-penerbit"
            element={<AddPenerbit />}
          />
          <Route
            path="/admin/kelola-penerbit/detail-penerbit"
            element={<DetailPenerbit />}
          />
          <Route
            path="/admin/kelola-penerbit/update-penerbit"
            element={<UpdatePenerbit />}
          />

          <Route
            path="/admin/kelola-kategori-buku"
            element={<KelolaDataKategori />}
          />
          <Route
            path="/admin/kelola-kategori-buku/add-kategori"
            element={<AddKategoriBuku />}
          />
          <Route
            path="/admin/kelola-kategori-buku/detail-kategori"
            element={<DetailKategoriBuku />}
          />
          <Route
            path="/admin/kelola-kategori-buku/update-kategori"
            element={<UpdateKategoriBuku />}
          />

          <Route path="/pengadaan" element={<PengadaanBuku />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
