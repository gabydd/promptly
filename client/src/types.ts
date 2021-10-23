import { OperationVariables, ApolloQueryResult } from "@apollo/client";

type RefetchType = (
  variables?: Partial<OperationVariables> | undefined
) => Promise<ApolloQueryResult<any>>;
type SetStateType = React.Dispatch<React.SetStateAction<Date>>
export type UserType = {
  id: number;
  name: string;
  email: string;
  connections:
    | {
        name: string;
        email: string;
      }[]
    | [];
  connectsToUser:
    | {
        name: string;
        email: string;
      }[]
    | [];
};

export type UserTypeData = {
  getUser: UserType;
};

export type TaskType = {
  id: number;
  name: string;
  description: string;
  date: string;
  assignees:
    | {
        name: string;
        email: string;
      }[]
    | [];
  completed: boolean;
  urgent: boolean;
  manager: {
    name: string;
  };
};

export type TaskTypeData = {
  getAssignedTasks: TaskType[];
};

export type RefetchUserProps = {
  refetchUser: RefetchType;
};
export type RefetchEventsProps = {
  refetchEvents: RefetchType;
};
export type RefetchTasksProps = {
  refetchTasks: RefetchType;
};
export type SetDateProps = {
  setDate: SetStateType
}
export type DateProps = {
  date: Date
}
export type UserProps = {
  user: UserType;
};

export type CompleteUserProps = UserProps & RefetchUserProps;
export type AddEventProps = UserProps & RefetchEventsProps;
export type AddTaskProps = UserProps & RefetchTasksProps;

export type TaskViewProps = RefetchTasksProps &
  UserProps & {
    task: TaskType;
  };
export type TasksViewProps = RefetchTasksProps &
  UserProps & {
    tasks: TaskType[] | undefined;
    loading: boolean | undefined;
  };
export type ViewSelectorType = SetDateProps & DateProps