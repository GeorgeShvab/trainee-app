import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppInput from "@/components/app-input/AppInput";
import AppTypography from "@/components/app-typography/AppTypography";

import { useModalContext } from "@/context/modal/ModalContext";
import useInputVisibility from "@/hooks/use-input-visibility/useInputVisibility";
import useSignUp from "@/hooks/use-sign-up/useSignUp";
import {
  SignUpValidationScheme,
  SignUpValidatorType
} from "@/utils/validators/signUpScheme";

import "@/containers/forms/sign-up-form/SignUpForm.scss";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpValidatorType>({
    resolver: zodResolver(SignUpValidationScheme)
  });

  const [signUp, { isLoading, isSuccess }] = useSignUp();

  const { closeModal } = useModalContext();

  const {
    inputVisibility: passwordVisibility,
    shouldShowInputText: showPassword
  } = useInputVisibility({ isError: Boolean(errors.password) });
  const {
    inputVisibility: confirmPasswordVisibility,
    shouldShowInputText: showConfirmPassword
  } = useInputVisibility({ isError: Boolean(errors.confirmPassword) });

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  const onSubmit = async ({
    email,
    firstName,
    lastName,
    password
  }: SignUpValidatorType) => {
    await signUp({ email, firstName, lastName, password });
  };

  return (
    <AppContainer
      component="form"
      className="spa-sign-up__container"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AppBox className="spa-sign-up__name-fields">
        <AppInput
          {...register("firstName")}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName ? errors.firstName.message : undefined}
          labelTranslationKey="signUp.firstname.field"
          autoComplete="given-name"
          data-cy="auth-firstname"
        />
        <AppInput
          {...register("lastName")}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName ? errors.lastName.message : undefined}
          labelTranslationKey="signUp.lastname.field"
          autoComplete="family-name"
          data-cy="auth-lastname"
        />
      </AppBox>
      <AppBox className="spa-sign-up__email-password-container">
        <AppInput
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : undefined}
          labelTranslationKey="signUp.email.field"
          autoComplete="email"
          fullWidth
          data-cy="auth-email"
        />
        <AppInput
          {...register("password")}
          InputProps={passwordVisibility}
          type={showPassword ? "text" : "password"}
          error={Boolean(errors.password)}
          helperText={errors.password ? errors.password.message : undefined}
          labelTranslationKey="signUp.password.field"
          autoComplete="new-password"
          fullWidth
          data-cy="auth-password"
        />
        <AppInput
          {...register("confirmPassword")}
          InputProps={confirmPasswordVisibility}
          type={showConfirmPassword ? "text" : "password"}
          error={Boolean(errors.confirmPassword)}
          helperText={
            errors.confirmPassword ? errors.confirmPassword.message : undefined
          }
          labelTranslationKey="signUp.confirmpassword.field"
          autoComplete="new-password"
          fullWidth
          data-cy="auth-confirm-password"
        />
      </AppBox>
      <AppButton
        size="large"
        className="spa-sign-up__button"
        fullWidth
        type="submit"
        isLoading={isLoading}
        data-cy="auth-signup-submit"
      >
        <AppTypography
          variant="subtitle2"
          component="span"
          translationKey="signUp.button"
          fontWeight="extra-bold"
        />
      </AppButton>
    </AppContainer>
  );
};

export default SignUpForm;
