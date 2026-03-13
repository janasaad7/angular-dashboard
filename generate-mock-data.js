#!/usr/bin/env node

/**
 * Mock Data Generator Script
 * 
 * Generates comprehensive mock data for the Angular Dashboard application
 * based on the test criteria and requirements from test.md
 * 
 * Usage:
 *   node generate-mock-data.js
 *   npm run generate:mock-data
 */

const fs = require('fs');
const path = require('path');

/**
 * Add days to a date
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Generate unique ID
 */
function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate mock users
 */
function generateUsers() {
  return [
    {
      id: 'user-001',
      name: 'John Doe',
      avatar: 'JD',
      email: 'john.doe@company.com',
      role: 'Developer'
    },
    {
      id: 'user-002',
      name: 'Sarah Smith',
      avatar: 'SS',
      email: 'sarah.smith@company.com',
      role: 'Designer'
    },
    {
      id: 'user-003',
      name: 'Mike Johnson',
      avatar: 'MJ',
      email: 'mike.johnson@company.com',
      role: 'Project Manager'
    },
    {
      id: 'user-004',
      name: 'Emily Davis',
      avatar: 'ED',
      email: 'emily.davis@company.com',
      role: 'QA Engineer'
    }
  ];
}

/**
 * Generate mock tasks based on test criteria
 */
