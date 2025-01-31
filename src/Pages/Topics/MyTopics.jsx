import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "react-query";
import MyTopicsBox from "./MyTopicsBox";
import Swal from "sweetalert2";

export default function MyTopics() {
  const { user } = useContext(authContext);

  const [topics, setTopics] = useState([]);
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem("token");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getUserTopicStats"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/getUserTopicStats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      console.log(data);
      return data;
    },
  });
  if (isLoading) return <div>loading</div>;
  if (data.message) return <div>You have no topics</div>;

  const deleteTopic = async (topic) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.delete("/deleteTopic", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { topic }, // Send topic in request body
      });

      console.log(response);
      refetch();
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleDeleteTopic = (topic) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "This action cannot be reversed. ",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTopic(topic);
      }
    });
  };

  return (
    <div>
      {data.length > 0 ? (
        data.map((d, index) => (
          <div key={index}>
            <MyTopicsBox
              d={d}
              index={index}
              handleDeleteTopic={handleDeleteTopic}
            />
          </div>
        ))
      ) : (
        <div>you have no topics</div>
      )}
    </div>
  );
}
