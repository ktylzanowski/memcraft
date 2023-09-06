import { useEffect, useState } from "react";

const useNotification = () => {
  const token = JSON.parse(localStorage.getItem("authTokens"));
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const response = await fetch("http://127.0.0.1:8000/notification/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ` + String(token.access),
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      setNotifications(responseData);
    } else {
      console.log("BAD");
    }
  };

  useEffect(() => {
    const time = 600000;
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, time);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notifications,
  };
};

export default useNotification;
