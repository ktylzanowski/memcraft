import { useState } from "react";

import ScrollToTop from "../utils/ScrollToTop"

const usePagination = (initData, url) => {
  const [data, setData] = useState(initData);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

  const onPageChange = async (newPage) => {
    try {
      const response = await fetch(`${url}?page=${newPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        setCurrentPage(newPage);
        setData(responseData);
      } else {
        setError("Coś poszło nie tak z ładowaniem.");
      }
    } catch {
      setError("Coś poszło nie tak z ładowaniem.");
    } finally {
      ScrollToTop();
    }
  };

  return {
    data,
    currentPage,
    error,
    onPageChange,
  }
};

export default usePagination;
