export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  attendees?: Maybe<Array<Maybe<User>>>;
  manager: User;
  managerId: Scalars['Int'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  manager: User;
  managerId: Scalars['Int'];
  assignees?: Maybe<Array<Maybe<User>>>;
  name: Scalars['String'];
  description: Scalars['String'];
  date: Scalars['String'];
  urgent: Scalars['Boolean'];
  completed: Scalars['Boolean'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  tasks?: Maybe<Array<Maybe<Task>>>;
  tasksManaging?: Maybe<Array<Maybe<Task>>>;
  projects?: Maybe<Array<Maybe<Project>>>;
  projectsManaging?: Maybe<Array<Maybe<Project>>>;
  events?: Maybe<Array<Maybe<Event>>>;
  eventsManaging?: Maybe<Array<Maybe<Event>>>;
  connections?: Maybe<Array<Maybe<User>>>;
  connectsToUser?: Maybe<Array<Maybe<User>>>;
  resetToken?: Maybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
  tasks?: Maybe<Array<Maybe<Task>>>;
  events?: Maybe<Array<Maybe<Event>>>;
  manager: User;
  managerId: Scalars['Int'];
  members: Array<Maybe<User>>;
};

export type UserInput = {
  email: Scalars['String'];
};

export type EventInput = {
  id: Scalars['Int'];
};

export type TaskInput = {
  id: Scalars['Int'];
};

export type Response = {
  __typename?: 'Response';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getAssignedTasks?: Maybe<Array<Maybe<Task>>>;
  getEventsAttending?: Maybe<Array<Maybe<Event>>>;
  getTasksByDate?: Maybe<Task>;
  getTask?: Maybe<Task>;
};


export type QueryGetTasksByDateArgs = {
  userId: Scalars['Int'];
  year: Scalars['String'];
};


export type QueryGetTaskArgs = {
  userId: Scalars['Int'];
  taskId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Response;
  login: Response;
  createResetToken: Response;
  resetPassword: Response;
  addConnection: Response;
  addTask: Response;
  addEvent: Response;
  addProject: Response;
  deleteTask: Response;
  deleteEvent: Response;
  deleteProject: Response;
  editTask: Response;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateResetTokenArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationAddConnectionArgs = {
  email: Scalars['String'];
};


export type MutationAddTaskArgs = {
  name: Scalars['String'];
  description: Scalars['String'];
  urgent: Scalars['Boolean'];
  date: Scalars['String'];
  assignees: Array<Maybe<UserInput>>;
};


export type MutationAddEventArgs = {
  name: Scalars['String'];
  description: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  attendees?: Maybe<Array<Maybe<UserInput>>>;
};


export type MutationAddProjectArgs = {
  name: Scalars['String'];
  description: Scalars['String'];
  tasks?: Maybe<Array<Maybe<TaskInput>>>;
  events?: Maybe<Array<Maybe<EventInput>>>;
  members?: Maybe<Array<Maybe<UserInput>>>;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationEditTaskArgs = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  urgent?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['String']>;
  completed?: Maybe<Scalars['Boolean']>;
  newAssignees?: Maybe<Array<Maybe<UserInput>>>;
  assigneesToDelete?: Maybe<Array<Maybe<UserInput>>>;
};