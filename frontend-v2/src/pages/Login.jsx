import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { loginApi } from "../api/authApi";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Heading,
  Link,
} from "@chakra-ui/react";

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(form);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <Box minH="100vh" bg="gray.900" display="flex" alignItems="center" justifyContent="center">
      <Box bg="gray.800" p={8} rounded="xl" shadow="lg" w="full" maxW="sm">
        <Heading mb={6} color="white" size="lg" textAlign="center">
          TrailBlaze Login
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Text color="gray.300" fontSize="sm">Email</Text>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              bg="gray.700"
              border="none"
              color="white"
              placeholder="you@example.com"
            />

            <Text color="gray.300" fontSize="sm">Password</Text>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              bg="gray.700"
              border="none"
              color="white"
              placeholder="••••••••"
            />

            {error && (
              <Text color="red.300" fontSize="sm">
                {error}
              </Text>
            )}

            <Button type="submit" colorScheme="blue" w="full">
              Login
            </Button>

            <Text color="gray.400" fontSize="sm" textAlign="center">
              No account?{" "}
              <Link as={RouterLink} to="/register" color="blue.300">
                Register
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
