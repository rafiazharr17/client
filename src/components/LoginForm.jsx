import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const LoginForm = ({ onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { error, session } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      console.log("Session after login:", session); // Debugging line

      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (profileError) throw profileError;

      console.log("Profile after login:", profile); // Debugging line

      toast({
        title: "Login successful.",
        description: `Welcome back, ${profile.is_admin ? "Admin" : "User"}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      if (profile.is_admin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
      toast({
        title: "Login failed.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-blue-800 bg-white p-8 rounded-lg shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Login
      </h2>
      {error && (
        <p className="text-blue-500 mb-4 text-center bg-blue-100 p-2 rounded">
          {error}
        </p>
      )}
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center">
        Don't have an account?{" "}
        <button
          onClick={onRegisterClick}
          className="text-blue-600 hover:underline font-semibold"
        >
          Register
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;
