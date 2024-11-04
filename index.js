"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
//handles the creation of a user, does not give a type.
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.username;
    const password = req.body.password;
    const type = '';
    const doesOneExist = yield prisma.user.findFirst({ where: { email } });
    if (doesOneExist) {
        res.json({
            msg: 'A user with this email already exists, sign in instead',
            success: false
        });
    }
    else {
        const createTheUser = yield prisma.user.create({
            data: {
                email,
                password,
                type
            }
        });
        if (createTheUser) {
            res.json({
                msg: 'user created successfully',
                success: true
            });
        }
    }
}));
app.listen(3000, () => {
    console.log('The server is listening on port 3000. ');
});
