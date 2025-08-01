import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosServices } from "../../../../../services/axios";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

const AddBuku = () => {
  const toastRef = useRef<Toast>(null);
  const [loadingData, setLoadingData] = useState(false);
  const location = useLocation();
  const dataBalikan = location?.state;
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    kategori: Yup.string().required("Kategori harus diisi"),
    nama_buku: Yup.string().required("Nama Buku harus diisi"),
    harga: Yup.number()
      .required("Harga harus diisi")
      .moreThan(0, "Harga Buku tidak boleh Rp. 0"),
    stok: Yup.number()
      .required("Stok harus diisi")
      .moreThan(0, "Stok Buku tidak boleh diisi 0"),
    penerbit_id: Yup.string().required("Penerbit harus diisi"),
  });

  const initialValues = {
    kategori: "",
    nama_buku: "",
    harga: 0,
    stok: 0,
    penerbit_id: "",
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setLoadingData(true);
    try {
      const response = await axiosServices().post(
        "/api/v1/unibookstore/buku/create",
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
          navigate("/admin/kelola-buku", { replace: true });
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
        {({ errors, touched, isSubmitting, setFieldValue, values }) => {
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
                      Tambah data buku
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-4">
                    <div>
                      <label className="font-bold">Katagori</label>
                      <Field
                        filter
                        as={Dropdown}
                        id="kategori"
                        name="kategori"
                        options={dataBalikan?.balikanDataKategori}
                        className={`w-full p-inputtext-sm text-xs ${
                          errors.kategori && touched.kategori ? "p-invalid" : ""
                        }`}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Pilih salah satu"
                      />
                      <ErrorMessage
                        name="kategori"
                        component="div"
                        className="p-error w-full p-inputtext-sm text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold">Nama Buku</label>

                      <Field
                        as={InputText}
                        id="nama_buku"
                        name="nama_buku"
                        className={`w-full p-inputtext-sm text-xs ${
                          errors.nama_buku && touched.nama_buku
                            ? "p-invalid"
                            : ""
                        }`}
                        placeholder="Contoh: Harry Potter dan Batu Bertuah"
                      />
                      <ErrorMessage
                        name="nama_buku"
                        component="div"
                        className="p-error w-full p-inputtext-sm text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold">Harga Buku </label>
                      <div className="flex">
                        <div className="p-inputgroup p-inputtext-sm text-xs">
                          <span className="p-inputgroup-addon">Rp.</span>
                          <InputNumber
                            locale="id-ID"
                            id="harga"
                            name="harga"
                            className={`w-full p-inputtext-sm text-xs ${
                              errors.harga && touched.harga ? "p-invalid" : ""
                            }`}
                            value={values.harga}
                            placeholder="Contoh: 500.000"
                            onValueChange={(e) =>
                              setFieldValue("harga", e.value)
                            }
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="harga"
                        component="div"
                        className="p-error w-full p-inputtext-sm text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold">Stok Buku</label>

                      <InputNumber
                        locale="id-ID"
                        id="stok"
                        name="stok"
                        className={`w-full p-inputtext-sm text-xs ${
                          errors.stok && touched.stok ? "p-invalid" : ""
                        }`}
                        value={values.stok}
                        placeholder="Contoh: 500"
                        onValueChange={(e) => setFieldValue("stok", e.value)}
                      />
                      <ErrorMessage
                        name="stok"
                        component="div"
                        className="p-error w-full p-inputtext-sm text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold">Penerbit</label>
                      <Field
                        filter
                        as={Dropdown}
                        id="penerbit_id"
                        name="penerbit_id"
                        options={dataBalikan?.balikanDataPenerbit}
                        className={`w-full p-inputtext-sm text-xs ${
                          errors.penerbit_id && touched.penerbit_id
                            ? "p-invalid"
                            : ""
                        }`}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Pilih salah satu"
                      />
                      <ErrorMessage
                        name="penerbit_id"
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
                        navigate("/admin/kelola-buku", {
                          replace: true,
                        })
                      }
                      outlined
                    />
                    <Button
                      className="p-inputtext-sm text-xs"
                      type="submit"
                      label="Simpan"
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

export default AddBuku;
