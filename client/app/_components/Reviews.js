import React from "react";
import StarRating from "./StarRating";

export default function Reviews() {
  return (
    <>
      <h4 className="text-xl font-semibold md:text-2xl text-primary-900">
        Customer Reviews
      </h4>
      <form className="flex items-center gap-1 mt-3 md:gap-5 md:mt-6">
        <input
          className="w-full p-2 text-xs border rounded-lg outline-none md:text-sm border-primary-400 text-primary-700 placeholder:text-primary-400 placeholder:text-xs "
          type="text"
          placeholder="What do you think?"
        />
        <button className="px-3 py-2 text-xs rounded-full md:px-6 md:text-sm text-primary-50 bg-primary-900 text-nowrap">
          Write Review
        </button>
      </form>
      <div className="mt-6">
        <span className="text-base font-semibold md:text-xl text-primary-900 ">
          11 Reviews
        </span>
        {/*  Comments  */}
        <div className="flex items-center gap-5 mt-6 md:gap-10">
          <img
            src={
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            className="w-12 h-12 rounded-full md:w-14 md:h-14"
          />
          <div className="flex flex-col gap-1 pb-4 border-b border-b-primary-300">
            <h6 className="text-sm font-semibold md:text-base text-primary-900">
              Sofia Harvetz
            </h6>
            <StarRating start={4} />
            <p className="md:text-xs text-[10px] text-primary-400">
              I bought it 3 weeks ago and now come back just to say “Awesome
              Product”. I really enjoy it. At vero eos et accusamus et iusto
              odio dignissimos ducimus qui blanditiis praesentium voluptatum
              deleniti atque corrupt et quas molestias excepturi sint non
              provident.
            </p>
          </div>
        </div>

        <button className="block px-6 py-2 mx-auto mt-6 text-xs transition-colors border rounded-full md:text-sm border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-primary-50">
          Load more
        </button>
      </div>
    </>
  );
}
