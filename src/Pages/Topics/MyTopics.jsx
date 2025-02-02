import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "react-query";
import MyTopicsBox from "./MyTopicsBox";
import Swal from "sweetalert2";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";

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
      return data;
    },
  });
  if (isLoading) return <Loader />;
  if (data.message)
    return (
      <div>
        <Message message={"You have no topics"}></Message>
      </div>
    );

  const deleteTopic = async (topic) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosSecure.delete("/deleteTopic", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { topic }, // Send topic in request body
      });

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
    <div className="container lg:max-w-[80%] mx-auto">
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
        <Message message={"you have no topics"}></Message>
      )}
    </div>
  );
}
