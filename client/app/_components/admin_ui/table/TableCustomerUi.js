import { HiOutlineDotsVertical, HiSearch } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Input from "../../Input";
import Spinner from "../../Spinner";
export default function TableCustomerUi({
  tableHeader,
  data,
  loading,
  openModal,
  paginations,
}) {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <>
      {/* Header */}
      <div className="w-full p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-primary-800">
            Customer Manager
          </p>
          <div className="flex items-center gap-2">
            <Input
              textSize="text-xs"
              placeholder={"Search product..."}
              icon={<HiSearch />}
            />
            <select
              className="py-[7px] px-2 text-xs border rounded-lg outline-none border-primary-400 text-primary-800"
              id="fillter"
            >
              <option value="a-z">Sort by name(A-Z)</option>
              <option value="z-a">Sort by name(Z-A)</option>
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

          <tbody>
            {loading ? (
              <td colSpan={tableHeader.length}>
                <div className="w-full">
                  <Spinner />
                </div>
              </td>
            ) : (
              data?.map((data) => (
                <tr
                  key={data.id}
                  className="transition-colors hover:bg-primary-100"
                >
                  <td className="p-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={data.avatar}
                      alt=""
                    />
                  </td>
                  <td className="p-4">
                    <p className="text-xs font-medium text-slate-900">
                      {truncateText(data.username, 25)}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs"> {truncateText(data.email, 30)}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs ">{data.role_name}</p>
                  </td>

                  <td className="p-4">
                    <p className="text-xs">
                      {data.is_blocked === true ? (
                        <p className="p-2 rounded-md bg-red-50 text-error-500 w-fit">
                          Blocked
                        </p>
                      ) : (
                        <p className="p-2 rounded-md text-success-500 bg-success-50 w-fit">
                          Not Blocked
                        </p>
                      )}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs">
                      {data.is_active === false ? (
                        <p className="p-2 rounded-md bg-red-50 text-error-500 w-fit">
                          Not Active
                        </p>
                      ) : (
                        <p className="p-2 rounded-md text-success-500 bg-success-50 w-fit">
                          Active
                        </p>
                      )}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs">{data.createdAt}</p>
                  </td>
                  <td className="p-2">
                    <button className="p-2 transition-colors rounded-full hover:bg-primary-200">
                      <HiOutlineDotsVertical />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
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
          >
            {Array.from({ length: 20 }, (_, index) => index + 1).map(
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
            id="limit"
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

          <button className="p-2 rounded-full hover:bg-primary-200">
            <MdKeyboardArrowLeft />
          </button>
          <span>{paginations.currentPage}</span>
          <button className="p-2 rounded-full hover:bg-primary-200">
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}
