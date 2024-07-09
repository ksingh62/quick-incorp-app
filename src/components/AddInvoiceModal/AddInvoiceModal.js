import { useForm } from "react-hook-form";

export default function AddInvoiceModal({
    setShowModal,
    addInvoice,
}
) {

    const onSubmit = async (data) => {
        console.log(data);
        await addInvoice({ ...data });
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
                            Invoice ID
                            <input
                                className="outline outline-blue-400"
                                type="text"
                                {...register("invoiceId", {
                                    required: {
                                        value: "true",
                                        message: "Invoice Id is required",
                                    },
                                })}
                            />
                            <p className="text-red-600">{errors.invoiceId?.message}</p>
                        </label>
                    </div>

                    <div className="py-2">
                        <label className="text-black">
                            Customer Name
                            <input
                                className="outline outline-blue-400"
                                type="text"
                                {...register("customerName", {
                                    required: {
                                        value: "true",
                                        message: "Customer name is required",
                                    },
                                })}
                            />
                            <p className="text-red-600">{errors.customerName?.message}</p>
                        </label>
                    </div>

                    <div className="py-2">
                        <label className="text-black">
                            Date
                            <input
                                className="outline outline-blue-400"
                                type="text"
                                {...register("date", {
                                    required: {
                                        value: "true",
                                        message: "Date is required",
                                    },
                                })}
                            />
                            <p className="text-red-600">{errors.date?.message}</p>
                        </label>
                    </div>

                    <div className="py-2">
                        <label className="text-black">
                            Amount
                            <input
                                className="outline outline-blue-400"
                                type="number"
                                {...register("amount", {
                                    required: {
                                        value: "true",
                                        message: "Amount is required",
                                    },
                                    valueAsNumber: true
                                })}
                            />
                            <p className="text-red-600">{errors.amount?.message}</p>
                        </label>
                    </div>

                    <div className="py-2">
                        <label className="text-black">
                            Status
                            <select {...register("status", { required: { value: "true", message: "Status is required" } })}>
                                <option value=""></option>
                                <option value="overdue">Overdue</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </select>
                            <p className="text-red-600">{errors.status?.message}</p>
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
                Invoice ID
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="text"
                    {...register("invoiceId", {
                        required: {
                            value: true,
                            message: "Invoice Id is required",
                        },
                    })}
                />
                <p className="text-red-600 text-sm mt-1">{errors.invoiceId?.message}</p>
            </label>
        </div>

        <div className="py-2">
            <label className="block text-gray-700 font-semibold mb-1">
                Customer Name
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="text"
                    {...register("customerName", {
                        required: {
                            value: true,
                            message: "Customer name is required",
                        },
                    })}
                />
                <p className="text-red-600 text-sm mt-1">{errors.customerName?.message}</p>
            </label>
        </div>

        <div className="py-2">
            <label className="block text-gray-700 font-semibold mb-1">
                Date
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="text"
                    {...register("date", {
                        required: {
                            value: true,
                            message: "Date is required",
                        },
                    })}
                />
                <p className="text-red-600 text-sm mt-1">{errors.date?.message}</p>
            </label>
        </div>

        <div className="py-2">
            <label className="block text-gray-700 font-semibold mb-1">
                Amount
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    type="number"
                    {...register("amount", {
                        required: {
                            value: true,
                            message: "Amount is required",
                        },
                        valueAsNumber: true
                    })}
                />
                <p className="text-red-600 text-sm mt-1">{errors.amount?.message}</p>
            </label>
        </div>

        <div className="py-2">
            <label className="block text-gray-700 font-semibold mb-1">
                Status
                <select
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    {...register("status", { required: { value: true, message: "Status is required" } })}
                >
                    <option value=""></option>
                    <option value="overdue">Overdue</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                </select>
                <p className="text-red-600 text-sm mt-1">{errors.status?.message}</p>
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