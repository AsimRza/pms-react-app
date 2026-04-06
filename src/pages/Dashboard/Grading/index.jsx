import React from "react";
import GradingList from "./List";
import { Plus } from "lucide-react";
import { useModal } from "../../../shared/hooks";
import AddGrading from "./AddGrading";
import { PageHeader } from "../../../shared/components/PageHeader";

const Grading = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <PageHeader
        title="Qiymetlendirme"
        rightPanel={
          <button
            onClick={openModal}
            className="border-none cursor-pointer bg-blue-600 text-white rounded-md px-4 py-2 flex items-center gap-2"
          >
            <Plus />
          </button>
        }
      />

      <GradingList />

      <AddGrading isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default Grading;
