// frontend-v2/src/pages/Profile.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SimpleGrid,
  IconButton,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import client from "../api/client";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [skillLevels, setSkillLevels] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(5);
  const [saving, setSaving] = useState(false);

  // Fetch user
  useEffect(() => {
    client.get("/user/profile").then((res) => {
      setUser(res.data);
      setSkillLevels(res.data.skillLevels || []);
    });
  }, []);

  const saveSkillLevels = async (updated) => {
    setSaving(true);
    try {
      await client.post("/user/update-profile", { skillLevels: updated });
      setSkillLevels(updated);
    } catch (err) {
      console.error("Failed to save skills:", err);
    } finally {
      setSaving(false);
    }
  };

  const upsertSkill = async () => {
    const name = skillName.trim();
    if (!name) return;

    // check if exists → update level, else add new
    const existingIndex = skillLevels.findIndex(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );

    let updated;
    if (existingIndex !== -1) {
      updated = [...skillLevels];
      updated[existingIndex] = { ...updated[existingIndex], level: skillLevel };
    } else {
      updated = [...skillLevels, { name, level: skillLevel }];
    }

    await saveSkillLevels(updated);
    setSkillName("");
    setSkillLevel(5);
  };

  const removeSkill = async (name) => {
    const updated = skillLevels.filter(
      (s) => s.name.toLowerCase() !== name.toLowerCase()
    );
    await saveSkillLevels(updated);
  };

  if (!user) return <Skeleton height="200px" borderRadius="lg" />;

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        Profile & Skills
      </Text>
      <Text fontSize="sm" color="gray.400" mb={6}>
        Tell TrailBlaze what you already know so your roadmap can adapt.
      </Text>

      {/* Skill tiles */}
      <Text fontWeight="medium" mb={2}>
        Your Skill Levels
      </Text>

      {skillLevels.length === 0 && (
        <Text fontSize="sm" color="gray.500" mb={3}>
          No skills added yet. Start by adding what you know (e.g., HTML, CSS, JavaScript).
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
        {skillLevels.map((skill) => (
          <Box
            key={skill.name}
            bg="gray.800"
            borderRadius="lg"
            border="1px solid rgba(255,255,255,0.08)"
            p={4}
          >
            <Flex justify="space-between" align="center" mb={1}>
              <Text fontWeight="semibold">{skill.name}</Text>
              <IconButton
                aria-label="Remove skill"
                icon={<MdDelete />}
                size="sm"
                variant="ghost"
                onClick={() => removeSkill(skill.name)}
              />
            </Flex>

            <Text fontSize="sm" color="gray.400" mb={2}>
              Level: {skill.level} / 10
            </Text>
            <Badge
              colorScheme={
                skill.level >= 8 ? "green" : skill.level >= 5 ? "blue" : "yellow"
              }
            >
              {skill.level >= 8
                ? "Strong"
                : skill.level >= 5
                ? "Intermediate"
                : "Beginner"}
            </Badge>
          </Box>
        ))}
      </SimpleGrid>

      {/* Add / edit skill form */}
      <Box
        bg="gray.800"
        borderRadius="lg"
        border="1px solid rgba(255,255,255,0.08)"
        p={4}
      >
        <Text fontWeight="medium" mb={3}>
          Add or update a skill
        </Text>

        <Flex gap={3} mb={4} direction={{ base: "column", md: "row" }}>
          <Input
            placeholder="e.g. HTML, CSS, JavaScript, React..."
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />

          <Box flex="1">
            <Text fontSize="sm" color="gray.400" mb={1}>
              Level: {skillLevel} / 10
            </Text>
            <Slider
              min={1}
              max={10}
              value={skillLevel}
              onChange={setSkillLevel}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Button
            colorScheme="green"
            onClick={upsertSkill}
            isLoading={saving}
            alignSelf={{ base: "stretch", md: "center" }}
          >
            Save Skill
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
