import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Personal Details */}
      <div>
        <label>
          First Name
          <input
            className="text-black"
            type="text"
            {...register("firstName", {
              required: {
                value: "true",
                message: "First Name is Required",
              },
              minLength: {
                value: 4,
                message: "First Name should at least be 4 characters long.",
              },
            })}
          />
        </label>
        <p>{errors.firstName?.message}</p>
      </div>

      <div>
        <label>
          Last Name
          <input className="text-black" type="text" {...register("lastName")} />
        </label>
      </div>

      <div>
        <label>
          Phone Number
          <input
            className="text-black"
            type="tel"
            {...register("phoneNumber")}
          />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

/* 
Personal Details
Corporation Details
Business Address
Plans
Payment
*/
