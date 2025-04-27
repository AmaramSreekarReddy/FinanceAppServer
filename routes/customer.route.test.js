const request = require("supertest");
const express = require("express");
const customerRouter = require("./customer.route");
const Customer = require("../models/customer.model");

const app = express();

jest.mock("../models/customer.model", () => ({ 
    findAll: jest.fn(),
    findByPk: jest.fn()
}));

jest.mock("../models/account.model", () => ({}));
jest.mock("../models/document.model", () => ({}));

app.use(express.json());
app.use("/customers", customerRouter);

describe("Customer Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /customers", () => {
        it("should return all customers", async () => {
            const mockCustomers = [{ id: 1, name: "John Doe" }];
            Customer.findAll.mockResolvedValue(mockCustomers);

            const res = await request(app).get("/customers");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockCustomers);
            expect(Customer.findAll).toHaveBeenCalledTimes(1);
        });

        it("should handle errors", async () => {
            Customer.findAll.mockRejectedValue(new Error("Database error"));

            const res = await request(app).get("/customers");

            expect(res.status).toBe(500);
            expect(res.body).toEqual({ error: "Database error" });
        });
    });

    describe("GET /customers/:id", () => {
        it("should return a customer by ID", async () => {
            const mockCustomer = { id: 1, name: "John Doe" };
            Customer.findByPk.mockResolvedValue(mockCustomer);

            const res = await request(app).get("/customers/1");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockCustomer);
            expect(Customer.findByPk).toHaveBeenCalledWith("1");
        });

        it("should return 404 if customer not found", async () => {
            Customer.findByPk.mockResolvedValue(null);

            const res = await request(app).get("/customers/1");

            expect(res.status).toBe(404);
            expect(res.body).toEqual({ error: "Customer with Id: 1 not found" });
        });
    });
});