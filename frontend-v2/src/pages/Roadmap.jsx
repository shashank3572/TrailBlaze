import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import client from "../api/client";
import "../styles/roadmap.css";
import RoadmapPhase from "../components/RoadmapPhase";

export default function Roadmap() {
  const { career } = useParams();
  const careerTitle = decodeURIComponent(career);

  const [roadmap, setRoadmap] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);

  const autoModal = useDisclosure();

  useEffect(() => {
    if (!careerTitle) return;

    const encoded = encodeURIComponent(careerTitle);

    (async () => {
      try {
        const careerRes = await client.get(`/careers/title/${encoded}`);
        const progressRes = await client.get(`/careers/${encoded}/progress`);
        const suggestionRes = await client.get(`/careers/${encoded}/autocomplete`);

        setRoadmap(careerRes.data);
        setCompleted(progressRes.data.completedItemIds || []);

        if (
          suggestionRes.data.autoComplete.length &&
          (progressRes.data.completedItemIds || []).length === 0
        ) {
          setSuggested(suggestionRes.data.autoComplete);
          autoModal.onOpen();
        }
      } catch (err) {
        console.error("⚠ Error fetching roadmap:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [careerTitle]);

  const toggleStep = async (stepId) => {
    const updated = completed.includes(stepId)
      ? completed.filter((id) => id !== stepId)
      : [...completed, stepId];

    setCompleted(updated);
    await client.post(`/careers/${encodeURIComponent(careerTitle)}/progress`, {
      completedItemIds: updated,
    });
  };

  const applyAutoComplete = async () => {
    const updated = [...new Set([...completed, ...suggested])];
    setCompleted(updated);

    await client.post(`/careers/${encodeURIComponent(careerTitle)}/progress`, {
      completedItemIds: updated,
    });

    autoModal.onClose();
  };

  if (loading) return <Spinner size="xl" mt="50px" />;
  if (!roadmap) return <Text>⚠ No roadmap data found.</Text>;

  const totalSteps = roadmap.roadmap?.flatMap((p) => p.steps).length || 0;

  return (
    <Box p="4">
      <Modal isOpen={autoModal.isOpen} onClose={autoModal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Smart Progress Match</ModalHeader>
          <ModalBody>
            We detected your skills match <strong>{suggested.length}</strong> roadmap steps.
            Want us to auto mark them as completed?
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="ghost" onClick={autoModal.onClose}>
              No thanks
            </Button>
            <Button colorScheme="green" onClick={applyAutoComplete}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box textAlign="center" mb="30px">
        <Heading fontSize="2xl" mb="2">
          {careerTitle} Roadmap
        </Heading>

        {totalSteps > 0 && (
          <>
            <progress
              value={completed.length}
              max={totalSteps}
              style={{ width: "100%" }}
            />
            <Text mt="2" fontSize="sm" color="gray.400">
              {completed.length} / {totalSteps} steps completed
            </Text>
          </>
        )}
      </Box>

      <div className="roadmap-container">
        {roadmap.roadmap?.map((phase, i) => (
          <RoadmapPhase
            key={i}
            phase={phase}
            completedIds={completed}
            onToggleStep={toggleStep}
          />
        ))}
      </div>

      {/* ✅ NEW COURSE SECTION — DOES NOT AFFECT ANY BACKEND/LOGIC */}
      {roadmap.courses && roadmap.courses.length > 0 && (
        <Box mt="50px">
          <Heading fontSize="xl" mb="4">
            Recommended Courses
          </Heading>

          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(260px, 1fr))"
            gap="20px"
          >
            {roadmap.courses.map((course, index) => (
              <Box
                key={index}
                p="5"
                bg="gray.800"
                borderRadius="lg"
                boxShadow="md"
                border="1px solid rgba(255,255,255,0.1)"
              >
                <Text fontSize="sm" color="gray.400" mb="1">
                  {course.provider}
                </Text>

                <Heading fontSize="md" mb="3">
                  {course.title}
                </Heading>

                <Button
                  as="a"
                  href={course.url}
                  target="_blank"
                  colorScheme="blue"
                  size="sm"
                  width="100%"
                >
                  View Course
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
