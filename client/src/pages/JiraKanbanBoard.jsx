import React, { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Search,
  Settings,
  ChevronDown,
  Star,
} from "lucide-react";

const JiraKanbanBoard = () => {
  const [issues, setIssues] = useState([
    {
      id: "SCRUM-1",
      title: "As a user, I can create and manage tasks",
      description:
        "Implement task creation functionality with full CRUD operations",
      status: "todo",
      priority: "high",
      assignee: "John Doe",
      storyPoints: 8,
      type: "story",
      avatar: "JD",
    },
    {
      id: "SCRUM-2",
      title: "Design system component library",
      description: "Create reusable UI components following design system",
      status: "todo",
      priority: "medium",
      assignee: "Jane Smith",
      storyPoints: 5,
      type: "task",
      avatar: "JS",
    },
    {
      id: "SCRUM-3",
      title: "Set up automated testing pipeline",
      description: "Configure Jest and Cypress for comprehensive testing",
      status: "inprogress",
      priority: "high",
      assignee: "Bob Wilson",
      storyPoints: 13,
      type: "story",
      avatar: "BW",
    },
    {
      id: "SCRUM-4",
      title: "Login validation not working with special characters",
      description:
        "Users cannot login when password contains special characters",
      status: "inprogress",
      priority: "critical",
      assignee: "Alice Chen",
      storyPoints: 3,
      type: "bug",
      avatar: "AC",
    },
    {
      id: "SCRUM-5",
      title: "Database migration scripts",
      description: "Create migration scripts for production deployment",
      status: "done",
      priority: "medium",
      assignee: "Mike Davis",
      storyPoints: 5,
      type: "task",
      avatar: "MD",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [draggedIssue, setDraggedIssue] = useState(null);

  const columns = [
    { id: "todo", title: "TO DO", bgColor: "#f8fafc", textColor: "#64748b" },
    {
      id: "inprogress",
      title: "IN PROGRESS",
      bgColor: "#eff6ff",
      textColor: "#1d4ed8",
    },
    { id: "done", title: "DONE", bgColor: "#f0fdf4", textColor: "#059669" },
  ];

  const handleDragStart = (e, issue) => {
    setDraggedIssue(issue);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", issue.id);

    // Add drag styling
    setTimeout(() => {
      e.target.style.opacity = "0.5";
      e.target.style.transform = "rotate(5deg)";
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    e.target.style.transform = "rotate(0deg)";

    setTimeout(() => {
      setDraggedIssue(null);
    }, 50);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();

    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId && draggedIssue) {
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.id === draggedId ? { ...issue, status: newStatus } : issue
        )
      );
    }
  };

  const handleCardClick = (issue) => {
    openIssueModal(issue);
  };

  const getAssigneeAvatar = (assigneeName) => {
    const avatarMap = {
      "John Doe": "JD",
      "Jane Smith": "JS",
      "Bob Wilson": "BW",
      "Alice Chen": "AC",
      "Mike Davis": "MD",
      "Sarah Johnson": "SJ",
      "Tom Brown": "TB",
    };
    return (
      avatarMap[assigneeName] ||
      assigneeName
        .split(" ")
        .map((n) => n[0])
        .join("")
    );
  };

  const updateIssue = (issueId, updates) => {
    // If assignee is being updated, also update the avatar
    if (updates.assignee) {
      updates.avatar = getAssigneeAvatar(updates.assignee);
    }

    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === issueId ? { ...issue, ...updates } : issue
      )
    );
    // Update the selected issue as well
    setSelectedIssue((prev) => ({ ...prev, ...updates }));
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "critical":
        return "🔴";
      case "high":
        return "🔺";
      case "medium":
        return "🟡";
      case "low":
        return "🔽";
      default:
        return "⚪";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "story":
        return { icon: "S", color: "#22c55e" };
      case "task":
        return { icon: "✓", color: "#3b82f6" };
      case "bug":
        return { icon: "!", color: "#ef4444" };
      default:
        return { icon: "?", color: "#64748b" };
    }
  };

  const openIssueModal = (issue) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  const IssueCard = ({ issue }) => {
    const typeInfo = getTypeIcon(issue.type);

    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, issue)}
        onDragEnd={handleDragEnd}
        onClick={() => handleCardClick(issue)}
        style={{
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          marginBottom: "12px",
          cursor: "pointer",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease-in-out",
          userSelect: "none",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.borderColor = "#cbd5e1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.borderColor = "#e2e8f0";
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {issue.id}
          </span>
          <MoreHorizontal
            style={{ width: "16px", height: "16px", color: "#94a3b8" }}
          />
        </div>

        <h4
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#1e293b",
            marginBottom: "12px",
            lineHeight: "1.4",
            margin: "0 0 12px 0",
          }}
        >
          {issue.title}
        </h4>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: typeInfo.color,
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              {typeInfo.icon}
            </div>
            <span style={{ fontSize: "12px" }}>
              {getPriorityIcon(issue.priority)}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {issue.storyPoints && (
              <span
                style={{
                  fontSize: "12px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: "500",
                }}
              >
                {issue.storyPoints}
              </span>
            )}
            <div
              style={{
                width: "24px",
                height: "24px",
                background: "linear-gradient(135deg, #60a5fa, #2563eb)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                fontWeight: "600",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
              {issue.avatar}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Jira Header */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e2e8f0",
          padding: "12px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#2563eb",
                  borderRadius: "4px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                S
              </div>
              <div>
                <h1
                  style={{
                    fontWeight: "600",
                    color: "#1e293b",
                    margin: 0,
                    fontSize: "16px",
                  }}
                >
                  Scrum Board
                </h1>
                <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                  Software project
                </p>
              </div>
            </div>
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                fontSize: "14px",
              }}
            >
              <a
                href="#"
                style={{
                  color: "#2563eb",
                  fontWeight: "500",
                  borderBottom: "2px solid #2563eb",
                  paddingBottom: "12px",
                  textDecoration: "none",
                }}
              >
                Board
              </a>
              <a
                href="#"
                style={{
                  color: "#64748b",
                  paddingBottom: "12px",
                  textDecoration: "none",
                }}
              >
                Backlog
              </a>
              <a
                href="#"
                style={{
                  color: "#64748b",
                  paddingBottom: "12px",
                  textDecoration: "none",
                }}
              >
                Reports
              </a>
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Search
              style={{
                width: "20px",
                height: "20px",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            />
            <Star
              style={{
                width: "20px",
                height: "20px",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            />
            <Settings
              style={{
                width: "20px",
                height: "20px",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>

      {/* Board Controls */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#64748b",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span>Group by</span>
              <ChevronDown style={{ width: "16px", height: "16px" }} />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "24px",
                    height: "24px",
                    background: "linear-gradient(135deg, #60a5fa, #2563eb)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginLeft: i > 1 ? "-4px" : "0",
                    border: "2px solid white",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <button
              style={{
                fontSize: "14px",
                color: "#64748b",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              + 3 more
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{ padding: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {columns.map((column) => (
            <div
              key={column.id}
              style={{ minHeight: "400px" }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontWeight: "600",
                    color: column.textColor,
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: 0,
                  }}
                >
                  {column.title}
                </h3>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      backgroundColor: "#e2e8f0",
                      color: "#64748b",
                      fontSize: "12px",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {
                      issues.filter((issue) => issue.status === column.id)
                        .length
                    }
                  </span>
                  <Plus
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#94a3b8",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  backgroundColor: column.bgColor,
                  borderRadius: "8px",
                  padding: "16px",
                  minHeight: "320px",
                }}
              >
                {issues
                  .filter((issue) => issue.status === column.id)
                  .map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedIssue && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "800px",
              maxHeight: "90vh",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: getTypeIcon(selectedIssue.type).color,
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {getTypeIcon(selectedIssue.type).icon}
                </div>
                <span style={{ fontSize: "14px", color: "#64748b" }}>
                  {selectedIssue.id}
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  color: "#94a3b8",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "24px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#1e293b",
                  marginBottom: "16px",
                  margin: "0 0 16px 0",
                }}
              >
                {selectedIssue.title}
              </h2>

              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Description
                </label>
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "16px",
                    borderRadius: "6px",
                  }}
                >
                  <p style={{ margin: 0, color: "#1e293b" }}>
                    {selectedIssue.description}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={selectedIssue.status}
                    onChange={(e) =>
                      updateIssue(selectedIssue.id, { status: e.target.value })
                    }
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      backgroundColor: "white",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Assignee
                  </label>
                  <select
                    value={selectedIssue.assignee}
                    onChange={(e) =>
                      updateIssue(selectedIssue.id, {
                        assignee: e.target.value,
                      })
                    }
                    style={{
                      fontSize: "14px",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      backgroundColor: "white",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Bob Wilson">Bob Wilson</option>
                    <option value="Alice Chen">Alice Chen</option>
                    <option value="Mike Davis">Mike Davis</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Tom Brown">Tom Brown</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Priority
                  </label>
                  <select
                    value={selectedIssue.priority}
                    onChange={(e) =>
                      updateIssue(selectedIssue.id, {
                        priority: e.target.value,
                      })
                    }
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      backgroundColor: "white",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <option value="low">🔽 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔺 High</option>
                    <option value="critical">🔴 Critical</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Story Points
                  </label>
                  <select
                    value={selectedIssue.storyPoints}
                    onChange={(e) =>
                      updateIssue(selectedIssue.id, {
                        storyPoints: parseInt(e.target.value),
                      })
                    }
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      backgroundColor: "white",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={8}>8</option>
                    <option value={13}>13</option>
                    <option value={21}>21</option>
                  </select>
                </div>
              </div>

              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    fontStyle: "italic",
                  }}
                >
                  Changes are saved automatically
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JiraKanbanBoard;
