import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="first-name">First Name</label>
        <input
          {...register("firstName", {
            required: { value: true, message: "First name is required" },
            minLength: {
              value: "5",
              message: "First Name should at least of 5 characters",
            },
          })}
          className="text-black"
        />
        <p className="text-red-600">
          {errors.firstName && errors.firstName.message}
        </p>
      </div>

      <div>
        <label htmlFor="last-name">Last Name</label>
        <input {...register("last-name")} className="text-black" />
      </div>

      <div>
        <label htmlFor="phone-number">Phone Number</label>
        <input {...register("phone-number")} className="text-black" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
