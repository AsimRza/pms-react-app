import { User, Lock, LogIn } from "lucide-react";
import Input from "@shared/components/ui/Input";
import Button from "@shared/components/ui/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useServices } from "../../providers/hooks";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { ROUTES } from "../../shared/consts";
import type { ILoginData } from "@/services/auth/model";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "user@gmail.com",
      password: "123456",
    },
  });

  const navigate = useNavigate();

  const { authService } = useServices();

  const loginMutation = useMutation({
    mutationFn: (data: ILoginData) => authService.login(data),
  });
  const location = useLocation();

  const from = location.state?.from?.pathname || ROUTES.STATISTICS;

  const handleLogin = (data: ILoginData) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success("Uğurla daxil oldunuz!");
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate(from);
      },
      onError: () => {
        toast.error(
          "Email və ya şifrə yanlışdır. Zəhmət olmasa, yenidən cəhd edin.",
        );
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Müəllim Girişi</h2>
          <p className="text-gray-600">Sisteme daxil olun</p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              <User className="inline w-4 h-4 mr-2" />
              Email
            </label>
            <Input
              placeholder="Emailinizi daxil edin"
              {...register("email", {
                required: "Bu xana vacibdir",
                validate: (value) =>
                  /\S+@\S+\.\S+/.test(value) || "Email formatı düzgün deyil",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              <Lock className="inline w-4 h-4 mr-2" />
              Şifrə
            </label>
            <Input
              type="password"
              placeholder="Şifrənizi daxil edin"
              {...register("password", {
                required: "Bu xana vacibdir",
                minLength: {
                  value: 6,
                  message: "Şifrə ən az 6 simvol olmalıdır",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            loading={loginMutation.isPending}
            type="submit"
            className="w-full"
            leftIcon={<LogIn className="inline w-4 h-4 mr-2" />}
          >
            Daxil ol
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
