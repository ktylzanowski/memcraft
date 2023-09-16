import { useEffect, useState } from "react";

const useNotification = () => {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const [notifications, setNotifications] = useState([]);
  const isRead = notifications.some((notification) => !notification.is_read);

  const sendRequest = async (url, method = "GET") => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: token ? `Bearer ${token.access}` : null,
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error("Error:", response.status, responseData);
        return null;
      }

      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };

  const fetchNotifications = async () => {
    const url = process.env.REACT_APP_API_URL + "notification/";
    const responseData = await sendRequest(url);

    if (responseData) {
      setNotifications(responseData);
    }
  };

  const markupNotifications = async () => {
    const url = process.env.REACT_APP_API_URL + "notification/read/";
    await sendRequest(url);
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      is_read: true,
    }));
    setNotifications(updatedNotifications);
  };

  useEffect(() => {
    const time = 100000;
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, time);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notifications,
    isRead,
    markupNotifications,
  };
};

export default useNotification;
