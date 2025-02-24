"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/use-user";
import { useState, ChangeEvent } from "react";
import { CiCamera } from "react-icons/ci";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileSchema } from "@/schema/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { changeUserData } from "@/actinos";
import toast from "react-hot-toast";

export default function AdminPage() {
  const { user, setUser } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [phone_number, setPhoneNumber] = useState<string | null | undefined>(
    user?.phone
  );

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      full_name: user?.full_name,
      username: user?.username,
      email: user?.email,
      phone: phone_number || "+998",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["change_user_data"],
    mutationFn: (data: FormData) => changeUserData(data),
    onSuccess(res) {
      toast.success("All changes have been successfully saved!");
      setUser(res.data);
    },
    onError(e) {
      toast.success("Data not saved!");
    },
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    let formData = new FormData();
    image && formData.append("image", image);
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("username", values.username);
    phone_number && formData.append("phone", phone_number);
    mutate(formData);
  };

  return (
    <>
      {user && (
        <div className="w-full px-1 md:px-2 xl:px-8">
          <h3 className="text-[42px] font-semibold mt-0 md:mt-4 xl:mt-0">
            Hello! {user.full_name}
          </h3>

          <div>
            <div className="flex items-center gap-6 mt-6">
              <label
                htmlFor="profile_picture"
                className="relative w-32 h-32 rounded-full"
              >
                <Avatar className="cursor-pointer absolute w-full h-full inset-0 !rounded-md">
                  {user.image && (
                    <AvatarImage src={user.image} alt={user.username} />
                  )}
                  {image && (
                    <AvatarImage
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="cursor-pointer absolute w-full h-full inset-0"
                    />
                  )}

                  <AvatarFallback className="cursor-pointer text-4xl">
                    {user.username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CiCamera className="text-2xl bg-white border-2 border-gray-600 rounded-full p-[2px] absolute bottom-0 right-0" />
                <input
                  type="file"
                  id="profile_picture"
                  accept="image/*"
                  className="invisible"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    const target = e.target.files;
                    target && setImage(target[0]);
                  }}
                />
              </label>
              <div className="">
                <span className="font-medium text-2xl">Profile Photo</span>
                <p className="text-gray-500 text-sm">
                  The recommended size is 360x360px or 720x720px
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 xl:gap-8">
                <FormField
                  control={form.control}
                  name="full_name"
                  defaultValue={user.full_name}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Username</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          className="focus-visible:ring-offset-0 focus-visible:ring-[#D4AF37]"
                          id="full_name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  defaultValue={user.username}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Username</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          className="focus-visible:ring-offset-0 focus-visible:ring-[#D4AF37]"
                          id="username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  defaultValue={user.email}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Email</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          className="focus-visible:ring-offset-0 focus-visible:ring-[#D4AF37]"
                          type="email"
                          id="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Phone Number</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          placeholder="Enter a phone number"
                          {...field}
                          value={user.phone ? user.phone : "+998"}
                          onChange={(e) => setPhoneNumber(e)}
                          defaultCountry="UZ"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-9" />
              <div className="w-full flex justify-end mb-4">
                <div className="flex w-full flex-col sm:flex-row justify-end gap-2">
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full md:w-44 bg-[#D4AF37] hover:opacity-70 hover:bg-[#D4AF37]"
                  >
                    Change save
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
