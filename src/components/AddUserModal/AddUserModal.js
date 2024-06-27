import { useForm } from "react-hook-form";

export default function AddUserModal({
    setShowModal,
    addEmployee,
}) {
    const onSubmit = async (data) => {
        await addEmployee({ ...data });
        reset();
        setShowModal((modalVisibility) => !modalVisibility);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    return (
        <>
            {/* <div
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
                                    valueAsNumber: true
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
            </div> */}
            <div
    onClick={() => setShowModal((modalVisibility) => !modalVisibility)}
    className="fixed inset-0 bg-gray-800 opacity-80 z-40"
></div>
<div className="fixed inset-40 p-10 bg-white shadow-xl rounded-lg z-50">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div className="py-2">
            <label className="block text-gray-700 font-semibold mb-1">
                Employee ID
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="number"
                    {...register("eid", {
                        required: {
                            value: true,
                            message: "Employee Id is required",
                        },
                        valueAsNumber: true
                    })}
                />
                <p className="text-red-600 text-sm mt-1">{errors.eid?.message}</p>
            </label>
        </div>

        <div className="py-2">
            <label className="block text-gray-700 font-semibold mb-1">
                Name
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="text"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "Name is required",
                        },
                    })}
                />
                <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>
            </label>
        </div>

        <div className="py-2">
            <label className="block text-gray-700 font-semibold mb-1">
                Age
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="number"
                    {...register("age", {
                        required: {
                            value: true,
                            message: "Age is required",
                        },
                        valueAsNumber: true
                    })}
                />
                <p className="text-red-600 text-sm mt-1">{errors.age?.message}</p>
            </label>
        </div>

        <div className="py-2">
            <label className="block text-gray-700 font-semibold mb-1">
                Email
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="text"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Email is required",
                        },
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Please enter a valid email",
                        },
                    })}
                />
                <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
            </label>
        </div>

        <div className="py-2">
            <label className="block text-gray-700 font-semibold mb-1">
                Phone Number
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="text"
                    {...register("p_number", {
                        required: {
                            value: true,
                            message: "Phone Number is required",
                        },
                        pattern: {
                            value: /(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                            message: "Please enter a valid phone number",
                        },
                    })}
                />
                <p className="text-red-600 text-sm mt-1">{errors.p_number?.message}</p>
            </label>
        </div>

        <button
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="submit"
        >
            Submit
        </button>
    </form>
</div>

        </>
    );
}
