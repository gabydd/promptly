import { Formik, Form, FieldArray } from "formik";
import FormFields from "../../components/FormFields";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { AddEventProps } from "../../types";

const CREATE_EVENT = gql`
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

const initialValues = {
  name: "",
  description: "",
  startTime: "",
  endTime: "",
  attendees: [{ email: "" }],
};
const AddEvent = ({ refetchEvents, user }: AddEventProps) => {
  const [createEvent, { data }] = useMutation(CREATE_EVENT, {
    onCompleted: () => refetchEvents(),
  });
  const listid = "attendees";
  return (
    <div className="bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4">
      <div className="flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            startTime: Yup.date(),
            endTime: Yup.date(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              createEvent({
                variables: {
                  name: values.name,
                  description: values.description,
                  startTime: new Date(values.startTime).toISOString(),
                  endTime: new Date(values.endTime).toISOString(),
                  attendees: values.attendees.filter(
                    (attendee) => attendee.email !== ""
                  ),
                },
              });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values }) => (
            <Form>
              <FormFields label="Title" name="name" type="text" />
              <FormFields
                label="Description"
                name="description"
                type="textarea"
              />
              <FormFields
                label="Start Time"
                name="startTime"
                type="datetime-local"
              />
              <FormFields
                label="End TIme"
                name="endTime"
                type="datetime-local"
              />
              <FieldArray name="attendees">
                {({ remove, push }) => (
                  <div className="flex items-center flex-col">
                    {values.attendees.length > 0 &&
                      values.attendees.map((assignee, index) => (
                        <div key={index} className="flex items-center">
                          <FormFields
                            name={`attendees.${index}.email`}
                            list={listid}
                            label="Attendee"
                          />
                          <button
                            onClick={() => remove(index)}
                            className="mt-2 ml-1 rounded-lg w-6 bg-red-200 hover:bg-red-500"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push({ email: "" })}
                      className="rounded bg-yellow-200 hover:bg-yellow-500 mb-3 -mt-3"
                    >
                      New Attendee
                    </button>
                  </div>
                )}
              </FieldArray>

              <button
                type="submit"
                className="rounded w-full bg-green-200 hover:bg-green-500"
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {data ? data.addEvent.message : null}
      <datalist id={listid}>
        {user.connections!.map((connection) => {
          return (
            <option value={connection.email} key={connection.email}>
              {connection.name}
            </option>
          );
        })}
      </datalist>
    </div>
  );
};

export default AddEvent;
