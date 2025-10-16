"use client";

import React, { FC } from "react";

interface SaveMenuProps {
  isSaving: boolean;
  handleSaveCard: () => void;
}

const SaveMenu: FC<SaveMenuProps> = ({ isSaving, handleSaveCard }) => (
  <div className="flex flex-col gap-2 p-4">
    <button
      onClick={handleSaveCard}
      disabled={isSaving}
      className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
    >
      {isSaving ? "Saving..." : "Save Card"}
    </button>
  </div>
);

export default SaveMenu;
