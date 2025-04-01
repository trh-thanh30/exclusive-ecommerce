import React from "react";
import StarRating from "./StarRating";
import { useState } from "react";
import toast from "react-hot-toast";
import { PRODUCTS_ENDPOINT } from "../constants/api";
import Image from "next/image";
import Star from "./Star";

export default function Reviews({ productId, ratings, fetchProduct }) {
  const [formRating, setFormRating] = useState({});
  const [star, setStar] = useState(null);
  const [hoverStar, setHoverStar] = useState(null);
  const handleChange = (e) => {
    setFormRating({ ...formRating, [e.target.name]: e.target.value });
  };
  const dataSend = { ...formRating, star, productId };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${PRODUCTS_ENDPOINT}/rating`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }
      toast.success(data.message);
      fetchProduct();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <h4 className="text-xl font-semibold md:text-2xl text-primary-900">
        Customer Reviews
      </h4>
      <form
        onSubmit={handleSubmitRating}
        className="flex flex-col mt-3 md:gap-5 md:mt-6"
      >
        <div className="flex items-center gap-1 ">
          <input
            className="w-full p-2 text-xs border rounded-lg outline-none md:text-sm border-primary-400 text-primary-700 placeholder:text-primary-400 placeholder:text-xs "
            type="text"
            name="comment"
            onChange={handleChange}
            placeholder="What do you think?"
          />
          <button
            type="submit"
            disabled={!star}
            className="px-3 py-2 text-xs rounded-md md:px-6 md:text-sm text-primary-50 bg-primary-900 text-nowrap hover:opacity-90 disabled:opacity-80"
          >
            Write Review
          </button>
        </div>
        <Star
          star={star}
          setStar={setStar}
          hoverStar={hoverStar}
          setHoverStar={setHoverStar}
        />
      </form>
      <div className="mt-6">
        {ratings.length > 0 && (
          <span className="text-base font-semibold md:text-xl text-primary-900 ">
            {ratings.length} {ratings.length === 1 ? "Review" : "Reviews"}
          </span>
        )}
        {ratings.length === 0 ? (
          <>
            <h4 className="text-base font-semibold text-center md:text-2xl text-primary-900">
              Product has no reviews
            </h4>
            <p className="mt-1 text-xs text-center text-primary-400">
              Be the first to write a review
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4 mt-6 md:gap-5">
              {ratings.map((rating, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <Image
                    alt={rating?.postedBy?.name}
                    loading="lazy"
                    width={40}
                    height={40}
                    src={rating?.postedBy?.avatar}
                    className="w-12 h-12 rounded-full md:w-16 md:h-16"
                  />
                  <div className="flex flex-col w-full gap-2 pb-4 border-b border-b-primary-300">
                    <h6 className="text-sm font-semibold md:text-base text-primary-900">
                      {rating?.postedBy?.username}
                    </h6>
                    <StarRating start={rating.star} />
                    <p className="md:text-xs text-[10px] text-primary-700">
                      {rating.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              disabled={ratings.length < 5}
              className="block px-6 py-2 mx-auto mt-6 text-xs transition-colors border rounded-full md:text-sm border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-primary-50 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              Load more
            </button>
          </>
        )}
      </div>
    </>
  );
}
