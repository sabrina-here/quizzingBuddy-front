import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function UserProfile() {
  const axiosSecure = useAxiosSecure();
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
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleDeleteTopic = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTopic();
      }
    });
  };
  return <div>UserProfile</div>;
}
