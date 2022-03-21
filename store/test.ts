// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { QuestionProps } from "../components/Question";
import { axiosBaseQuery } from "./types";

// Define a service using a base URL and expected endpoints

export interface TestByTeacher {
  test: {
    _id: string;
    startDate: Date;
    duration: string;
  };
  teacher: string;
  techerInfo: [
    {
      _id: string;
      role: string;
      username: string;
      phone: string;
      lang: string;
    }
  ];
  degreeOfTheTest: 8;
}

interface TestWithInfo {
  test: {
    _id: string;
    startDate: string;
    duration: string;
  };
  teacher: string;
  techerInfo: [
    {
      _id: string;
      role: string;
      username: string;
      phone: string;
      lang: string;
    }
  ];
  degreeOfTheTest: number;
}

export interface Test {
  docs: {
    questions: {
      degree: number;
      answers: (boolean | string)[];
      _id: string;
      question: string;
      kind: string;
    };
    answers: {
      myAnswer: string;
      question: string;
      qId: string;
    };
    test: {
      questions: {
        degree: number;
        answers: (boolean | string)[];
        _id: string;
        question: string;
        kind: string;
      };
    };
    haveAnswer: boolean;
  };
  deleteIt: boolean;
}
export interface GetRequest {
  token: string;
  id: string;
}

interface Degree {
  _id: null;
  fullDegree: number;
  myDegree: number;
  fullQuestions: number;
  mistakes: number;
  precentage: number;
}

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://elearningloutas.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    getTestBTeacher: builder.query<TestByTeacher[], string>({
      query: (token) => ({
        url: `test/testByTecher`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getDegree: builder.query<Degree[], GetRequest>({
      query: ({ token, id }) => ({
        url: `answer/fetchDegree/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    subnitAnswer: builder.mutation<
      void,
      {
        token: string;
        testId: string;
        answer: {
          myAnswer: string;
          qId: string;
        };
      }
    >({
      query: ({ token, testId, answer }) => ({
        url: `answer/SubmitAnswer`,
        method: "POST",
        data: { testId, answer },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    testInfo: builder.query<TestWithInfo, GetRequest>({
      query: ({ token, id }) => ({
        url: `test/fetchTest/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getTestById: builder.query<QuestionProps[], GetRequest>({
      query: ({ token, id }) => ({
        url: `answer/FetchTest/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: Test[]) => {
        console.log(response);
        console.log("HHHHHHHHHHHHHHHHHHEREEEE");
        let data;
        data = response.map((q) => {
          if (q.deleteIt) {
            return {
              question: q.docs.test.questions.question,
              qId: q.docs.test.questions._id,
              degrees: q.docs.test.questions.degree,
              answer: q.docs.answers.myAnswer
                ? q.docs.answers.myAnswer.toString()
                : "",
              answers: q.docs.test.questions.answers.map((answer) => {
                return { q: answer.toString() };
              }),
            };
          }
          return {
            question: q.docs.questions?.question,
            qId: q.docs.questions?._id,
            degrees: q.docs.questions?.degree,
            answer: "",
            answers: q.docs.questions?.answers.map((answer) => {
              return { q: answer.toString() };
            }),
          };
        });

        return data;
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTestByIdQuery,
  useSubnitAnswerMutation,
  useGetTestBTeacherQuery,
  useTestInfoQuery,
  useGetDegreeQuery,
} = testApi;

///Access Api
/* import { pokemonApi } from './pokemon'

const useGetPokemonByNameQuery = pokemonApi.endpoints.getPokemonByName.useQuery */
