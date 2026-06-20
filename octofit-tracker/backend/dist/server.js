"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const sendCollection = async (res, model, collectionName) => {
    try {
        const items = await model.find({});
        res.json({ collection: collectionName, count: items.length, items });
    }
    catch (error) {
        res.status(500).json({ error: `Failed to load ${collectionName}` });
    }
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiUrl: API_BASE_URL });
});
app.get('/api/config', (_req, res) => {
    res.json({
        apiUrl: API_BASE_URL,
        port: PORT,
        database: 'octofit_db',
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    await sendCollection(res, user_1.User, 'users');
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    await sendCollection(res, team_1.Team, 'teams');
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    await sendCollection(res, activity_1.Activity, 'activities');
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    await sendCollection(res, leaderboard_1.Leaderboard, 'leaderboard');
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    await sendCollection(res, workout_1.Workout, 'workouts');
});
const startServer = async () => {
    try {
        await (0, database_1.default)();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`API base URL: ${API_BASE_URL}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
