import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Checkbox,
  VStack,
  Spinner,
  Button,
} from "@chakra-ui/react";

import {
  fetchWeeklyTasks,
  generateWeeklyTasks,
  updateTaskStatus,
} from "../api/taskApi";
import { getMe } from "../api/userApi";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [careerGoal, setCareerGoal] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await fetchWeeklyTasks();
      console.log("🔥 Weekly tasks fetched:", res.data);
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Task fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTasks = async () => {
    if (!careerGoal) {
      alert("⚠️ Set a career goal in Dashboard/Profile first.");
      return;
    }

    setLoading(true);
    try {
      const res = await generateWeeklyTasks();
      console.log("✨ Generated tasks:", res.data);
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Task generation error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId, checked) => {
    try {
      await updateTaskStatus(taskId, checked);
      await loadTasks();
    } catch (err) {
      console.error("Task update error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setCareerGoal(me.data.careerGoal || null);
      } catch (err) {
        console.error("User fetch error:", err.response?.data || err.message);
      }
      await loadTasks();
    })();
  }, []);

  if (loading) return <Spinner size="xl" mt="50px" />;

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Weekly Learning Tasks 📅
      </Text>

      {!careerGoal && (
        <Text color="red.300" mb={4}>
          ⚠ No career selected — go to Dashboard/Profile and set one.
        </Text>
      )}

      {tasks.length === 0 ? (
        <>
          <Text color="gray.400" mb={4}>
            No weekly tasks yet.
          </Text>
          <Button colorScheme="green" onClick={createTasks}>
            ➕ Generate Weekly Tasks
          </Button>
        </>
      ) : (
        <>
          <VStack align="stretch" spacing={3}>
            {tasks.map((task) => (
              <Box
                key={task._id}
                p={4}
                bg="gray.800"
                borderRadius="md"
                border="1px solid rgba(255,255,255,0.07)"
              >
                <Checkbox
                  size="lg"
                  isChecked={task.completed}
                  onChange={(e) => toggleTask(task._id, e.target.checked)}
                >
                  <Text ml={2} fontSize="lg" fontWeight="bold">
                    {task.title}
                  </Text>
                </Checkbox>

                {task.estimateHours && (
                  <Text fontSize="sm" color="gray.400">
                    ⏳ {task.estimateHours} hours
                  </Text>
                )}
              </Box>
            ))}
          </VStack>

          <Button mt={6} colorScheme="blue" onClick={createTasks}>
            🔁 Regenerate Tasks
          </Button>
        </>
      )}
    </Box>
  );
}
