import { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import MoonLoader from "react-spinners/MoonLoader";
import * as Yup from "yup";
import { dispatcher } from "@/app/redux/helper";
import { app_transfer_shoe } from "@/pages/dashboard/redux/actions";

interface FCProps {
  open: boolean;
  data: any;
  trigger: (val: boolean) => void;
}

const TransferModal: React.FC<FCProps> = ({ open, trigger, data }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => trigger(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform max-w-4xl overflow-hidden rounded-lg bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                <Formik
                  enableReinitialize
                  initialValues={{
                    amount: data.amount,
                  }}
                  validationSchema={Yup.object({
                    amount: Yup.number()
                      .min(5, "Please, no less than 5 pairs of shoes")
                      .max(data.amount, "Exceeds the amount you have available!"),
                  })}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await dispatcher(app_transfer_shoe, {
                      transfer: {
                        from: data.from,
                        to: data.to,
                        shoe: data.shoe,
                        amount: values.amount,
                      },
                    });
                    setSubmitting(false)
                    trigger(false)
                  }}
                >
                  {({ errors, isSubmitting }) => (
                    <Form className="flex-1">
                      <div className="flex w-full items-center space-x-2">
                        {isSubmitting ? (
                          <>
                            <MoonLoader color={"#000"} loading={isSubmitting} size={14} aria-label="Transfering..." />
                            <p>Transfering...</p>
                          </>
                        ) : (
                          <>
                            <HiOutlineArrowTopRightOnSquare />
                            <p>Transfer</p>
                          </>
                        )}
                      </div>
                      <hr className="my-4" />
                      <div className="flex mt-2 text-black text-sm">
                        <div className="flex-col">
                          <div className="flex space-x-2 items-center">
                            <p>Send</p>
                            <Field
                              placeholder="10"
                              name="amount"
                              type="number"
                              className="pl-2 w-12 h-6 text-sm ring-1 ring-gray-100 rounded bg-gray-200 outline-none font-semibold"
                            />
                            <p>
                              pairs of <b>{data.shoe}</b> shoes from <b>{data.from}</b> to <b>{data.to}</b>.
                            </p>
                          </div>
                          <div className="flex h-6 items-center mt-2">
                            {errors.amount && <p className="text-red-400">{errors.amount.toString()}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-x-2">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md text-green-600 bg-green-300 hover:bg-green-400 hover:text-white p-2 font-semibold text-sm transition-all duration-300"
                        >
                          Send
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-gray-200 hover:bg-black hover:text-white p-2 font-semibold text-sm transition-all duration-300"
                          onClick={() => trigger(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TransferModal;

{
  /* <Formik
      enableReinitialize
      initialValues={{
        id: id,
        title: title,
        body: body,
      }}
      validationSchema={Yup.object({
        title: Yup.string().min(5, "Please, no less than 5 characters").required("Required"),
        body: Yup.string().max(50, "Must be 50 characters or less").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        let response = await dispatcher(api_gql_update_post, { post: values });
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex-1">
          <div className="flex flex-col m-2 p-2 rounded border border-slate-200">
            <div className="flex flex-col items-start space-y-2">
              <Field
                placeholder="Title"
                name="title"
                type="text"
                className="w-full p-2 text-xl ring-1 ring-gray-200 rounded bg-gray-100"
              />
              {errors.title && <p className="text-red-400">{errors.title}</p>}
              <Field
                placeholder="Message"
                name="body"
                as="textarea"
                rows="10"
                className="w-full items-start p-2 text-xl ring-1 ring-gray-200 rounded bg-slate-100"
              />
              {errors.body && <p className="text-red-400">{errors.body}</p>}
              <div className="flex space-x-2">
                <button type="submit" className="bg-green-400 text-white rounded p-2">
                  Save
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik> */
}
