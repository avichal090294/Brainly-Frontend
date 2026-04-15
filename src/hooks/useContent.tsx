import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../pages/config";

export const useContent = () => {
  const [contents, setContents] = React.useState([]);

  useEffect(() => {
    async function fetchContents() {
      await axios
        .get(BACKEND_URL + "/api/v1/content", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setContents(response.data.content || []);
        });
    }
    fetchContents();
  }, []);

  return { contents };
};
