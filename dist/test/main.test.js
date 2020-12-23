"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("../src/main"));
describe('pretty-table', () => {
    it('should parse a table properly', () => {
        expect(main_1.default([
            {
                name: 'cosmo',
                animal: 'cat',
                age: 12,
            },
            {
                name: 'mabel',
                animal: 'dog',
                age: 18,
            },
        ])).toBe(`name  animal age\ncosmo cat    12\nmabel dog    18`);
    });
});
