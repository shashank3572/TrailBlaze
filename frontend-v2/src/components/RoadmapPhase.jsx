import { useState } from "react";
import {
  VStack,
  HStack,
  Box,
  Text,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import RoadmapNode from "./RoadmapNode";

export default function RoadmapPhase({ phase, completedIds, onToggleStep }) {
  const [open, setOpen] = useState(true);

  return (
    <VStack spacing={4} align="stretch" className="phase-graph">
      {/* Phase header "card" */}
      <HStack
        className="phase-header-row"
        justify="space-between"
        onClick={() => setOpen(!open)}
      >
        <HStack spacing={2}>
          <IconButton
            aria-label="Toggle phase"
            icon={open ? <FiChevronDown /> : <FiChevronRight />}
            size="sm"
            variant="ghost"
          />
          <Text fontSize="lg" fontWeight="bold">
            Phase {phase.phase}
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.400">
          {phase.steps.length} steps
        </Text>
      </HStack>

      <Collapse in={open} animateOpacity>
        {/* Vertical connector from header */}
        <Box className="phase-connector-vertical" />

        {/* Horizontal bar + children nodes */}
        <Box className="phase-children-row">
          {phase.steps.map((step) => {
            const isCompleted = completedIds.includes(step.id);
            return (
              <Box key={step.id} className="phase-child-wrapper">
                <RoadmapNode
                  step={step}
                  isCompleted={isCompleted}
                  onToggle={() => onToggleStep(step.id)}
                  className={isCompleted ? "completed-node" : ""}
                />
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </VStack>
  );
}
