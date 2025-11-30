import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { registerApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Heading,
  Link,
} from "@chakra-ui/react";

export default function Register() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await registerApi(form);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch {
      setError("Registration failed.");
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box bg="gray.800" p={8} rounded="xl" shadow="lg" w="full" maxW="sm">
        <Heading mb={6} textAlign="center" color="white">
          Create Account
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />

            <Input
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />

            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              bg="gray.700"
              color="white"
            />

            {error && (
              <Text color="red.300" fontSize="sm">
                {error}
              </Text>
            )}

            <Button variant="solid" colorScheme="blue" w="full" type="submit">
              Register
            </Button>

            <Text color="gray.400" fontSize="sm" mt={2}>
              Already have an account?{" "}
              <Link as={RouterLink} to="/" color="blue.300">
                Login
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
