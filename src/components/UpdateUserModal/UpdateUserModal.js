import { useForm } from "react-hook-form";

export default function UpdateUserModal({
    userToUpdate,
    setShowModal,
    updateEmployee,
}) {
    const onSubmit = async (data) => {
        try {
            await updateEmployee(userToUpdate.current.id, {
                name: data.name,
                age: data.age,
                email: data.email,
                p_number: data.p_number,
            });
            reset();
            setShowModal((modalVisibility) => !modalVisibility);
        } catch (error) {
            console.error(error);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            eid: userToUpdate.current.eid,
            name: userToUpdate.current.name,
            age: userToUpdate.current.age,
            email: userToUpdate.current.email,
            p_number: userToUpdate.current.p_number,
        },
    });

    return (
        <>
            <div
                onClick={() => setShowModal((modalVisibility) => !modalVisibility)}
                className="fixed inset-0 bg-gray-400 opacity-80"
            ></div>
            <div className="fixed inset-40 p-10 bg-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="py-2">
                        <label className="text-black">
                            Employee ID
                            <input
                                className="outline outline-blue-400"
                                type="number"
                                {...register("eid", {
                                    required: {
                                        value: "true",
                                        message: "Employee Id is required",
                                    },
                                    valueAsNumber: true,
                                    disabled: true,
                                })}
                            />
                            <p className="text-red-600">{errors.eid?.message}</p>
                        </label>
                    </div>

                    <div className="py-2">
                        <label className="text-black">
                            Name
                            <input
                                className="outline outline-blue-400"
                                type="text"
                                {...register("name", {
                                    required: {
                                        value: "true",
                                        message: "Name is required",
                                    },
                                })}
                            />
                            <p className="text-red-600">{errors.name?.message}</p>
                        </label>
                    </div>

                    <div className="py-2">
                        <label className="text-black">
                            Age
                            <input
                                className="outline outline-blue-400"
                                type="number"
                                {...register("age", {
                                    required: {
                                        value: "true",
                                        message: "Age is required",
                                    },
                                    valueAsNumber: true
                                })}
                            />
                            <p className="text-red-600">{errors.age?.message}</p>
                        </label>
                    </div>

                    <div className="py-2">
                        <label className="text-black">
                            Email
                            <input
                                className="outline outline-blue-400"
                                type="text"
                                {...register("email", {
                                    required: {
                                        value: "true",
                                        message: "Email is required",
                                    },
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                            />
                            <p className="text-red-600">{errors.email?.message}</p>
                        </label>
                    </div>

                    <div className="py-2">
                        <label className="text-black">
                            Phone Number
                            <input
                                className="outline outline-blue-400"
                                type="text"
                                {...register("p_number", {
                                    required: {
                                        value: "true",
                                        message: "Phone Number is required",
                                    },
                                    pattern: {
                                        value:
                                            /(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                                        message: "Please enter a valid phone number",
                                    },
                                })}
                            />
                            <p className="text-red-600">{errors.phoneNumber?.message}</p>
                        </label>
                    </div>
                    <button className="text-black border border-black" type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}
