import { useState } from "react";

import ScrollToTop from "../utils/ScrollToTop";

const usePagination = (initData, url) => {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(initData);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

  const onPageChange = async (newPage) => {
    setLoading(true)
    try {
      const response = await fetch(`${url}?page=${newPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token.access}` : null,
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
      setLoading(false)
      ScrollToTop();
    }
  };

  return {
    data,
    currentPage,
    error,
    loading,
    setData,
    onPageChange,
  };
};

export default usePagination;
