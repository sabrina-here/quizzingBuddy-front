import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function PreferredTopicBox({ deletePreferredTopic, topic }) {
  return (
    <div className="border-2 border-green-500  py-1 rounded-md hover:bg-light/30 hover:font-semibold hover:cursor-pointer  flex justify-between items-center">
      <span className="ps-2">{topic} </span>
      <button>
        <RxCross2
          className="text-xl m-2 text-red-500 hover:text-2xl hover:text-red-700 hover:bg-red-500/20"
          onClick={() => deletePreferredTopic(topic)}
        />
      </button>
    </div>
  );
}
