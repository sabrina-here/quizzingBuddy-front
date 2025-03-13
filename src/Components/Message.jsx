import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router";
import { QuizContext } from "../Providers/QuizProvider";
import { IoClose } from "react-icons/io5";
import GenerateQuizModal from "./GenerateQuizModal";

export default function Message({ message }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[400px] h-[200px] border-4 border-primary/20 uppercase rounded-sm flex flex-col justify-center items-center text-lg font-semibold">
        <div>{message}</div>
        <div>
          {" "}
          <button
            className="p-2 mx-2 my-4 border-2 border-accent bg-accent/10 hover:bg-accent/20 hover:text-xl px-5 rounded-lg font-medium text-lg"
            onClick={() => openModal()}
          >
            Generate quiz
          </button>
        </div>
      </div>
      <GenerateQuizModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}
