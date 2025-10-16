"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyCardsPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/visiting-card/my-cards");
        if (res.ok) {
          const data = await res.json();
          setCards(data.cards || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading cards...</div>;

  if (!cards.length)
    return (
      <div className="p-4 text-center">
        <p>No visiting cards found.</p>
        <Link
          href="/visiting-card/vc/create"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Your First Card
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cards.map((card) => (
        <div key={card.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg">
          <img src={card.image} alt="Visiting Card" className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
}