function generateTasks() {
  const now = new Date();
  const users = generateUsers();

  const tasks = [
    // TODO TASKS
    {
      id: 'task-001',
      title: 'Design new homepage layout',
      description: 'Create wireframes and mockups for the new homepage redesign with modern UI elements',
      status: 'todo',
      priority: 'high',
      dueDate: formatDate(addDays(now, 2)),
      assignee: users[0],
      tags: ['Design', 'Frontend'],
      createdAt: addDays(now, -2).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-002',
      title: 'Update documentation',
      description: 'Review and update API documentation for v2.0 release',
      status: 'todo',
      priority: 'medium',
      dueDate: formatDate(addDays(now, 5)),
      assignee: users[1],
      tags: ['Documentation'],
      createdAt: addDays(now, -3).toISOString(),
      updatedAt: addDays(now, -1).toISOString()
    },
    {
      id: 'task-003',
      title: 'Fix responsive design issues',
      description: 'Address layout problems on mobile and tablet devices',
      status: 'todo',
      priority: 'high',
      dueDate: formatDate(addDays(now, 3)),
      assignee: users[3],
      tags: ['Frontend', 'Bug Fix'],
      createdAt: addDays(now, -5).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-004',
      title: 'Organize team meeting',
      description: 'Schedule and prepare agenda for quarterly planning session',
      status: 'todo',
      priority: 'low',
      dueDate: formatDate(addDays(now, 7)),
      assignee: users[2],
      tags: ['Admin', 'Planning'],
      createdAt: addDays(now, -4).toISOString(),
      updatedAt: addDays(now, -1).toISOString()
    },

    // OVERDUE TODO TASKS
    {
      id: 'task-015',
      title: 'Prepare Q4 budget report',
      description: 'Compile and analyze financial data for quarterly budget presentation',
      status: 'todo',
      priority: 'high',
      dueDate: formatDate(addDays(now, -2)),
      isOverdue: true,
      assignee: users[1],
      tags: ['Finance', 'Critical'],
      createdAt: addDays(now, -16).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-016',
      title: 'Review client feedback',
      description: 'Analyze customer feedback from user testing sessions',
      status: 'todo',
      priority: 'medium',
      dueDate: formatDate(addDays(now, -3)),
      isOverdue: true,
      assignee: users[3],
      tags: ['Research', 'Feedback'],
      createdAt: addDays(now, -15).toISOString(),
      updatedAt: addDays(now, -1).toISOString()
    },

    // IN PROGRESS TASKS
    {
      id: 'task-005',
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication system with refresh tokens',
      status: 'in_progress',
      priority: 'high',
      dueDate: formatDate(addDays(now, 3)),
      assignee: users[0],
      tags: ['Backend', 'Security'],
      createdAt: addDays(now, -7).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-006',
      title: 'Optimize database queries',
      description: 'Review and optimize slow queries identified in performance audit',
      status: 'in_progress',
      priority: 'medium',
      dueDate: formatDate(addDays(now, 4)),
      assignee: users[1],
      tags: ['Performance', 'Backend'],
      createdAt: addDays(now, -6).toISOString(),
      updatedAt: addDays(now, -0.5).toISOString()
    },
    {
      id: 'task-007',
      title: 'Create API endpoints',
      description: 'Develop RESTful API endpoints for task management features',
      status: 'in_progress',
      priority: 'high',
      dueDate: formatDate(addDays(now, 2)),
      assignee: users[2],
      tags: ['Backend', 'API'],
      createdAt: addDays(now, -8).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-008',
      title: 'Add dark mode support',
      description: 'Implement theme toggle with dark/light mode preferences',
      status: 'in_progress',
      priority: 'medium',
      dueDate: formatDate(addDays(now, 6)),
      assignee: users[3],
      tags: ['Frontend', 'UI/UX'],
      createdAt: addDays(now, -9).toISOString(),
      updatedAt: addDays(now, -0.3).toISOString()
    },

    // OVERDUE IN PROGRESS TASK
    {
      id: 'task-017',
      title: 'Update payment gateway integration',
      description: 'Migrate to new payment provider API and update billing logic',
      status: 'in_progress',
      priority: 'high',
      dueDate: formatDate(addDays(now, -1)),
      isOverdue: true,
      assignee: users[0],
      tags: ['Backend', 'Critical', 'Payments'],
      createdAt: addDays(now, -14).toISOString(),
      updatedAt: now.toISOString()
    },

    // DONE TASKS
    {
      id: 'task-009',
      title: 'Fix critical login bug',
      description: 'Resolved issue preventing users from logging in on mobile devices',
      status: 'done',
      priority: 'high',
      dueDate: formatDate(addDays(now, -1)),
      completedAt: now.toISOString(),
      assignee: users[2],
      tags: ['Bug Fix', 'Mobile'],
      createdAt: addDays(now, -2).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-010',
      title: 'Setup CI/CD pipeline',
      description: 'Configured GitHub Actions for automated testing and deployment',
      status: 'done',
      priority: 'medium',
      dueDate: formatDate(addDays(now, -2)),
      completedAt: addDays(now, -1).toISOString(),
      assignee: users[0],
      tags: ['DevOps', 'Infrastructure'],
      createdAt: addDays(now, -9).toISOString(),
      updatedAt: addDays(now, -1).toISOString()
    },
    {
      id: 'task-011',
      title: 'Write unit tests',
      description: 'Add comprehensive unit tests for authentication module',
      status: 'done',
      priority: 'high',
      dueDate: formatDate(addDays(now, -3)),
      completedAt: addDays(now, -2).toISOString(),
      assignee: users[1],
      tags: ['Testing', 'QA'],
      createdAt: addDays(now, -10).toISOString(),
      updatedAt: addDays(now, -2).toISOString()
    },
    {
      id: 'task-012',
      title: 'Refactor payment module',
      description: 'Clean up and optimize payment processing code',
      status: 'done',
      priority: 'medium',
      dueDate: formatDate(addDays(now, -4)),
      completedAt: addDays(now, -3).toISOString(),
      assignee: users[3],
      tags: ['Refactoring', 'Code Quality'],
      createdAt: addDays(now, -12).toISOString(),
      updatedAt: addDays(now, -3).toISOString()
    },
    {
      id: 'task-013',
      title: 'Security audit',
      description: 'Conduct comprehensive security review of the application',
      status: 'done',
      priority: 'high',
      dueDate: formatDate(addDays(now, -5)),
      completedAt: addDays(now, -4).toISOString(),
      assignee: users[0],
      tags: ['Security', 'Audit'],
      createdAt: addDays(now, -13).toISOString(),
      updatedAt: addDays(now, -4).toISOString()
    },
    {
      id: 'task-014',
      title: 'Update dependencies',
      description: 'Update all npm packages to latest stable versions',
      status: 'done',
      priority: 'low',
      dueDate: formatDate(addDays(now, -6)),
      completedAt: addDays(now, -5).toISOString(),
      assignee: users[2],
      tags: ['Maintenance', 'Dependencies'],
      createdAt: addDays(now, -14).toISOString(),
      updatedAt: addDays(now, -5).toISOString()
    }
  ];

  return tasks;
}

