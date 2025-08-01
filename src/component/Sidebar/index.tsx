import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface OwnershipSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  paramsUrl: any;
  layananUrl: String;
}

const OwnershipSidebar: React.FC<OwnershipSidebarProps> = ({
  isOpen,
  onClose,
  paramsUrl,
  layananUrl,
}) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-t-2xl bg-[#EFF2F3] p-4 shadow-lg"
          >
            <div className="h-1 w-16 bg-green-600 mx-auto rounded-full mb-4"></div>
            <h3 className="text-center font-semibold text-lg mb-4">
              Pilih Jenis Kepemilikan
            </h3>

            <div className="flex justify-between gap-4 mb-6">
              <div
                className="flex-1 border p-4 rounded-xl flex flex-col items-center bg-white cursor-pointer"
                onClick={() =>
                  navigate(
                    `/${layananUrl}/reservasi/milik-sendiri?${paramsUrl.toString()}`,
                    {
                      replace: true,
                    }
                  )
                }
              >
                <img
                  src="/sapawarga/img-milik-sendiri.svg"
                  alt="Milik Sendiri"
                  className="w-16 h-16 mb-2 rounded-full object-contain"
                />
                <p className="text-center text-sm font-medium">Milik Sendiri</p>
              </div>

              <div
                className="flex-1 border p-4 rounded-xl flex flex-col items-center bg-white cursor-pointer"
                onClick={() =>
                  navigate(
                    `/${layananUrl}/reservasi/milik-orang-lain?${paramsUrl.toString()}`,
                    {
                      replace: true,
                    }
                  )
                }
              >
                <img
                  src="/sapawarga/img-milik-org-lain.svg"
                  alt="Milik Orang Lain"
                  className="w-16 h-16 mb-2 rounded-full object-contain"
                />
                <p className="text-center text-sm font-medium">
                  Milik Orang Lain
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Tutup
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OwnershipSidebar;
