import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { sizeIconPrimary } from "@/app/constants/icons";
import {
  FaClipboardList,
  FaComments,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";

const data = [
  { name: "Sept 10", sales: 90000 },
  { name: "Sept 11", sales: 75000 },
  { name: "Sept 12", sales: 95000 },
  { name: "Sept 13", sales: 70000 },
  { name: "Sept 14", sales: 85000 },
  { name: "Sept 15", sales: 80000 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-base font-medium">Blogs Summary</h1>
      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* TOTAL PRODUCTS */}
        <section className="p-3 bg-white rounded-md">
          <div className="flex flex-col gap-3 ">
            <span className="p-2 rounded-lg bg-primary-50 w-fit">
              <FaClipboardList size={sizeIconPrimary} color="#5570F1" />
            </span>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-primary-400">Total Products</h3>
                <p className="text-xl font-bold text-primary-900">30</p>
              </div>
              <div className="flex flex-col">
                <p className="text-primary-400">Average Ratings</p>
                <p className="text-xl font-bold text-primary-9000">30</p>
              </div>
            </div>
          </div>
        </section>
        {/* TOTAL CUSTOMERS */}
        <section className="p-3 bg-white rounded-md">
          <div className="flex flex-col gap-3 ">
            <span className="p-2 rounded-lg bg-primary-50 w-fit">
              <FaUsers size={sizeIconPrimary} color="#10B981" />
            </span>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-primary-400">Customers</h3>
                <p className="text-xl font-bold text-primary-900">30</p>
              </div>
              <div className="flex flex-col">
                <p className="text-primary-400">Active</p>
                <p className="text-xl font-bold text-primary-9000">30</p>
              </div>
            </div>
          </div>
        </section>
        {/* TOTAL BLOG */}
        <section className="p-3 bg-white rounded-md">
          <div className="flex flex-col gap-3 ">
            <span className="p-2 rounded-lg bg-primary-50 w-fit">
              <FaComments size={sizeIconPrimary} color="#F59E0B" />
            </span>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-primary-400">Total Blogs</h3>
                <p className="text-xl font-bold text-primary-900">30</p>
              </div>
              <div className="flex flex-col">
                <p className="text-primary-400">Total Views</p>
                <p className="text-xl font-bold text-primary-9000">30</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2">
        {/* TOTAL ORDERS */}
        <section className="p-3 bg-white rounded-md">
          <div className="flex flex-col gap-3 ">
            <span className="p-2 rounded-lg bg-primary-50 w-fit">
              <FaShoppingBag size={sizeIconPrimary} color="#5570F1" />
            </span>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-primary-400">Total Orders</h3>
                <p className="text-xl font-bold text-primary-900">30</p>
              </div>
              <div className="flex flex-col">
                <p className="text-primary-400">Average Ratings</p>
                <p className="text-xl font-bold text-primary-9000">30</p>
              </div>
            </div>
          </div>
        </section>
        {/* TOTAL CATEGORIES */}
        <section className="p-3 bg-white rounded-md">
          <div className="flex flex-col gap-3 ">
            <span className="p-2 rounded-lg bg-primary-50 w-fit">
              <BiSolidCategoryAlt size={sizeIconPrimary} color="#10B981" />
            </span>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-primary-400">Total Categories</h3>
                <p className="text-xl font-bold text-primary-900">30</p>
              </div>
              <div className="flex flex-col">
                <p className="text-primary-400">Active</p>
                <p className="text-xl font-bold text-primary-9000">30</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sales Chart */}
      <div className="p-6 mt-6 bg-white shadow-md rounded-xl">
        <h3 className="mb-4 text-lg font-semibold">Summary Sales</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            width={620}
            height={300}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
