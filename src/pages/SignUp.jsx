import React, { useState } from "react";
import "./SignUp.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { signUpWithEmail } from "../firebase/firebase";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Toggle } from "../components/ui/toggle";

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
  email: z.string().email({
    message: "Invalid email provided",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(25, {
      message: "Password must be at most 25 characters.",
    }),
});

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [visible, setVisible] = useState(false);

  function onSubmit(values) {
    const { username, email, password } = values;

    signUpWithEmail(username, email, password, (data, error) => {
      if (error) {
        console.error(error);
      } else {
        navigate("/dashboard");
      }
    });
  }

  return (
    <div className="page signup first">
      <h1 className="header">Sign up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="form">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="timeboxer" {...field} />
                </FormControl>
                <FormDescription>
                  This is how we will refer to you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="test@test.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex w-full max-w-sm items-center space-x-1">
                    <Input
                      type={visible ? "text" : "password"}
                      placeholder="Password goes here..."
                      {...field}
                    />
                    <Toggle
                      aria-label="Toggle visibility"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Toggle>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="submit">
            Submit
          </Button>
          <p className="log-in">
            Already have an account?{" "}
            <span className="link" onClick={() => navigate("/log-in")}>
              Log in
            </span>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
