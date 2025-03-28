import { HiOutlineDotsVertical, HiSearch } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Input from "../../Input";
import Spinner from "../../Spinner";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useState } from "react";
import { format } from "date-fns";
export default function CategoriesTableUi({
  tableHeader,
  data,
  loading,
  openModal,
  paginations,
  handleDelete,
  query,
  setQuery,
}) {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const [activeDropdown, setActiveDropdown] = useState(null);
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  const handleChangePagination = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  const handleNextPage = () => {
    setQuery({ ...query, page: paginations.currentPage + 1 });
  };
  const handlePrevPage = () => {
    setQuery({ ...query, page: paginations.currentPage - 1 });
  };
  const handleSort = (e) => {
    setQuery({ ...query, sort: e.target.value });
  };
  const handleSearch = (e) => {
    setQuery({ ...query, search: e.target.value });
  };
  return (
    <>
      {!data?.length && !loading ? (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <div className="p-10 rounded-full bg-primary-300">
              <IoBagHandleOutline color="#fff" size={60} />
            </div>
            <span className="text-xl font-medium text-primary-800">
              No Categories Yet?
            </span>
            <p className="text-sm text-primary-400">
              Add categories to your store and start selling to see orders here.
            </p>
            <button
              onClick={openModal}
              className="p-3 text-sm rounded-md bg-neutral-800 text-neutral-50"
            >
              Adding new category
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Header */}
          <div className="w-full p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-primary-800">
                Categories Items
              </p>
              <div className="flex items-center gap-2">
                <Input
                  textSize="text-xs"
                  placeholder={"Search category..."}
                  onChange={handleSearch}
                  icon={<HiSearch />}
                />
                <select
                  className="py-[7px] px-2 text-xs border rounded-lg outline-none border-primary-400 text-primary-800"
                  id="sort"
                  name="sort"
                  onChange={handleSort}
                >
                  <option value="title">Sort by name(A-Z)</option>
                  <option value="-title">Sort by name(Z-A)</option>
                </select>
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="flex-grow overflow-auto">
            <table className="w-full text-left border table-auto min-w-max text-slate-800 border-b-primary-300">
              <thead>
                <tr className="uppercase border-b text-primary-600 border-primary-300 bg-primary-50">
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
                  {data?.map((data) => (
                    <tr
                      key={data._id}
                      className="transition-colors hover:bg-primary-100"
                    >
                      <td className="p-4">
                        <p className="text-xs font-medium text-slate-900">
                          {truncateText(data._id, 40)}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-xs font-medium text-slate-900">
                          {truncateText(data.title, 25)}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-xs">
                          {format(data.createdAt, "dd/MM/yyyy")}
                        </p>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => toggleDropdown(data._id)}
                          className="relative p-2 transition-colors rounded-full hover:bg-primary-200"
                        >
                          <HiOutlineDotsVertical />
                        </button>
                        {activeDropdown === data._id && (
                          <div className="absolute z-10 p-2 mt-1 transition-colors bg-white border rounded shadow-sm right-8">
                            <button className="flex items-center w-full gap-2 py-2 pl-1 pr-4 text-sm text-left text-primary-900 hover:bg-primary-100">
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
          {/*  Footer */}
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
                <option value="">-- Limit the categories --</option>
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
                onClick={handlePrevPage}
                disabled={paginations.currentPage === 1}
                className="p-2 rounded-full hover:bg-primary-200 disabled:cursor-not-allowed"
              >
                <MdKeyboardArrowLeft />
              </button>
              <span>{paginations.currentPage}</span>
              <button
                onClick={handleNextPage}
                disabled={paginations.currentPage === paginations.totalPages}
                className="p-2 rounded-full hover:bg-primary-200 disabled:cursor-not-allowed"
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
