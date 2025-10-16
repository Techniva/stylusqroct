"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

type DigitalBusinessCard = {
  id: number; // matches Prisma ID type
  uniqueCode: string;
  name: string;
  title: string | null;
  company: string | null;
  profileUrl?: string | null;
  published: boolean;
};

export default function MyCardsPage() {
  const [cards, setCards] = useState<DigitalBusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/digital-business-cards/my-cards", {
          method: "GET",
          credentials: "include", // ensures JWT/session cookie is sent
        });

        if (res.ok) {
          const data: DigitalBusinessCard[] = await res.json();
          setCards(data);
        } else if (res.status === 401) {
          console.error("Unauthorized. Please login.");
          // Optionally redirect to login
          router.replace("/");
        } else {
          console.error("Failed to fetch cards");
        }
      } catch (err) {
        console.error("Error fetching cards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#041E30] mb-3"></div>
        <span className="text-gray-700 font-medium">Loading Cards...</span>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No cards found. Create your first card!</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-block bg-[#021B35] text-white px-4 py-2 rounded-md hover:bg-[#032544]"
        >
          Create New Card
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-4 h-[calc(100vh-145px)] overflow-y-auto">
      <h2 className="text-xl font-bold text-[#021B35] mb-4">My Cards</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={card.profileUrl || "/default-avatar.png"}
              alt={card.name}
              className="w-20 h-20 rounded-full object-cover border mb-3"
            />
            <h3 className="text-lg font-bold">{card.name}</h3>
            <p className="text-sm text-gray-600">{card.title}</p>
            <p className="text-sm text-gray-500">{card.company}</p>

            <span
              className={`mt-2 text-xs font-semibold px-2 py-1 rounded-full ${
                card.published
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {card.published ? "Published" : "Draft"}
            </span>

            <div className="flex gap-2 mt-4">
                <Link
                    href={`/dbc/${card.uniqueCode}`}
                    target="_blank"           // opens in a new tab
                    rel="noopener noreferrer" // security best practice
                    className="flex items-center gap-1 text-sm px-3 py-1 bg-[#021B35] text-white rounded-md hover:bg-[#032544]"
                    >
                    <Eye size={14} /> View
                </Link>
                <Link
                    href={`/digital-business-cards/create?uniqueCode=${card.uniqueCode}`}
                    className="flex items-center gap-1 text-sm px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                    Edit
                </Link>
                <Link
                    href={`/visiting-card/vc/create?uniqueCode=${card.uniqueCode}`}
                    className="flex items-center gap-1 text-sm px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                    Visiting Card
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
