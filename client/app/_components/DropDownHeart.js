import Link from "next/link";
import React from "react";

export default function DropDownHeart() {
  return (
    <>
      <div className="flex items-center justify-between text-xs md:text-sm">
        <span className="">You have 2 items</span>
        <Link href={"/wishlist"} className="transition-colors text-primary-600 hover:underline hover:text-primary-900">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2 pb-1 mt-4 border-b md:pb-3 md:grid-cols-3 border-b-primary-200">
        <div className="flex flex-col gap-1">
          <img
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS8cCFuOp3iSjBmxKlKl6OOzw2ftc6ODXpmA3cXp-PHyQFLV7mJVZrOzknQNd0e93tLRHiEcN28-ZsK8PQ9Pv26YKaI4Okll6YW912_T-ysE_-_y7abga7bw"
            alt="Product"
            className="w-20 md:w-24"
          />
          <span className="text-xs text-nowrap text-primary-500">
            Casaliving Wood
          </span>
          <span className="text-xs md:text-sm text-primary-900">$329.00</span>
        </div>
        <div className="flex flex-col gap-1">
          <img
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS8cCFuOp3iSjBmxKlKl6OOzw2ftc6ODXpmA3cXp-PHyQFLV7mJVZrOzknQNd0e93tLRHiEcN28-ZsK8PQ9Pv26YKaI4Okll6YW912_T-ysE_-_y7abga7bw"
            alt="Product"
            className="w-20 md:w-24"
          />
          <span className="text-xs text-nowrap text-primary-500">
            Casaliving Wood
          </span>
          <span className="text-xs md:text-sm text-primary-900">$329.00</span>
        </div>
        <div className="flex flex-col gap-1">
          <img
            src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS8cCFuOp3iSjBmxKlKl6OOzw2ftc6ODXpmA3cXp-PHyQFLV7mJVZrOzknQNd0e93tLRHiEcN28-ZsK8PQ9Pv26YKaI4Okll6YW912_T-ysE_-_y7abga7bw"
            alt="Product"
            className="w-20 md:w-24"
          />
          <span className="text-xs text-nowrap text-primary-500">
            Casaliving Wood
          </span>
          <span className="text-xs md:text-sm text-primary-900">$329.00</span>
        </div>
      </div>
      <div className="flex justify-end mt-2 md:mt-3">
        <button className="p-2 text-xs md:p-3 rounded-3xl text-primary-50 bg-primary-900">
          Check Out All
        </button>
      </div>
    </>
  );
}
