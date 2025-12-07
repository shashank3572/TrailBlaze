import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Avatar,
  Badge,
  Button,
} from "@chakra-ui/react";

import {
  MdMenu,
  MdClose,
  MdDashboard,
  MdExplore,
  MdChat,
  MdAssignment,
  MdChecklist,
  MdPerson,
  MdNotifications,
} from "react-icons/md";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMe } from "../api/userApi";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const [hovered, setHovered] = useState(false);
  const sidebarOpen = hovered || !collapsed;

  const [careerGoal, setCareerGoal] = useState(null); // FIXED: store from backend
  const location = useLocation();
  const navigate = useNavigate();

  // ------------------------------
  // LOAD USER PROFILE FOR CAREER
  // ------------------------------
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getMe();
        setCareerGoal(res.data?.careerGoal || null);
      } catch (err) {
        console.log("Failed to load user in sidebar:", err);
      }
    }

    loadUser();

    // Listen for dashboard updates
    window.addEventListener("career-updated", loadUser);

    return () => {
      window.removeEventListener("career-updated", loadUser);
    };
  }, []);

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: MdDashboard, path: "/dashboard" },
    { key: "careers", label: "Explore Careers", icon: MdExplore, path: "/careers" },
    { key: "roadmap", label: "My Roadmap", icon: MdChecklist, path: "/roadmap" },
    { key: "tasks", label: "Weekly Tasks", icon: MdAssignment, path: "/tasks" },
    { key: "chat", label: "AI Mentor", icon: MdChat, path: "/chat" },
    { key: "profile", label: "Profile", icon: MdPerson, path: "/profile" },
  ];

  const handleRoadmapClick = () => {
    if (!careerGoal) return;
    navigate(`/roadmap/${encodeURIComponent(careerGoal)}`);
  };

  return (
    <Flex h="100vh" bg="gray.900" color="white">
      {/* Sidebar */}
      <Box
        w={sidebarOpen ? "220px" : "60px"}
        bg="gray.800"
        p="12px"
        borderRight="1px solid rgba(255,255,255,0.1)"
        transition="all 0.25s ease"
        onMouseEnter={() => collapsed && setHovered(true)}
        onMouseLeave={() => collapsed && setHovered(false)}
      >
        <IconButton
          icon={sidebarOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
          onClick={() => setCollapsed(!collapsed)}
          variant="ghost"
          color="gray.300"
          mb="22px"
          aria-label="Toggle sidebar"
        />

        {navItems.map((item) => {
          const isRoadmap = item.key === "roadmap";
          const isActive = isRoadmap
            ? location.pathname.startsWith("/roadmap")
            : location.pathname === item.path;

          // Sidebar styles
          const baseStyles = {
            align: "center",
            gap: sidebarOpen ? 10 : 0,
            p: "10px",
            rounded: "md",
            cursor: isRoadmap && !careerGoal ? "not-allowed" : "pointer",
            bg: isActive ? "blue.600" : "transparent",
            _hover: { bg: isActive ? "blue.600" : "gray.700" },
            justify: sidebarOpen ? "flex-start" : "center",
            opacity: isRoadmap && !careerGoal ? 0.4 : 1,
          };

          const content = (
            <Flex
              {...baseStyles}
              onClick={isRoadmap ? handleRoadmapClick : undefined}
            >
              <item.icon size={22} />
              {sidebarOpen && <Text fontSize="14px">{item.label}</Text>}
            </Flex>
          );

          if (isRoadmap) {
            return <Box key={item.key}>{content}</Box>;
          }

          return (
            <Link key={item.key} to={item.path}>
              {content}
            </Link>
          );
        })}
      </Box>

      {/* Right Side */}
      <Flex flex="1" direction="column">
        {/* Top Bar */}
        <Flex
          p="16px"
          justify="flex-end"
          align="center"
          gap="18px"
          borderBottom="1px solid rgba(255,255,255,0.1)"
        >
          <Badge colorScheme="green" px="10px" py="6px" rounded="md">
            87 🏆
          </Badge>

          <Button size="sm" colorScheme="blue" as={Link} to="/chat">
            Ask AI
          </Button>

          <IconButton
            icon={<MdNotifications size={22} />}
            variant="ghost"
            aria-label="Notifications"
          />
          <Avatar size="sm" name="User" />
        </Flex>

        {/* Page Content */}
        <Box
          flex="1"
          p="24px"
          overflowY="auto"
          display="flex"
          justifyContent="center"
        >
          <Box width="100%" maxW="1200px">
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
