import { gql } from "apollo-server-express";
import Prisma from "@prisma/client";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { randomInt } from "crypto";
import nodemailer from "nodemailer";
const prisma = new Prisma.PrismaClient();

export const typeDefs = gql`
  type Event {
    id: Int!
    name: String!
    description: String!
    date: String!
    attendees: [User]
    manager: User!
    managerId: Int!
    project: Project
    projectId: Int
  }

  type Task {
    id: Int!
    manager: User!
    managerId: Int!
    assignees: [User]
    name: String!
    description: String!
    date: String!
    urgent: Boolean!
    completed: Boolean!
    project: Project
    projectId: Int
  }

  type User {
    id: Int!
    email: String!
    password: String!
    name: String!
    tasks: [Task]
    tasksManaging: [Task]
    projects: [Project]
    projectsManaging: [Project]
    events: [Event]
    eventsManaging: [Event]
    connections: [User]
    connectsToUser: [User]
    resetToken: String
  }

  type Project {
    id: Int!
    name: String!
    description: String!
    tasks: [Task]
    events: [Event]
    manager: User!
    managerId: Int!
    members: [User]!
  }

  type Query {
    getAssignedTasks: [Task]
    getTasksByDate(userId: Int!, year: String!): Task
    getTask(userId: Int!, taskId: Int!): Task
    getUser: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthenticationResponse!
    addTask(
      name: String!
      description: String!
      urgent: Boolean!
      date: String!
      assignees: [UserInput]!
    ): Response!
    createAccount(
      email: String!
      password: String!
      name: String!
    ): AuthenticationResponse!
    addEvent(
      name: String!
      description: String!
      startTime: String!
      endTime: String!
      attendees: [UserInput]
    ): Response!
    addProject(
      name: String!
      description: String!
      tasks: [TaskInput]
      events: [EventInput]
      members: [UserInput]
    ): Response!
    completeTask(id: Int!): Response!
    completeTasks(id: [Int]!): Response!
    deleteTask(id: Int!): Response!
    addConnection(email: String!): Response!
    editTask(
      id: Int!
      name: String
      description: String
      urgent: Boolean
      date: String
      completed: Boolean
      assignees: [UserInput]
    ): TaskUpdateResponse
    createResetToken(email: String!): Response!
    resetPassword(email: String!, password: String!, token: String!): Response!
  }

  type TaskUpdateResponse {
    success: Boolean!
    message: String
  }
  type TaskMutationResponse {
    success: Boolean!
    message: String
  }

  type AuthenticationResponse {
    message: String
  }
  type UserUpdateResponse {
    success: Boolean!
    message: String
  }

  input UserInput {
    email: String!
  }

  input EventInput {
    id: Int!
  }
  input TaskInput {
    id: Int!
  }

  type Response {
    success: Boolean!
    message: String
  }
`;

