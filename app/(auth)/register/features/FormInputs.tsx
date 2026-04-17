import Input from '@/components/ui/Input';

const FormInputs = ({ register, errors }: { register: any; errors: any }) => {
  return (
      <>
         {/* the name input */}
        <div className="w-full flex flex-col gap-2 mb-6">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            {...register("name")}
            error={errors.name?.message}
            type="text"
            id="name"
            placeholder="Enter your name"
          />
        </div>
        {/* the email input */}
        <div className="w-full flex flex-col gap-2 mb-6">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            {...register("email")}
            error={errors.email?.message}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        {/* the department input */}
        <div className="w-full flex flex-col gap-2 mb-6">
          <label htmlFor="department" className="text-sm font-medium">
            Job Title
          </label>
          <Input
            {...register("department")}
            error={errors.department?.message}
            type="text"
            id="department"
            placeholder="Enter your job title"
          />
        </div>
        {/* the password and confirm password in the same row  and in mobile make flex column*/}
        <div className="w-full flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              className="w-full"
              {...register("password")}
              error={errors.password?.message}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <label htmlFor="confirm-password" className="text-sm font-medium">
              Confirm Password
            </label>
            <Input
              className="w-full"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
            />
          </div>
        </div>
            
    </>
  )
}

export default FormInputs