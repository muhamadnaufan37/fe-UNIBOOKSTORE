import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import ModalInvalidId from "../../../../../component/modal/ModalInvalidId";
import { InputText } from "primereact/inputtext";

const DetailPenerbit = () => {
  const toastRef = useRef<Toast>(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const dataBalikan = location?.state;
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    nama: Yup.string()
      .required("Nama Penerbit harus diisi")
      .min(3, "Nama Penerbit minimal 3 karakter")
      .max(100, "Nama Penerbit maksimal 100 karakter"),

    alamat: Yup.string()
      .required("Alamat Penerbit harus diisi")
      .min(5, "Alamat minimal 5 karakter"),

    kota: Yup.string()
      .required("Kota Penerbit harus diisi")
      .matches(/^[a-zA-Z\s]+$/, "Kota hanya boleh berisi huruf dan spasi"),

    telepon: Yup.string()
      .required("Kontak Penerbit harus diisi")
      .matches(/^[0-9+\s()-]+$/, "Nomor telepon tidak valid")
      .min(8, "Nomor telepon minimal 8 karakter")
      .max(20, "Nomor telepon maksimal 20 karakter"),
  });

  const initialValues = {
    id: dataBalikan?.detailData?.id || "",
    uuid: dataBalikan?.detailData?.uuid || "",
    kode_penerbit: dataBalikan?.detailData?.kode_penerbit || "",
    nama: dataBalikan?.detailData?.nama || "",
    alamat: dataBalikan?.detailData?.alamat || "",
    kota: dataBalikan?.detailData?.kota || "",
    telepon: dataBalikan?.detailData?.telepon || "",
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
                      Detail data Penerbit
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-4">
                    <div className="grid grid-cols-2 items-center gap-2">
                      <div>
                        <label htmlFor="uuid" className="font-bold">
                          UUID
                        </label>

                        <Field
                          as={InputText}
                          id="uuid"
                          name="uuid"
                          className={`w-full p-inputtext-sm text-xs ${
                            errors.uuid && touched.uuid ? "p-invalid" : ""
                          }`}
                          placeholder="-"
                          disabled
                        />
                        <ErrorMessage
                          name="uuid"
                          component="div"
                          className="p-error w-full p-inputtext-sm text-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor="kode_penerbit" className="font-bold">
                          Kode Penerbit
                        </label>

                        <Field
                          as={InputText}
                          id="kode_penerbit"
                          name="kode_penerbit"
                          className={`w-full p-inputtext-sm text-xs ${
                            errors.kode_penerbit && touched.kode_penerbit
                              ? "p-invalid"
                              : ""
                          }`}
                          placeholder="-"
                          disabled
                        />
                        <ErrorMessage
                          name="kode_penerbit"
                          component="div"
                          className="p-error w-full p-inputtext-sm text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="nama" className="font-bold">
                        Nama Penerbit
                      </label>

                      <Field
                        as={InputText}
                        id="nama"
                        name="nama"
                        className={`w-full p-inputtext-sm text-xs ${
                          errors.nama && touched.nama ? "p-invalid" : ""
                        }`}
                        placeholder="Contoh: Penerbit ABC"
                        disabled
                      />
                      <ErrorMessage
                        name="nama"
                        component="div"
                        className="p-error w-full p-inputtext-sm text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="alamat" className="font-bold">
                        Alamat Penerbit
                      </label>

                      <Field
                        as={InputText}
                        id="alamat"
                        name="alamat"
                        className={`w-full p-inputtext-sm text-xs ${
                          errors.alamat && touched.alamat ? "p-invalid" : ""
                        }`}
                        placeholder="Contoh: Jl. Contoh Alamat No. 123"
                        disabled
                      />
                      <ErrorMessage
                        name="alamat"
                        component="div"
                        className="p-error w-full p-inputtext-sm text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="kota" className="font-bold">
                        Kota Penerbit
                      </label>

                      <Field
                        as={InputText}
                        id="kota"
                        name="kota"
                        className={`w-full p-inputtext-sm text-xs ${
                          errors.kota && touched.kota ? "p-invalid" : ""
                        }`}
                        placeholder="Contoh: Bandung, Jakarta, Surabaya, dll."
                        disabled
                      />
                      <ErrorMessage
                        name="kota"
                        component="div"
                        className="p-error w-full p-inputtext-sm text-xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="telepon" className="font-bold">
                        Kontak Penerbit
                      </label>

                      <Field
                        as={InputText}
                        keyfilter="int"
                        id="telepon"
                        name="telepon"
                        className={`w-full p-inputtext-sm text-xs ${
                          errors.telepon && touched.telepon ? "p-invalid" : ""
                        }`}
                        placeholder="Contoh: 012345"
                        disabled
                      />
                      <ErrorMessage
                        name="telepon"
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
                        navigate("/admin/kelola-penerbit", {
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

export default DetailPenerbit;
