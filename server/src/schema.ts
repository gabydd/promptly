import { gql } from "apollo-server-express";
import Prisma from "@prisma/client";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { randomInt } from "crypto";
import nodemailer from "nodemailer";
import * as SchemaTypes from "./types.js";
import express from "express";
const prisma = new Prisma.PrismaClient();

export const typeDefs = gql`
  type Event {
    id: Int!
    name: String!
    description: String!
    startTime: String!
    endTime: String!
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
    getUser: User
    getAssignedTasks: [Task]
    getEventsAttending: [Event]
    getTasksByDate(userId: Int!, year: String!): Task
    getTask(userId: Int!, taskId: Int!): Task
  }

  type Mutation {
    createAccount(
      email: String!
      password: String!
      name: String!
    ): AuthenticationResponse!
    login(email: String!, password: String!): AuthenticationResponse!
    createResetToken(email: String!): Response!
    resetPassword(email: String!, password: String!, token: String!): Response!
    addConnection(email: String!): Response!
    addTask(
      name: String!
      description: String!
      urgent: Boolean!
      date: String!
      assignees: [UserInput]!
    ): Response!
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
    deleteTask(id: Int!): Response!
    deleteEvent(id: Int!): Response!
    deleteProject(id: Int!): Response!
    editTask(
      id: Int!
      name: String
      description: String
      urgent: Boolean
      date: String
      completed: Boolean
      newAssignees: [UserInput]
      assigneesToDelete: [UserInput]
    ): Response!
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

interface ContextType {
  user: Prisma.User
  res: express.Response<any, Record<string, any>>
}

export const resolvers = {
  Query: {
    getUser(parent: any, args: null, context: ContextType, info: any) {
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

    getAssignedTasks(parent: any, args: null, context: ContextType, info: any) {
      if (context.user) {
        return prisma.task.findMany({
          where: {
            assignees: { some: { id: context.user.id } },
          },
          include: {
            assignees: true,
            project: true,
            manager: true,
          },
        });
      } else {
        return null;
      }
    },

    getEventsAttending(parent: any, args: null, context: ContextType, info: any) {
      if (context.user) {
        return prisma.event.findMany({
          where: {
            attendees: { some: { id: context.user.id } },
          },
          include: {
            attendees: true,
            project: true,
            manager: true,
          },
        });
      } else {
        return null;
      }
    },

    getTasksByDate(parent: any, args: SchemaTypes.QueryGetTasksByDateArgs, context: ContextType, info: any) {
      return prisma.task.findMany({
        where: {
          assignees: { some: { id: args.userId } },
          date: args.year,
        }
      });
    },

    async getTask(parent: any, args: SchemaTypes.QueryGetTaskArgs, context: ContextType, info: any) {
      const task = await prisma.task.findUnique({
        where: {
          id: args.taskId,
        },
        include: {
          manager: true,
          assignees: true,
          project: true,
        },
      });
      if (task && args.userId in task.assignees){
        return task
      }
    },
  },

  Mutation: {
    async createAccount(parent: any, args: SchemaTypes.MutationCreateAccountArgs, context: ContextType, info: any) {
      if (
        (await prisma.user.findUnique({ where: { email: args.email } })) !==
        null
      ) {
        return { message: "account already exists", success: false };
      }
      const user = await prisma.user.create({
        data: {
          email: args.email,
          password: await hash(args.password, 10),
          name: args.name,
        },
      });
      const token = jwt.sign(user, process.env.secret || "this-is-a-fallback-secret-change-it");
      context.res.cookie("token", token);
      return { message: "account created", success: true };
    },

    async login(parent: any, args: SchemaTypes.MutationLoginArgs, context: ContextType, info: any) {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });
      if (user === null) {
        return { message: "that email does not belong to a user", success: false };
      }
      const signedIn = await compare(args.password, user.password);
      if (signedIn) {
        const token = jwt.sign(user, process.env.secret || "this-is-a-fallback-secret-change-it");
        context.res.cookie("token", token);
        return { message: "logged in", success: true };
      } else {
        return { message: "incorrect password", success: false };
      }
    },

    async createResetToken(parent: any, args: SchemaTypes.MutationCreateResetTokenArgs, context: ContextType, info: any) {
      let created = false;
      let digit = () => randomInt(0, 10);
      let token = `${digit()}${digit()}${digit()}${digit()}${digit()}${digit()}`;
      if (await prisma.user.findUnique({ where: { email: args.email } })) {
        created = !! await prisma.user.update({
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

    async resetPassword(parent: any, args: SchemaTypes.MutationResetPasswordArgs, context: ContextType, info: any) {
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
      } else if (correctToken.resetToken != args.token) {
        return { message: "incorrect reset code", success: false };
      } else {
        reset = !!await prisma.user.update({
          where: { email: args.email },
          data: { password: await hash(args.password, 10), resetToken: null },
        });
        return reset
          ? { message: "successfully reset password", success: true }
          : { message: "password reset unsuccessful", success: false };
      }
    },

    async addConnection(parent: any, args: SchemaTypes.MutationAddConnectionArgs, context: ContextType, info: any) {
      let connected = false;
      if (context.user) {
        connected = !!await prisma.user.update({
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

    async addTask(parent: any, args: SchemaTypes.MutationAddTaskArgs, context: ContextType, info: any) {
      let created = false;
      if (context.user) {
        created = !! await prisma.user.update({
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
                      email: assignee!.email,
                    })),
                  ],
                },
              },
            },
          },
        });
      } else {
        return { message: "you are not logged in", success: false };
      }
      return created
        ? { message: "task created", success: true }
        : { message: "could not create task", success: false };
    },

    async addEvent(parent: any, args: SchemaTypes.MutationAddEventArgs, context: ContextType, info: any) {
      let created = false;
      if (context.user) {
        created = !! await prisma.user.update({
          where: {
            id: context.user.id,
          },
          data: {
            eventsManaging: {
              create: {
                name: args.name,
                description: args.description,
                startTime: args.startTime,
                endTime: args.endTime,
                attendees: {
                  connect: [
                    { id: context.user.id },
                    ...args!.attendees!.map((attendee) => ({
                      email: attendee!.email,
                    })),
                  ],
                },
              },
            },
          },
        });
      } else {
        return { message: "you are not logged in", success: false };
      }
      return created
        ? { message: "event created", success: true }
        : { message: "could not create event", success: false };
    },

    async addProject(parent: any, args: SchemaTypes.MutationAddProjectArgs, context: ContextType, info: any) {
      let created = false;
      if (context.user) {
        created = !! await prisma.user.update({
          where: {
            id: context.user.id,
          },
          data: {
            projectsManaging: {
              create: {
                name: args.name,
                description: args.description,
                tasks: {
                  connect: [...args!.tasks!.map((task) => ({ id: task!.id }))],
                },
                events: {
                  connect: [...args!.events!.map((event) => ({ id: event!.id }))],
                },
                members: {
                  connect: [
                    { id: context.user.id },
                    ...args!.members!.map((member) => ({
                      email: member!.email,
                    })),
                  ],
                },
              },
            },
          },
        });
      } else {
        return { message: "you are not logged in", success: false };
      }
      return created
        ? { message: "project created", success: true }
        : { message: "could not create project", success: false };
    },

    async deleteTask(parent: any, args: SchemaTypes.MutationDeleteTaskArgs, context: ContextType, info: any) {
      let deleted = false;
      if (
        context.user &&
        context.user.id ==
          (
            await prisma.task.findUnique({
              where: { id: args.id },
              select: { managerId: true },
            })
          )?.managerId
      ) {
        deleted = !! await prisma.task.delete({ where: { id: args.id } });
      }
      return deleted
        ? { success: true, message: "deleted successfully" }
        : { success: false, message: "could not be deleted" };
    },

    async deleteEvent(parent: any, args: SchemaTypes.MutationDeleteEventArgs, context: ContextType, info: any) {
      let deleted = false;
      if (
        context.user &&
        context.user.id ==
          (
            await prisma.event.findUnique({
              where: { id: args.id },
              select: { managerId: true },
            })
          )?.managerId
      ) {
        deleted = !! await prisma.event.delete({ where: { id: args.id } });
      }
      return deleted
        ? { success: true, message: "deleted successfully" }
        : { success: false, message: "could not be deleted" };
    },

    async deleteProject(parent: any, args: SchemaTypes.MutationDeleteProjectArgs, context: ContextType, info: any) {
      let deleted = false;
      if (
        context.user &&
        context.user.id ==
          (
            await prisma.project.findUnique({
              where: { id: args.id },
              select: { managerId: true },
            })
          )?.managerId
      ) {
        deleted = !! await prisma.project.delete({ where: { id: args.id } });
      }
      return deleted
        ? { success: true, message: "deleted successfully" }
        : { success: false, message: "could not be deleted" };
    },

    async editTask(parent: any, args: SchemaTypes.MutationEditTaskArgs, context: ContextType, info: any) {
      let edited = false;
      if (context.user) {
        const newAssignees =
          args!.newAssignees!.map((assignee) => ({
            email: assignee!.email,
          }))
        const assigneesToDelete =
          args!.assigneesToDelete!.map((assignee) => ({
            email: assignee!.email,
          }))
        edited = !! await prisma.task.update({
          where: { id: args.id },
          data: {
            urgent: args.urgent!,
            name: args.name!,
            description: args.description!,
            date: args.date!,
            completed: args.completed!,
            assignees: {
              connect: newAssignees.length !== 0 ? newAssignees : undefined,
              disconnect: assigneesToDelete.length !== 0 ? assigneesToDelete : undefined,
            },
          },
        });
      } else {
        return { message: "you are not logged in", success: false };
      }
      return edited
        ? { message: "edited successfully", success: true }
        : { message: "edit failed", success: false };
    },
  },
};
