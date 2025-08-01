import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { axiosServices } from "../../../../../services/axios";
import { InputText } from "primereact/inputtext";

const AddPenerbit = () => {
  const toastRef = useRef<Toast>(null);
  const [loadingData, setLoadingData] = useState(false);
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
    nama: "",
    alamat: "",
    kota: "",
    telepon: "",
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setLoadingData(true);
    try {
      const response = await axiosServices().post(
        "/api/v1/unibookstore/penerbit/create",
        values
      );
      const responseDatamessage = response.data;

      if (responseDatamessage.success === true) {
        toastRef.current?.show({
          severity: "success",
          summary: "Berhasil",
          detail: responseDatamessage.message,
          life: 2000, // tampilkan 2 detik
        });

        setTimeout(() => {
          navigate("/admin/kelola-penerbit", { replace: true });
        }, 2000);
      } else {
        setLoadingData(false);
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: responseDatamessage.message || "Terjadi kesalahan",
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
          setLoadingData(false);
          toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: data.message || "Terjadi kesalahan",
            life: 3000,
          });
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ errors, touched, isSubmitting }) => {
          return (
            <Form>
              <Toast ref={toastRef} />
              <div className="p-4">
                <div className="max-w-4xl mx-auto bg-[#FFFFFF] rounded-xl">
                  {loadingData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
                      <div className="flex flex-col items-center space-y-4">
                        <svg
                          className="animate-spin h-10 w-10 text-blue-600"
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
                        <span className="text-sm text-gray-700">Memuat...</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center p-3 border-b-2 border-[#E3E7ED] gap-2">
                    <div className="text-sm md:text-lg font-semibold">
                      Tambah data Penerbit
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-4">
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
                    <Button
                      className="p-inputtext-sm text-xs"
                      type="submit"
                      label="Tambah"
                      severity="info"
                      size="small"
                      disabled={isSubmitting}
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

export default AddPenerbit;
