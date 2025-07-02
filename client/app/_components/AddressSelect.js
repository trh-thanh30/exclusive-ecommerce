"use client";
import { useEffect, useState } from "react";
import { ADDRESS_ENDPOINT } from "../constants/api";

export default function AddressSelect({
  errorForm,
  haveBorder,
  handleChangeAddressCustom,
  formData,
  mode,
}) {
  console.log(formData);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingCommunes, setLoadingCommunes] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  useEffect(() => {
    const getProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const res = await fetch(
          "https://toinh-api-tinh-thanh.onrender.com/province"
        );
        const data = await res.json();
        setLoadingProvinces(false);
        setProvinces(data);
      } catch (error) {
        setLoadingProvinces(false);
        console.error("Error fetching provinces:", error);
      }
    };
    getProvinces();
  }, []);
  useEffect(() => {
    if (!provinceId) return;
    const getDistricts = async () => {
      setLoadingDistricts(true);
      try {
        const res = await fetch(
          `https://toinh-api-tinh-thanh.onrender.com/district?idProvince=${provinceId}`
        );
        const data = await res.json();
        setDistricts(data);
        setLoadingDistricts(false);
      } catch (error) {
        setLoadingDistricts(false);
        console.error("Error fetching districts:", error);
      }
    };
    getDistricts();
  }, [provinceId]);
  useEffect(() => {
    if (!districtId) return;
    const getCommunes = async () => {
      setLoadingCommunes(true);
      try {
        const res = await fetch(
          `https://toinh-api-tinh-thanh.onrender.com/commune?idDistrict=${districtId}`
        );
        const data = await res.json();
        setLoadingCommunes(false);
        setCommunes(data);
      } catch (error) {
        setLoadingCommunes(false);
        console.error("Error fetching communes:", error);
      }
    };
    getCommunes();
  }, [districtId]);

  return (
    <div
      className={`px-3 py-5 ${
        haveBorder && "border"
      } rounded-md lg:px-6 xl:px-10 md:py-6 ${
        errorForm?.failAddress
          ? "bg-error-50 border-error-500"
          : "border-primary-400"
      }`}>
      <h2 className="text-xl font-medium">Shipping Address</h2>
      <div className="flex gap-3">
        <div className="w-full">
          <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
            Province *
          </label>
          <select
            className="w-full px-3 py-2 text-xs border rounded-md outline-none text-primary-900 border-primary-200"
            name="province"
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedProvince = provinces.find(
                (p) => p.idProvince === selectedId
              );
              setProvinceId(selectedId);
              handleChangeAddressCustom(
                "province",
                selectedProvince?.name || ""
              );
            }}>
            {mode === "edit" && <option>{formData.province}</option>}
            {mode !== "edit" && (
              <option disabled selected>
                ---- Province ----
              </option>
            )}
            {loadingProvinces ? (
              <option disabled>Loading...</option>
            ) : (
              provinces.map((province) => (
                <option key={province.name} value={province.idProvince}>
                  {province.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="w-full">
          <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
            District *
          </label>

          <select
            className="w-full px-3 py-2 text-xs border rounded-md outline-none text-primary-900 border-primary-200"
            name="district"
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedDistrict = districts.find(
                (d) => d.idDistrict === selectedId
              );
              setDistrictId(selectedId);
              handleChangeAddressCustom(
                "district",
                selectedDistrict?.name || ""
              );
            }}>
            {mode === "edit" && <option>{formData.district}</option>}
            {mode !== "edit" && (
              <option disabled selected>
                ---- District ----
              </option>
            )}
            {loadingDistricts ? (
              <option disabled>Loading...</option>
            ) : (
              districts.map((district) => (
                <option key={district.name} value={district.idDistrict}>
                  {district.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <label className="block mt-4 mb-2 text-sm font-medium text-gray-600">
        Commune *
      </label>
      <select
        className="w-full px-3 py-2 text-xs border rounded-md outline-none text-primary-900 border-primary-200"
        onChange={(e) => {
          handleChangeAddressCustom("commune", e.target.value);
        }}
        name="commune">
        {mode === "edit" && <option>{formData.commune}</option>}
        {mode !== "edit" && (
          <option disabled selected>
            ---- Commune ----
          </option>
        )}
        {loadingCommunes ? (
          <option disabled>Loading...</option>
        ) : (
          communes.map((commune) => (
            <option key={commune.name} value={commune.name}>
              {commune.name}
            </option>
          ))
        )}
      </select>

      <label className="block mt-4 mb-2 text-sm font-medium text-gray-600">
        Full address
      </label>
      <textarea
        name="detailAddress"
        onChange={(e) =>
          handleChangeAddressCustom("detailAddress", e.target.value)
        }
        placeholder="Please provide your full address for delivery"
        className="w-full px-3 py-2 text-xs border rounded-md outline-none resize-none text-primary-900 border-primary-200"
        rows={3}
        defaultValue={mode === "edit" ? formData.detailAddress : ""}
      />
    </div>
  );
}
