import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../assets/logo.png";

const LandingPage = ({ session }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/home");
    }
  }, [session, navigate]);

  const handleEnter = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-blue-900 to-black text-blue-100 p-4 overflow-hidden"
        >
          <div className="flex-grow flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-12"
            >
              <img src={logo} alt="logo" className="mx-auto mb-4 w-32 h-32" />
              <h1 className="text-6xl font-bold mb-4 text-blue-400">
                Cloud Hotstar
              </h1>
              <p className="text-xl mb-8 text-blue-200">
                Jelajahi Dunia Sinema dalam Genggaman Anda
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-4xl"
            >
              {[
                "Action",
                "Comedy",
                "Drama",
                "Sci-Fi",
                "Horror",
                "Romance",
                "Animation",
                "Thriller",
              ].map((genre, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                  }}
                  className="bg-blue-800/30 p-6 rounded-lg text-center shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-blue-200">
                    {genre}
                  </h3>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
              className="bg-blue-600 text-blue-100 font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-colors"
              onClick={handleEnter}
            >
              Mulai Menjelajah
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-sm text-blue-400"
          >
            © 2024 Cloud Hotstar. All rights reserved.
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <LoginForm
          onRegisterClick={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      >
        <RegisterForm
          onLoginClick={() => {
            setIsRegisterModalOpen(true);
            setIsLoginModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default LandingPage;