export const resolvers = {
  Query: {
    getAssignedTasks(parent, args, context, info) {
      return context.user
        ? prisma.task.findMany({
            where: {
              assignees: { some: { id: context.user.id } },
            },
            include: {
              assignees: true,
              project: true,
              manager: true,
            },
          })
        : null;
    },
    getUser(parent, args, context, info) {
      return context.user
        ? prisma.user.findUnique({
            where: {
              id: context.user.id,
            },
            select: {
              email: true,
              name: true,
              id: true,
              connections: true,
              connectsToUser: true,
            },
          })
        : null;
    },
    getTasksByDate(parent, args, context, info) {
      return prisma.task.findMany({
        where: {
          assignees: { some: { id: args.userId } },
          date: args.date,
        },
        include: {
          user: true,
        },
      });
    },
    getTask(parent, args, context, info) {
      return prisma.task.findUnique({
        where: {
          id: args.taskId,
          assignees: {
            some: {
              id: args.userId,
            },
          },
        },
        include: {
          manager: true,
          assignees: true,
          date: true,
          project: true,
        },
      });
    },
  },
  Mutation: {
    async login(parent, args, context, info) {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });
      if (user === null) {
        return { message: "that email does not belong to a user" };
      }
      const signedIn = await compare(args.password, user.password);
      if (signedIn) {
        const token = jwt.sign(user, process.env.secret);
        context.res.cookie("token", token);
        return { message: "logged in" };
      } else {
        return { message: "incorrect password" };
      }
    },
    async addTask(parent, args, context, info) {
      const user = context.user
        ? await prisma.user.update({
            where: {
              id: context.user.id,
            },
            data: {
              tasksManaging: {
                create: {
                  name: args.name,
                  description: args.description,
                  urgent: args.urgent,
                  completed: false,
                  date: args.date,
                  assignees: {
                    connect: [
                      { id: context.user.id },
                      ...args.assignees.map((assignee) => ({
                        email: assignee.email,
                      })),
                    ],
                  },
                },
              },
            },
          })
        : null;
      return user
        ? { success: true, message: "task created" }
        : { success: false, message: "could not create task" };
    },
    async createAccount(parent, args, context, info) {
      if (
        (await prisma.user.findUnique({ where: { email: args.email } })) !==
        null
      ) {
        return { message: "account already exists" };
      }
      const user = await prisma.user.create({
        data: {
          email: args.email,
          password: await hash(args.password, 10),
          name: args.name,
        },
      });
      const token = jwt.sign(user, process.env.secret);
      context.res.cookie("token", token);
      return { message: "account created" };
    },
    async deleteTask(parent, args, context, info) {
      let deleted = false;
      if (
        context.user &&
        context.user.id ==
          (
            await prisma.task.findUnique({
              where: { id: args.id },
              select: { managerId: true },
            })
          ).managerId
      ) {
        deleted = await prisma.task.delete({ where: { id: args.id } });
      }
      return deleted
        ? { success: true, message: "deleted successfully" }
        : { success: false, message: "could not be deleted" };
    },
    async addConnection(parent, args, context, info) {
      let connected = false;
      if (context.user) {
        connected = await prisma.user.update({
          where: { id: context.user.id },
          data: { connections: { connect: { email: args.email } } },
        });
      } else {
        return { message: "you are not logged in", success: false };
      }
      return connected
        ? { message: "you are now connected", success: true }
        : { message: "that user does not exist", success: false };
    },
    async editTask(parent, args, context, info) {
      let edited = false;
      if (context.user) {
        edited = await prisma.task.update({
          where: { id: args.id },
          data: {
            urgent: args.urgent,
            name: args.name,
            description: args.description,
            date: args.data,
            completed: args.completed,
            assignees: {
              connect: [
                { id: context.user.id },
                ...args.assignees.map((assignee) => ({
                  email: assignee.email,
                })),
              ],
            },
          },
        });
      } else {
        return { message: "you are not logged in", success: false };
      }
      return connected
        ? { message: "edited successfully", success: true }
        : { message: "edit failed", success: false };
    },
    async createResetToken(parent, args, context, info) {
      let created = false;
      let digit = () => randomInt(0, 10);
      let token = `${digit()}${digit()}${digit()}${digit()}${digit()}${digit()}`;
      if (await prisma.user.findUnique({ where: { email: args.email } })) {
        created = await prisma.user.update({
          where: { email: args.email },
          data: { resetToken: token },
        });
        let transport = nodemailer.createTransport({
          host: "localhost",
          port: 465,
          secure: true,
          tls: {
            rejectUnauthorized: false,
          },
          auth: {
            user: process.env.resetEmail,
            pass: process.env.resetEmailPassword,
          },
        });
        transport.sendMail({
          from: process.env.resetEmail,
          to: args.email,
          subject: "Plan Promptly reset code",
          text: `Use this reset code: ${token} at https://www.planpromptly.ca/auth/forgot/reset`,
        });
      } else {
        return {
          message: "user does not exist please sign up",
          success: false,
        };
      }
      return created
        ? { message: "reset token created", success: true }
        : { message: "token creation failed", success: false };
    },
    async resetPassword(parent, args, context, info) {
      let reset = false;
      let correctToken = await prisma.user.findUnique({
        where: { email: args.email },
        select: { resetToken: true },
      });
      if (!correctToken) {
        return {
          message: "no reset code exists for this user",
          success: false,
        };
      } else if (correctToken == !args.token) {
        return { message: "incorrect reset code", success: false };
      } else {
        reset = await prisma.user.update({
          where: { email: args.email },
          data: { password: await hash(args.password, 10), resetToken: null },
        });
        return reset
          ? { message: "successfully reset password", success: true }
          : { message: "password reset unsuccessful", success: false };
      }
    },
  },
};