/**
 * Generate statistics data
 */
function generateStatistics() {
  const tasks = generateTasks();

  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;
  const overdueCount = tasks.filter(t => t.isOverdue && t.status !== 'done').length;

  return [
    {
      id: 'stat-001',
      title: 'Total Tasks',
      icon: '📊',
      value: tasks.length,
      change: '+12',
      changeLabel: 'this week',
      changeType: 'positive',
      color: '#1976D2'
    },
    {
      id: 'stat-002',
      title: 'Completed',
      icon: '✅',
      value: doneCount,
      change: '+5',
      changeLabel: 'this week',
      changeType: 'positive',
      color: '#4CAF50'
    },
    {
      id: 'stat-003',
      title: 'In Progress',
      icon: '⚡',
      value: inProgressCount,
      change: '+8',
      changeLabel: 'this week',
      changeType: 'positive',
      color: '#FF9800'
    },
    {
      id: 'stat-004',
      title: 'Overdue',
      icon: '⚠️',
      value: overdueCount,
      change: '-2',
      changeLabel: 'this week',
      changeType: overdueCount > 0 ? 'negative' : 'positive',
      color: '#F44336'
    }
  ];
}

/**
 * Write JSON file
 */
function writeJsonFile(filename, data) {
  const filePath = path.join(__dirname, 'data-fetching', filename);
  const dir = path.dirname(filePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf8');
  console.log(`✅ Generated: ${filename}`);
}

/**
 * Write combined data file for json-server
 */
function writeServerFile(filename, data) {
  const filePath = path.join(__dirname, filename);
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf8');
  console.log(`✅ Generated: ${filename}`);
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Generating mock data based on test criteria...\n');

  try {
    // Generate tasks and statistics
    const tasks = generateTasks();
    const statistics = generateStatistics();
    const users = generateUsers();

    // Calculate task statistics for analytics
    const taskStats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'done').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      todo: tasks.filter(t => t.status === 'todo').length,
      overdue: tasks.filter(t => t.isOverdue && t.status !== 'done').length
    };

    console.log('📊 Task Statistics:');
    console.log(`   Total: ${taskStats.total}`);
    console.log(`   Todo: ${taskStats.todo}`);
    console.log(`   In Progress: ${taskStats.inProgress}`);
    console.log(`   Done: ${taskStats.completed}`);
    console.log(`   Overdue: ${taskStats.overdue}\n`);

    // Generate data for json-server (combined file)
    const serverData = {
      tasks,
      statistics,
      users,
      meta: {
        totalTasks: tasks.length,
        totalUsers: users.length,
        generatedAt: new Date().toISOString(),
        stats: taskStats
      }
    };

    // Write individual files to data-fetching directory
    writeJsonFile('tasks.json', { tasks, meta: { totalCount: tasks.length } });
    writeJsonFile('statistics.json', { statistics });
    writeJsonFile('users.json', { users });

    // Write combined file for json-server
    writeServerFile('data-fetching.json', serverData);

    console.log('\n✨ All mock data files generated successfully!');
    console.log(`📅 Generated on: ${new Date().toLocaleString()}`);
    console.log('\n📝 Files created:');
    console.log('   - data-fetching/tasks.json');
    console.log('   - data-fetching/statistics.json');
    console.log('   - data-fetching/users.json');
    console.log('   - data-fetching.json (for json-server)');
    console.log('\n💡 Run the mock API with: npm run mock:api');
    console.log('💡 Run the Angular app with: npm start');
  } catch (error) {
    console.error('❌ Error generating mock data:', error);
    process.exit(1);
  }
}

// Run the script
main();
