import React from "react";

const Sidebar = ({ isOpen, onClose, onGenreClick, genres }) => {
  return (
    <div
      className={`fixed top-16 left-0 bottom-0 w-64 bg-blue-900 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-40`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-200">Genres</h2>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id} className="mb-2">
              <button
                onClick={() => onGenreClick(genre.id, genre.name)}
                className="text-blue-100 hover:text-blue-300 transition-colors"
              >
                {genre.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
