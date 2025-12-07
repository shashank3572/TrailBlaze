import { useEffect, useState } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Flex,
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

  // loading states for recommendations & set-career action
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [lockingCareer, setLockingCareer] = useState(false);

  // --------------------------
  // LOAD USER
  // --------------------------
  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const res = await getMe();
        if (!mounted) return;
        const userData = res.data;
        setUser(userData);

        // If no careerGoal → fetch recommendations automatically
        if (!userData.careerGoal) {
          await fetchAndSetRecommendation();
        } else {
          // If user already has careerGoal, load progress for it
          fetchProgress(userData.careerGoal);
        }
      } catch (err) {
        console.error("USER ERROR:", err);
      }
    }

    loadUser();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --------------------------
  // AUTO-RECALC WHEN SKILLS CHANGE
  // If the user object is updated in-place (profile page), this will fire.
  // --------------------------
  useEffect(() => {
    // Only trigger when user exists and they don't have a locked careerGoal
    if (!user) return;
    if (!user.careerGoal) {
      fetchAndSetRecommendation();
    }
    // trigger when user.skillLevels changes (length or identity)
  }, [user?.skillLevels]);

  // --------------------------
  // FETCH ROADMAP PROGRESS
  // --------------------------
  const fetchProgress = async (careerTitle) => {
    if (!careerTitle) return;
    setLoadingProgress(true);

    try {
      const res = await getProgress(careerTitle);
      setProgress({
        completed: res.data.completedItemIds?.length || 0,
        total: res.data.totalItems || 0,
      });
    } catch (err) {
      console.error("❌ Progress Fetch Error", err);
      setProgress({ completed: 0, total: 0 });
    } finally {
      setLoadingProgress(false);
    }
  };

  // --------------------------
  // HELPER: fetch recommendation from backend and set state
  // --------------------------
  const fetchAndSetRecommendation = async () => {
    try {
      setLoadingRecommendation(true);
      console.log("⏳ fetching recommendation...");
      const recRes = await getCareerRecommendation();
      console.log("🔁 recRes:", recRes?.data);
      const data = recRes?.data || {};
      const top =
        data.recommended || data.recommendations?.[0]?.title || null;
      setRecommendedCareer(top);
      return top;
    } catch (err) {
      console.error("❌ fetch recommendation failed:", err);
      setRecommendedCareer(null);
      return null;
    } finally {
      setLoadingRecommendation(false);
    }
  };

  // --------------------------
  // LOCK CAREER CHOICE
  // --------------------------
  const setCareerPath = async () => {
    if (!recommendedCareer) return;
    try {
      setLockingCareer(true);
      const res = await client.post("/user/update-profile", {
        careerGoal: recommendedCareer,
      });

      // optimistic update from server response (if it returns updated user)
      if (res?.data?.user) {
        setUser(res.data.user);
      } else {
        setUser((prev) => ({ ...(prev || {}), careerGoal: recommendedCareer }));
      }

      setRecommendedCareer(null);
      fetchProgress(recommendedCareer);
    } catch (err) {
      console.error("❌ setCareerPath failed:", err);
      alert("Failed to lock career. Check console.");
    } finally {
      setLockingCareer(false);
    }
    window.dispatchEvent(new Event("career-updated"));

  };

  // --------------------------
  // MANUAL REFRESH BUTTON
  // --------------------------
  const refreshRecommendation = async () => {
    await fetchAndSetRecommendation();
  };

  // --------------------------
  // Render
  // --------------------------
  const progressPercent =
    progress.total && progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        {user?.name ? `Welcome back, ${user.name} 👋` : "Welcome 👋"}
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Career Card */}
        <Box
          bg="gray.800"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(255,255,255,0.07)"
        >
          <Flex align="center" gap={3} mb={3}>
            <MdWork size={28} />
            <Text fontSize="lg" fontWeight="bold">Career Focus</Text>
          </Flex>

          {user?.careerGoal ? (
            <>
              <Text color="gray.400" mb={4}>{user.careerGoal}</Text>

              <Button
                colorScheme="blue"
                size="sm"
                as={Link}
                to={`/roadmap/${encodeURIComponent(user.careerGoal)}`}
                isDisabled={loadingRecommendation}
              >
                View Roadmap
              </Button>

              <Button
                mt={3}
                size="xs"
                colorScheme="yellow"
                onClick={refreshRecommendation}
                isLoading={loadingRecommendation}
              >
                Refresh Recommendation
              </Button>
            </>
          ) : recommendedCareer ? (
            <>
              <Text color="gray.400" mb={4}>
                Suggested: <strong>{recommendedCareer}</strong>
              </Text>

              <Button
                colorScheme="green"
                size="sm"
                onClick={setCareerPath}
                isLoading={lockingCareer}
                isDisabled={loadingRecommendation || lockingCareer}
              >
                Use this Path
              </Button>

              <Button
                mt={3}
                size="xs"
                colorScheme="yellow"
                onClick={refreshRecommendation}
                isLoading={loadingRecommendation}
                isDisabled={lockingCareer}
              >
                Refresh Recommendation
              </Button>
            </>
          ) : (
            <>
              <Text color="gray.400" mb={4}>Finding the best path for you...</Text>

              <Button
                colorScheme="blue"
                size="sm"
                as={Link}
                to="/profile"
                isDisabled={loadingRecommendation}
              >
                Add Skills
              </Button>
            </>
          )}
        </Box>

        {/* Progress */}
        <Box
          bg="gray.800"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(255,255,255,0.07)"
        >
          <Flex align="center" gap={3} mb={3}>
            <MdChecklist size={28} />
            <Text fontSize="lg" fontWeight="bold">Roadmap Progress</Text>
          </Flex>

          {loadingProgress ? (
            <Spinner />
          ) : progress.total > 0 ? (
            <>
              <Progress
                value={progressPercent}
                size="md"
                colorScheme="blue"
                mb={2}
              />
              <Text fontSize="sm" color="gray.400">
                {progress.completed} / {progress.total} steps completed ({progressPercent}%)
              </Text>
            </>
          ) : (
            <Text color="gray.500">No roadmap selected yet.</Text>
          )}
        </Box>

        {/* Tasks */}
        <Box
          bg="gray.800"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(255,255,255,0.07)"
        >
          <Flex align="center" gap={3} mb={3}>
            <MdTask size={28} />
            <Text fontSize="lg" fontWeight="bold">Weekly Tasks</Text>
          </Flex>

          <Text color="gray.400" mb={4}>
            Tasks syncing soon.
          </Text>

          <Button colorScheme="blue" size="sm" as={Link} to="/tasks">
            View Tasks
          </Button>
        </Box>

        {/* AI Mentor */}
        <Box
          bg="gray.800"
          p={6}
          borderRadius="xl"
          border="1px solid rgba(255,255,255,0.07)"
        >
          <Flex align="center" gap={3} mb={3}>
            <MdChat size={28} />
            <Text fontSize="lg" fontWeight="bold">AI Mentor</Text>
          </Flex>

          <Text color="gray.400" mb={4}>
            Ask anything anytime.
          </Text>

          <Button colorScheme="blue" size="sm" as={Link} to="/chat">
            Open Chat
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
