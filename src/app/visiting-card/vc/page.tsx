"use client";

import { CreditCard, PlusSquare } from "lucide-react";
import Link from "next/link";

export default function VisitingCardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-12 px-6">
      <h1 className="text-3xl font-bold text-[#021B35] mb-6">Visiting Card Manager</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Manage all your digital visiting cards, create new ones, and customize your profile and settings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        <Link
          href="/visiting-card/vc/create"
          className="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <span className="text-blue-600">
            <PlusSquare size={40} />
          </span>
          <span className="font-semibold">Create New Card</span>
        </Link>

        <Link
          href="/visiting-card/vc/my-cards"
          className="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <span className="text-green-600">
            <CreditCard size={40} />
          </span>
          <span className="font-semibold">My Cards</span>
        </Link>
      </div>
    </div>
  );
}
