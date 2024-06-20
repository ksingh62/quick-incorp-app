import { useForm } from "react-hook-form";

export default function UpdateInvoiceModal({
    invoiceToUpdate,
    setShowModal,
    updateInvoice,
}) {
    const onSubmit = async (data) => {
        try {
            const res = await updateInvoice(invoiceToUpdate.current.id, {
                customerName: data.customerName,
                date: data.date,
                amount: data.amount,
                status: data.status
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
            invoiceId: invoiceToUpdate.current.invoiceId,
            customerName: invoiceToUpdate.current.customerName,
            date: invoiceToUpdate.current.date.toLocaleDateString("fr-CA", {year:"numeric", month: "2-digit", day:"2-digit"}),
            amount: invoiceToUpdate.current.amount,
            status: invoiceToUpdate.current.status
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
                            Invoice ID
                            <input
                                className="outline outline-blue-400"
                                type="text"
                                {...register("invoiceId", {
                                    required: {
                                        value: "true",
                                        message: "Invoice Id is required",
                                    },
                                    disabled: true
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
            </div>
        </>
    );
}