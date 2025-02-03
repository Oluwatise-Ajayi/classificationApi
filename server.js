const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/classify-number", async (req, res) => {
    const { number } = req.query;

    // Input validation
    if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
        return res.status(400).json({ number: number, error: true });
    }

    const num = parseInt(number);
    const properties = [];
    let funFact = "";

    // Check if the number is prime
    const isPrime = (n) => {
        if (n <= 1) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    };

    // Check if the number is an Armstrong number
    const isArmstrong = (n) => {
        const digits = n.toString().split("").map(Number);
        const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, digits.length), 0);
        return sum === n;
    };

    // Check if the number is a perfect number
    const isPerfect = (n) => {
        if (n < 1) return false;
        let sum = 0;
        for (let i = 1; i <= n / 2; i++) {
            if (n % i === 0) {
                sum += i;
            }
        }
        return sum === n;
    };

    if (isArmstrong(num)) {
        properties.push("armstrong");
    }
    if (num % 2 !== 0) {
        properties.push("odd");
    }
    if (num % 2 === 0) {
        properties.push("even");
    }
    if (isPrime(num)) {
        properties.push("prime");
    }

    // Fetch fun fact from Numbers API
    try {
        const response = await axios.get(`http://numbersapi.com/${num}`);
        funFact = response.data;
    } catch (error) {
        funFact = "No fun fact available.";
    }

    res.status(200).json({
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties: properties,
        digit_sum: num.toString().split("").reduce((acc, digit) => acc + Number(digit), 0),
        fun_fact: funFact,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
