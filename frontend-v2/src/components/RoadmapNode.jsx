import { Box, Text, HStack, Icon, Badge } from "@chakra-ui/react";
import { FiCode, FiLayers, FiCheckCircle } from "react-icons/fi";

export default function RoadmapNode({ step, isCompleted, onToggle, className = "" }) {
  // styling based on step type
  const type = step.type || "skill";

  const typeConfig = {
    skill: {
      color: "blue.400",
      label: "Skill",
      icon: FiCode,
    },
    project: {
      color: "green.400",
      label: "Project",
      icon: FiLayers,
    },
  };

  const cfg = typeConfig[type] || typeConfig.skill;

  return (
    <Box
      className={className}
      onClick={onToggle}
      cursor="pointer"
      p={4}
      minW="220px"
      borderWidth="2px"
      borderColor={isCompleted ? "green.400" : cfg.color}
      borderRadius="md"
      bg={isCompleted ? "green.900" : "gray.900"}
      textAlign="left"
      transition="all .25s ease"
      transform={isCompleted ? "scale(1.04)" : "scale(1)"}
      _hover={{
        boxShadow: "0px 0px 14px rgba(99,179,237,0.4)",
        transform: "scale(1.06)",
      }}
    >
      <HStack justify="space-between" mb={2}>
        <HStack>
          <Icon as={cfg.icon} />
          <Text fontWeight="bold" fontSize="md">
            {step.title}
          </Text>
        </HStack>

        {isCompleted && (
          <Icon as={FiCheckCircle} color="green.300" boxSize={5} />
        )}
      </HStack>

      <Text fontSize="sm" color="gray.400" mb={2}>
        {step.detail}
      </Text>

      <HStack justify="space-between">
        <Badge colorScheme={isCompleted ? "green" : "blue"} variant="subtle">
          {cfg.label}
        </Badge>

        {step.estimateHours && (
          <Text fontSize="xs" color="gray.500">
            {step.estimateHours} hrs
          </Text>
        )}
      </HStack>
    </Box>
  );
}
