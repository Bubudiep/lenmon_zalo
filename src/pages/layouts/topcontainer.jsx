import React, { useEffect, useState } from "react";

const Topcontainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const stickySearch = document.querySelector(".sticky-search");
    const container = document.querySelector(".app-container");
    const handleScroll = () => {
      if (stickySearch && container.scrollTop < 120) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className={`sticky-search sticky`}>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </>
  );
};

export default Topcontainer;
