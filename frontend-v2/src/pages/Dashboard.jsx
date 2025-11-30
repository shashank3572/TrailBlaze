import { useEffect, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  Badge,
  Button,
  Progress,
  Spinner,
} from "@chakra-ui/react";
import { MdWork, MdChecklist, MdChat, MdTask } from "react-icons/md";
import { Link } from "react-router-dom";
import client from "../api/client";
import { getMe } from "../api/userApi";
import { getCareerRecommendation } from "../api/aiApi";
import { getProgress } from "../api/progressApi";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [recommendedCareer, setRecommendedCareer] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.data);

        if (!res.data.careerGoal) {
          getCareerRecommendation().then((recRes) => {
            setRecommendedCareer(recRes.data.recommended);
          });
        } else {
          fetchProgress(res.data.careerGoal);
        }
      })
      .catch((err) => console.log("USER ERROR:", err));
  }, []);

  const fetchProgress = async (careerTitle) => {
    setLoadingProgress(true);

    try {
      const res = await getProgress(careerTitle);
      setProgress({
        completed: res.data.completedItemIds.length,
        total: res.data.totalItems,
      });
    } catch (err) {
      console.log("❌ Progress Fetch Error", err);
    } finally {
      setLoadingProgress(false);
    }
  };

  const setCareerPath = () => {
    client.post("/user/update-profile", { careerGoal: recommendedCareer }).then(() => {
      setUser({ ...user, careerGoal: recommendedCareer });
      setRecommendedCareer(null);
      fetchProgress(recommendedCareer);
    });
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        {user?.name ? `Welcome back, ${user.name} 👋` : "Welcome 👋"}
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>

        {/* Career Card */}
        <Box bg="gray.800" p={6} borderRadius="xl" border="1px solid rgba(255,255,255,0.07)">
          <Flex align="center" gap={3} mb={3}>
            <MdWork size={28} />
            <Text fontSize="lg" fontWeight="bold">Career Focus</Text>
          </Flex>

          {user?.careerGoal ? (
            <>
              <Text color="gray.400" mb={4}>{user.careerGoal}</Text>
              <Button colorScheme="blue" size="sm" as={Link} to={`/roadmap/${encodeURIComponent(user.careerGoal)}`}>
                View Roadmap
              </Button>
            </>
          ) : recommendedCareer ? (
            <>
              <Text color="gray.400" mb={4}>Suggested: <strong>{recommendedCareer}</strong></Text>
              <Button colorScheme="green" size="sm" onClick={setCareerPath}>
                Use this Path
              </Button>
            </>
          ) : (
            <>
              <Text color="gray.400" mb={4}>Finding the best path for you...</Text>
              <Button colorScheme="blue" size="sm" as={Link} to="/profile">
                Add Skills
              </Button>
            </>
          )}
        </Box>

        {/* Progress */}
        <Box bg="gray.800" p={6} borderRadius="xl" border="1px solid rgba(255,255,255,0.07)">
          <Flex align="center" gap={3} mb={3}>
            <MdChecklist size={28} />
            <Text fontSize="lg" fontWeight="bold">Roadmap Progress</Text>
          </Flex>

          {loadingProgress ? (
            <Spinner />
          ) : progress.total > 0 ? (
            <>
              <Progress
                value={(progress.completed / progress.total) * 100}
                size="md"
                colorScheme="blue"
                mb={2}
              />
              <Text fontSize="sm" color="gray.400">
                {progress.completed} / {progress.total} steps completed
              </Text>
            </>
          ) : (
            <Text color="gray.500">No roadmap selected yet.</Text>
          )}
        </Box>

        {/* Tasks */}
        <Box bg="gray.800" p={6} borderRadius="xl" border="1px solid rgba(255,255,255,0.07)">
          <Flex align="center" gap={3} mb={3}>
            <MdTask size={28} />
            <Text fontSize="lg" fontWeight="bold">Weekly Tasks</Text>
          </Flex>
          <Text color="gray.400" mb={4}>Tasks syncing soon.</Text>
          <Button colorScheme="blue" size="sm" as={Link} to="/tasks">
            View Tasks
          </Button>
        </Box>

        {/* AI */}
        <Box bg="gray.800" p={6} borderRadius="xl" border="1px solid rgba(255,255,255,0.07)">
          <Flex align="center" gap={3} mb={3}>
            <MdChat size={28} />
            <Text fontSize="lg" fontWeight="bold">AI Mentor</Text>
          </Flex>
          <Text color="gray.400" mb={4}>Ask anything anytime.</Text>
          <Button colorScheme="blue" size="sm" as={Link} to="/chat">
            Open Chat
          </Button>
        </Box>

      </SimpleGrid>
    </Box>
  );
}
