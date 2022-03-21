import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import style from "../styles/Home.module.scss";
import MainBtn from "./MainBtn";
import * as Yup from "yup";
import { AppForm, AppFormField, SubmitButton } from "./forms";
import { useLogInMutation, useSignUpMutation } from "../store/auth";
import { signIn } from "next-auth/react";

const validationSchemaSignUp = Yup.object({
  username: Yup.string().required("يجب ملء جميع البيانات").min(5),
  phone: Yup.string()
    .required("يجب ملء جميع البيانات")
    .matches(
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
    ),
  password: Yup.string()
    .required("يجب ملء جميع البيانات")
    .min(5, "يجب الا تقل عن 5 حروف")
    .max(10, "يجب الا تزيد عن 10 حروف"),
});
const validationSchemaSignIn = Yup.object({
  phone: Yup.string()
    .required("يجب ملء جميع البيانات")
    .matches(
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/
    ),
  password: Yup.string()
    .required("يجب ملء جميع البيانات")
    .min(5, "يجب الا تقل عن 5 حروف")
    .max(10, "يجب الا تزيد عن 10 حروف"),
});

interface IProps {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
}

function RegistrationModal({ isOpen = false, setIsOpen }: IProps) {
  const [
    signUpHandler,
    {
      isLoading: isLoadingSignUp,
      isError: isErrorSignUp,
      isSuccess: isSuccessSignUp,
    },
  ] = useSignUpMutation();

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isErrorLogin, setIsErrorLogin] = useState(false);
  const [isSuccessLogin, setIsSuccessLogin] = useState(false);
  /*  const [
    loginHandler,
    {
      isLoading: isLoadingLogin,
      isError: isErrorLogin,
      isSuccess: isSuccessLogin,
      data,
    },
  ] = useLogInMutation(); */

  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <>
      {isOpen && (
        <div className={style.overlay}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className={style.Modal}
                initial={{ opacity: 0, top: "-20vh" }}
                exit={{ opacity: 0, top: "-20vh" }}
                animate={{ opacity: 1, top: "50%" }}
              >
                <div className={style.Head}>
                  <h2
                    className={isSignUp ? style.active : ""}
                    onClick={() => setIsSignUp(true)}
                  >
                    مستخدم جديد
                  </h2>
                  <h2
                    className={!isSignUp ? style.active : ""}
                    onClick={() => setIsSignUp(false)}
                  >
                    تسجيل الدخول
                  </h2>
                </div>

                {isSignUp && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={style.Form}
                  >
                    {isSuccessSignUp && (
                      <h2 className="mx-auto text-primary text-center">
                        {" "}
                        تم بنجاح
                      </h2>
                    )}
                    {isErrorSignUp && (
                      <h2 className="mx-auto text-red-500 text-center">
                        {" "}
                        الرقم مستعمل من قبل
                      </h2>
                    )}
                    <AppForm
                      initialValues={{
                        username: "",
                        phone: "",
                        password: "",
                      }}
                      onSubmit={async (values: any, { resetForm }: any) => {
                        await signUpHandler(values);
                        resetForm();
                      }}
                      /*  {...{ validationSchema }} */
                      validationSchema={validationSchemaSignUp}
                    >
                      <div>
                        <AppFormField
                          name="username"
                          placeholder="الاسم"
                          disabled={isLoadingSignUp}
                        />
                        <label>الاسم</label>
                      </div>
                      <div>
                        <AppFormField
                          name="phone"
                          placeholder="رقم الهاتف"
                          disabled={isLoadingSignUp}
                        />
                        <label>التليفون</label>
                      </div>

                      <div>
                        <AppFormField
                          disabled={isLoadingSignUp}
                          name="password"
                          placeholder="الرقم السري"
                          type="password"
                        />
                        <label>كلمة المرور</label>
                      </div>
                      <div className={style.btns}>
                        <SubmitButton title="التسجيل" />
                        <MainBtn
                          primary={false}
                          onClick={() => setIsOpen(false)}
                          title="وقت أخر"
                        />
                      </div>
                    </AppForm>
                  </motion.div>
                )}

                {!isSignUp && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={style.Form}
                  >
                    {isSuccessLogin && (
                      <h2 className="mx-auto text-primary text-center">
                        {" "}
                        تم بنجاح
                      </h2>
                    )}
                    {isErrorLogin && (
                      <h2 className="mx-auto text-red-500 text-center">
                        {" "}
                        الرقم السري غير صحيحي
                      </h2>
                    )}
                    <AppForm
                      initialValues={{
                        phone: "",
                        password: "",
                      }}
                      onSubmit={async (values: any, { resetForm }: any) => {
                        console.log(values);
                        resetForm();
                        try {
                          setIsErrorLogin(false);
                          setIsSuccessLogin(false);
                          setIsLoadingLogin(true);
                          await signIn("credentials", {
                            redirect: false,
                            phone: values.phone,
                            password: values.password,
                            callbackUrl: `${window.location.origin}`,
                          });
                          setIsSuccessLogin(true);
                          setIsOpen(false);
                          setIsLoadingLogin(false);
                          resetForm();
                        } catch (err) {
                          setIsErrorLogin(true);
                          setIsLoadingLogin(false);
                        }
                        /*  await loginHandler(values);
                        if (isSuccessLogin) {
                          localStorage.setItem("token", data?.token as string);
                        } */
                      }}
                      validationSchema={validationSchemaSignIn}
                    >
                      <div>
                        <AppFormField
                          name="phone"
                          placeholder="رقم الهاتف"
                          disabled={isLoadingLogin}
                        />
                        <label>التليفون</label>
                      </div>
                      <div>
                        <AppFormField
                          name="password"
                          placeholder="الرقم السري"
                          type="password"
                          disabled={isLoadingLogin}
                        />
                        <label>كلمة المرور</label>
                      </div>
                      {!isLoadingLogin ? (
                        <div className={style.btns}>
                          <SubmitButton title="التسجيل" />
                          <MainBtn
                            primary={false}
                            onClick={() => setIsOpen(false)}
                            title="وقت أخر"
                          />
                        </div>
                      ) : (
                        <h2>جاري التسجيل</h2>
                      )}
                    </AppForm>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default RegistrationModal;
