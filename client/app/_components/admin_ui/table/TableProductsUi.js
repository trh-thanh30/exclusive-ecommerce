import { HiOutlineDotsVertical, HiSearch } from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Input from "../../Input";
import Spinner from "../../Spinner";
import { truncateText } from "@/app/constants/truncateText";
import { useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { formatDate } from "date-fns";
export default function TableProductUi({
  tableHeader,
  data,
  loading,
  openModal,
  handleDelete,
  paginations,
  setQuery,
  query,
}) {
  const [edit, setEdit] = useState(null);

  const toggleEdit = (id) => {
    setEdit(edit === id ? null : id);
  };

  const handleChangePagination = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  const handlePrev = () => {
    setQuery({ ...query, page: parseInt(query.page) - 1 });
  };
  const handleNext = () => {
    setQuery({ ...query, page: parseInt(query.page) + 1 });
  };
  const handleChangeSort = (e) => {
    setQuery({ ...query, sort: e.target.value });
  };
  const handleSearch = (e) => {
    setQuery({ ...query, search: e.target.value });
  };
  console.log(data);

  return (
    <>
      {!data.length && !loading ? (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <div className="p-10 rounded-full bg-primary-300">
              <IoBagHandleOutline color="#fff" size={60} />
            </div>
            <span className="text-xl font-medium text-primary-800">
              No Products Yet?
            </span>
            <p className="text-sm text-primary-400">
              Add products to your store and start selling to see orders here.
            </p>
            <button
              onClick={openModal}
              className="p-3 text-sm rounded-md bg-neutral-800 text-neutral-50"
            >
              Adding new products
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-primary-800">
                Products Items
              </p>
              <div className="flex items-center gap-2">
                <Input
                  textSize="text-xs"
                  placeholder={"Search product..."}
                  name={"search"}
                  id={"search"}
                  onChange={handleSearch}
                  icon={<HiSearch />}
                />
                <select
                  className="py-[7px] px-2 text-xs border rounded-lg outline-none border-primary-400 text-primary-800"
                  id="sort"
                  name="sort"
                  onChange={handleChangeSort}
                >
                  <option value="title">Sort by name(A-Z)</option>
                  <option value="-title">Sort by name(Z-A)</option>
                  <option value="price">Sort by price(1-10)</option>
                  <option value="-price">Sort by price(10-1)</option>
                  <option value="createdAt">Sort by date(newest)</option>
                  <option value="-createdAt">Sort by date(oldest)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-auto">
            <table className="w-full text-left border table-auto min-w-max text-slate-800 border-b-primary-300">
              <thead>
                <tr className="uppercase border-b text-primary-600 border-primary-300 bg-primary-50 ">
                  {tableHeader.map((item) => (
                    <th key={item.name} className="p-4">
                      <p className="text-sm font-medium text-primary-400">
                        {item.name}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              {loading ? (
                <tbody className="h-screen">
                  <tr>
                    <td colSpan={tableHeader.length}>
                      <div className="w-full">
                        <Spinner />
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="max-h-screen">
                  {data.map((data) => (
                    <tr
                      key={data._id}
                      className="transition-colors hover:bg-primary-100"
                    >
                      <td className="p-4">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={data.images[0]}
                          alt=""
                        />
                      </td>
                      <td className="p-4">
                        <p className="text-xs font-medium text-slate-900">
                          {truncateText(data.title, 25)}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-xs">{data?.category?.title}</p>
                      </td>
                      <td className="p-4">
                        <p className="flex items-center text-xs">
                          {data.price}
                          <BsCurrencyDollar />
                        </p>
                      </td>

                      <td className="p-4">
                        <p className="text-xs">{data.quantity}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-xs">HIHI</p>
                      </td>
                      <td className="p-4">
                        <p className="flex items-center text-xs">
                          {data.totalRating}
                          <MdOutlineStarPurple500 color="#facc15" />
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-xs">
                          {formatDate(data.createdAt, "MM/dd/yyyy")}
                        </p>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => toggleEdit(data._id)}
                          className="p-2 transition-colors rounded-full hover:bg-primary-200"
                        >
                          <HiOutlineDotsVertical />
                        </button>
                        {edit === data._id && (
                          <div className="absolute z-10 p-2 mt-1 transition-colors bg-white border rounded shadow-sm right-8">
                            <button
                              onClick={() => {}}
                              className="flex items-center w-full gap-2 py-2 pl-1 pr-4 text-sm text-left text-primary-900 hover:bg-primary-100"
                            >
                              <CiEdit /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(data._id)}
                              className="flex items-center w-full gap-2 py-2 pl-1 pr-4 text-sm text-error-500 hover:bg-error-50"
                            >
                              <CiTrash /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          <div className="flex items-center justify-between w-full p-4">
            {/* LIMIT */}
            <div className="flex items-center gap-1">
              <p className="text-xs text-primary-800">Limit:</p>
              <select
                className="p-1 text-xs border rounded-lg outline-none border-primary-400 text-primary-800"
                id="limit"
                name="limit"
                onChange={handleChangePagination}
              >
                <option value="">-- Limit the products --</option>
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  )
                )}
              </select>
            </div>
            {/* PAGINATION */}
            <div className="flex items-center gap-1 text-xs text-primary-800">
              <p className="text-xs text-primary-800">
                {paginations.currentPage} of {paginations.totalPages} pages:
              </p>
              <select
                className="p-1 text-xs border rounded-lg outline-none border-primary-400 text-primary-800"
                id="page"
                name="page"
                onChange={handleChangePagination}
              >
                {Array.from(
                  { length: paginations.totalPages },
                  (_, index) => index + 1
                ).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>

              <button
                onClick={handlePrev}
                className="p-2 rounded-full hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={paginations.currentPage === 1}
              >
                <MdKeyboardArrowLeft />
              </button>
              <span>{paginations.currentPage}</span>
              <button
                onClick={handleNext}
                disabled={paginations.currentPage === paginations.totalPages}
                className="p-2 rounded-full hover:bg-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
