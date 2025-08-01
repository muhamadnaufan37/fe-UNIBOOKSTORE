import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import ModalInvalidId from "../../../../../../component/modal/ModalInvalidId";
import { InputText } from "primereact/inputtext";

const DetailKategoriBuku = () => {
  const toastRef = useRef<Toast>(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const dataBalikan = location?.state;
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    nama_kategori: Yup.string()
      .required("Kategori harus diisi")
      .min(3, "Kategori minimal 3 karakter")
      .max(100, "Kategori maksimal 100 karakter"),
  });

  const initialValues = {
    id: dataBalikan?.detailData?.id || "",
    nama_kategori: dataBalikan?.detailData?.nama_kategori || "",
  };

  const handleSubmit = async () => {};

  useEffect(() => {
    if (!dataBalikan || !dataBalikan?.detailData?.id) {
      setShowModal(true);
    }
  }, [dataBalikan]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <Toast ref={toastRef} />
              {showModal && <ModalInvalidId />}
              <div className="p-4">
                <div className="max-w-4xl mx-auto bg-[#FFFFFF] rounded-xl">
                  <div className="flex justify-between items-center p-3 border-b-2 border-[#E3E7ED] gap-2">
                    <div className="text-sm md:text-lg font-semibold">
                      Detail data kategori Buku
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-4">
                    <div>
                      <label htmlFor="nama" className="font-bold">
                        Nama kategori Buku
                      </label>

                      <Field
                        as={InputText}
                        id="nama_kategori"
                        name="nama_kategori"
                        className={`w-full p-inputtext-sm text-xs ${
                          errors.nama_kategori && touched.nama_kategori
                            ? "p-invalid"
                            : ""
                        }`}
                        placeholder="Contoh: Fiksi, Non-Fiksi, Pendidikan, Teknologi, dll."
                        disabled
                      />
                      <ErrorMessage
                        name="nama_kategori"
                        component="div"
                        className="p-error w-full p-inputtext-sm text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end items-center gap-3 p-3 bg-[#F5F5F5] rounded-b-lg">
                    <Button
                      className="p-inputtext-sm text-xs"
                      type="button"
                      label="Kembali"
                      severity="info"
                      size="small"
                      onClick={() =>
                        navigate("/admin/kelola-kategori-buku", {
                          replace: true,
                        })
                      }
                      outlined
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default DetailKategoriBuku;
