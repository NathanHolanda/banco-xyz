import formatDateToRequestBody from "@/utils/functions/formatDateToRequestBody";
import _ from "lodash";
import { createServer, Factory, Model, Response } from "miragejs";

const usersMap = new Map([
  [0, { name: "Gabriel Topaz", email: "gabriel@topaz.com", password: "1111" }],
  [1, { name: "Alejo Topaz", email: "alejo@topaz.com", password: "2222" }],
  [2, { name: "Wilson Topaz", email: "wilson@topaz.com", password: "3333" }],
]);
const balancesMap = new Map([
  [0, { currency: "BRL", accountBalance: 20000 }],
  [1, { currency: "USD", accountBalance: 40000 }],
  [2, { currency: "EUR", accountBalance: 60000 }],
]);
const transfersMap = new Map([
  [0, { name: "Maria da Silva", document: "27706491080" }],
  [1, { name: "João dos Santos", document: "77691791062" }],
  [2, { name: "John Doe", document: "55362764098" }],
  [3, { name: "Fulano Siclano", document: "10287569098" }],
  [4, { name: "José Lima", document: "54244729070" }],
  [5, { name: "Ana Oliveira", document: "87904069075" }],
  [6, { name: "Sérgio Miranda", document: "42310851027" }],
  [7, { name: "Julia Teixeira", document: "92249806004" }],
  [8, { name: "Carlos Xavier", document: "03110505061" }],
  [9, { name: "Márcia Barbosa", document: "45731706000" }],
]);

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      transfer: Model,
      balance: Model,
    },

    factories: {
      user: Factory.extend({
        id(i) {
          return i + 1;
        },
        name(i) {
          return usersMap.get(i)?.name;
        },
        email(i) {
          return usersMap.get(i)?.email;
        },
        password(i) {
          return usersMap.get(i)?.password;
        },
      }),
      balance: Factory.extend({
        id(i) {
          return i + 1;
        },
        userId(i) {
          return i + 1;
        },
        currency(i) {
          return balancesMap.get(i)?.currency;
        },
        accountBalance(i) {
          return balancesMap.get(i)?.accountBalance;
        },
      }),
      transfer: Factory.extend({
        userId() {
          return _.shuffle([1, 2, 3])[0];
        },
        value(i) {
          return Math.round(Math.random() * 10000) / 2;
        },
        currency() {
          return _.shuffle(["USD", "EUR", "BRL"])[0];
        },
        date(i) {
          const date = new Date();
          date.setDate(date.getDate() - i);

          return formatDateToRequestBody(date);
        },
        payee(i) {
          return {
            document: transfersMap.get(i)?.document,
            name: transfersMap.get(i)?.name,
          };
        },
      }),
    },

    seeds(server) {
      server.createList("user", 3);
      server.createList("balance", 3);
      server.createList("transfer", 10);
    },

    routes() {
      this.namespace = "api";

      this.post("/login", (schema, request) => {
        const { requestBody } = request;
        const { email, password } = JSON.parse(requestBody);

        const result: any = schema.where("user", { email, password }).models;

        if (!!result.length) return new Response(200, {}, result[0]);
        else return new Response(401);
      });
      this.post("/transfer", (schema, request) => {
        const { requestBody } = request;
        const {
          userId,
          value,
          currency,
          payeeDocument,
          payeeName,
          transferDate,
        } = JSON.parse(requestBody);

        const currentBalanceValue = schema.findBy("balance", {
          userId,
        })?.accountBalance;

        if (currentBalanceValue) {
          const leftBalanceValue = currentBalanceValue - value;

          if (leftBalanceValue >= 0) {
            schema
              .findBy("balance", {
                userId,
              })
              ?.update("accountBalance", leftBalanceValue);

            return schema.create("transfer", {
              userId,
              value,
              currency,
              date: transferDate,
              payee: { name: payeeName, document: payeeDocument },
            });
          }
        }

        return new Response(400);
      });

      this.get("/balance/:userId", (schema, request) => {
        const { params } = request;
        const { userId } = params;

        const result: any = schema.where("balance", {
          userId: +userId as any,
        }).models;

        if (!!result.length) return new Response(200, {}, result[0]);
        else return new Response(400);
      });
      this.get("/transferlist/:userId", (schema, request) => {
        const { params } = request;
        const { userId } = params;

        const result: any = schema
          .all("transfer")
          .filter((item) => item.userId == +userId)
          .sort(
            (a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)
          );

        if (!!result.length) return new Response(200, {}, result);
        else return new Response(400);
      });

      this.passthrough();

      this.passthrough((request) => {
        return (
          request.url.includes(".svg") ||
          request.url.includes("svg") ||
          !request.url.includes("/api/")
        );
      });

      this.timing = 400;
    },
  });

  return server;
}
