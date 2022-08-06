import React from "react";
import { useForm } from "react-hook-form";

const register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("Name", { required: true, maxLength: 20 })} />
        <input {...register("UserName", { required: true, min:6, maxLength: 20 })} />
        <input {...register("Aadhar Number", { required: true, maxLength: 15 })} />
        <input {...register("Pan Number", { required: true, min:8, maxLength: 15 })} />
        <input type="submit" />
          </form>
    </div>
  );
};

export default register;
