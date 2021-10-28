import { gql } from "@apollo/client";
export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
      email
      connections {
        name
        email
      }
      connectsToUser {
        name
        email
      }
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks {
    getAssignedTasks {
      id
      name
      description
      date
      assignees {
        name
        email
      }
      completed
      urgent
      manager {
        name
      }
    }
  }
`;
export const CREATE_TASK = gql`
  mutation CreateTask(
    $name: String!
    $description: String!
    $date: String!
    $urgent: Boolean!
    $assignees: [UserInput]!
  ) {
    addTask(
      name: $name
      description: $description
      date: $date
      urgent: $urgent
      assignees: $assignees
    ) {
      success
      message
    }
  }
`;
export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      message
      success
    }
  }
`;

export const EDIT_TASK = gql`
  mutation EditTask(
    $id: Int!
    $newAssignees: [UserInput]
    $assigneesToDelete: [UserInput]
    $completed: Boolean
    $date: String
    $description: String
    $name: String
    $urgent: Boolean
  ) {
    editTask(
      id: $id
      newAssignees: $newAssignees
      assigneesToDelete: $assigneesToDelete
      completed: $completed
      date: $date
      description: $description
      name: $name
      urgent: $urgent
    ) {
      message
      success
    }
  }
`;
export const GET_EVENTS = gql`
  query GetEvents {
    getEventsAttending {
      id
      name
      description
      startTime
      endTime
      manager {
        name
      }
      attendees {
        name
        email
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $name: String!
    $description: String!
    $startTime: String!
    $endTime: String!
    $attendees: [UserInput]!
  ) {
    addEvent(
      name: $name
      description: $description
      startTime: $startTime
      endTime: $endTime
      attendees: $attendees
    ) {
      success
      message
    }
  }
`;

export const CONNECT = gql`
  mutation AddConnection($email: String!) {
    addConnection(email: $email) {
      message
      success
    }
  }
`;

export const CREATE_RESET_TOKEN = gql`
  mutation CreateResetToken($email: String!) {
    createResetToken(email: $email) {
      message
      success
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!, $password: String!, $token: String!) {
    resetPassword(email: $email, password: $password, token: $token) {
      message
      success
    }
  }
`;