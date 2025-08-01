import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import ModalInvalidId from "../../../../../component/modal/ModalInvalidId";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

const DetailBuku = () => {
  const toastRef = useRef<Toast>(null);
  const [showModal, setShowModal] = useState(false);
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
    id: dataBalikan?.detailData?.id || "",
    uuid: dataBalikan?.detailData?.uuid || "",
    kode_buku: dataBalikan?.detailData?.kode_buku || "",
    kategori: dataBalikan?.detailData?.kategori || "",
    nama_buku: dataBalikan?.detailData?.nama_buku || "",
    harga: dataBalikan?.detailData?.harga || "",
    stok: dataBalikan?.detailData?.stok || "",
    penerbit_id: dataBalikan?.detailData?.penerbit_id || "",
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
        {({ errors, touched, setFieldValue, values }) => {
          return (
            <Form>
              <Toast ref={toastRef} />
              {showModal && <ModalInvalidId />}
              <div className="p-4">
                <div className="max-w-4xl mx-auto bg-[#FFFFFF] rounded-xl">
                  <div className="flex justify-between items-center p-3 border-b-2 border-[#E3E7ED] gap-2">
                    <div className="text-sm md:text-lg font-semibold">
                      Detail data buku
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-4">
                    <div className="grid grid-cols-2 items-center gap-2">
                      <div>
                        <label className="font-bold">UUID</label>

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
                        <label className="font-bold">Kode Buku</label>

                        <Field
                          as={InputText}
                          id="kode_buku"
                          name="kode_buku"
                          className={`w-full p-inputtext-sm text-xs ${
                            errors.kode_buku && touched.kode_buku
                              ? "p-invalid"
                              : ""
                          }`}
                          placeholder="-"
                          disabled
                        />
                        <ErrorMessage
                          name="kode_buku"
                          component="div"
                          className="p-error w-full p-inputtext-sm text-xs"
                        />
                      </div>
                    </div>
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
                        disabled
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
                        disabled
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
                            disabled
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
                        disabled
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
                        disabled
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

export default DetailBuku;
