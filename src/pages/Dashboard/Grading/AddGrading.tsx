import React from "react";
import Modal from "../../../shared/components/ui/Modal";
import Select from "../../../shared/components/ui/Select";
import Input from "../../../shared/components/ui/Input";
import Button from "../../../shared/components/ui/Button";
import { useMutation, useQueries } from "@tanstack/react-query";
import { useServices, useUser } from "../../../providers/hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { queryClient } from "@/shared/queryClient";
import type { useModal } from "@/shared/hooks";
import type { IGradeRequest } from "@/services/student";

type ModalReturnType = ReturnType<typeof useModal>;

interface IProps {
  isOpen: ModalReturnType["isOpen"];
  closeModal: ModalReturnType["closeModal"];
}

type Form = Omit<IGradeRequest, "teacher">;

const AddGrading: React.FC<IProps> = ({ isOpen, closeModal }) => {
  const { firstName, lastName } = useUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      studentId: undefined,
      lessonId: undefined,
      grade: undefined,
    },
  });

  const { studentService, lessonService } = useServices();

  const query = useQueries({
    queries: [
      {
        queryKey: ["get.AllStudents"],
        queryFn: () => studentService.getAllList(),
        enabled: isOpen,
      },
      {
        queryKey: ["get.AllLessons"],
        queryFn: () => lessonService.getList(),
        enabled: isOpen,
      },
    ],
  });

  const mutation = useMutation({
    mutationKey: ["addGrading"],
    mutationFn: (data: IGradeRequest) => studentService.createGrading(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getGrading"] });
      toast.success("Qiymetlendirme ugurla elave olundu");
      closeModal();
    },
  });

  const students = query[0].data || [];
  const lessons = query[1].data || [];

  const loading = query.some((q) => q.isLoading);

  const studentOptions = students.map((student) => ({
    label: `${student.firstName} ${student.lastName}`,
    value: student.id,
  }));

  const lessonOptions = lessons.map((lesson) => ({
    label: lesson.name,
    value: lesson.id,
  }));

  const handleFormSubmit = (data: Form) => {
    mutation.mutate({ ...data, teacher: `${firstName} ${lastName}` });
  };

  return (
    <Modal
      loading={loading}
      size="lg"
      opened={isOpen}
      title="Yeni Qiymetlendirme"
      onClose={closeModal}
      closeOnOverlayClick={false}
    >
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <Select
            label="Student"
            options={studentOptions}
            {...register("studentId", {
              required: "Telebe secimi vacibdir",
            })}
          />
          {errors.studentId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.studentId.message}
            </p>
          )}
        </div>

        <div>
          <Select
            label="Lesson"
            options={lessonOptions}
            {...register("lessonId", {
              required: "Ders secimi vacibdir",
            })}
          />
          {errors.lessonId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lessonId.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Enter grade"
            {...register("grade", {
              min: {
                value: 0,
                message: "Grade minimum 0 ola biler",
              },
              max: {
                value: 100,
                message: "Grade maximum 100 ola biler",
              },
              required: "Grade secimi vacibdir",
            })}
          />
          {errors.grade && (
            <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
          )}
        </div>

        <Button loading={mutation.isPending} type="submit" className="mt-4">
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default AddGrading;
