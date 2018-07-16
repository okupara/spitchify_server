"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const service_1 = require("./service");
const env = __importStar(require("./env"));
const app = express_1.default();
app.set("views", path_1.default.join(process.cwd(), "views"));
app.set("view engine", "ejs");
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get("/login", (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${env.getApiClient()}&redirect_uri=${env.getRedirectURL()}`);
});
app.get("/ejs_test", (rea, res) => {
    res.render("test", { token: "foo", error: "bar" });
});
app.get("/spitchify_callback", (req, res) => {
    const code = req.query.code;
    service_1.getToken(code)
        .then(data => {
        res.render("callback", data);
    })
        .catch(ex => {
        console.log(ex);
        res.send(`ERROR: ${ex}`);
    });
});
app.listen(env.getPort(), () => {
    console.log(env.getRedirectURL());
});
