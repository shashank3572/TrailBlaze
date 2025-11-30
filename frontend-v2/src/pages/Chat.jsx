import { useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  Text,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import client from "../api/client";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    
    setLoading(true);

    try {
      const res = await client.post("/ai/chat", { message: input });

      const botMsg = { role: "assistant", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Error connecting to AI service." },
      ]);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <Box p={4} height="100%" display="flex" flexDirection="column">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        AI Mentor 💬
      </Text>

      <VStack
        spacing={3}
        flex="1"
        overflowY="auto"
        align="stretch"
        p={3}
        bg="gray.800"
        borderRadius="lg"
      >
        {messages.map((msg, i) => (
          <Flex
            key={i}
            justify={msg.role === "user" ? "flex-end" : "flex-start"}
          >
            <Box
              maxW="75%"
              p={3}
              bg={msg.role === "user" ? "blue.600" : "gray.700"}
              borderRadius="lg"
            >
              <Text>{msg.text}</Text>
            </Box>
          </Flex>
        ))}

        {loading && <Spinner alignSelf="center" />}
      </VStack>

      <Flex mt={3} gap={2}>
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button colorScheme="blue" onClick={sendMessage}>
          Send
        </Button>
      </Flex>
    </Box>
  );
}
