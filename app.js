const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const instrumentRouter = require("./routers/instrumentsRouter");
const musicianRouter = require("./routers/musicianRouter");
const authRouther = require("./routers/authRouter");
const districtRouter = require("./routers/districtRouter");
const musicianCardRouter = require("./routers/musicianCardRouter");
const resetPasswordRouter = require("./routers/resetPasswordRouter");
const likeRouter = require("./routers/likeRouter");
const adminRouter = require("./routers/adminRouter");
const fileupload = require("express-fileupload");
const config = require("config");

const app = express();
app.use(express.static(config.get("imageFolder")));
app.use(fileupload());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouther);
app.use("/instruments", instrumentRouter);
app.use(["/signup", "/musicians"], musicianRouter);
app.use("/district", districtRouter);
app.use("/musician_card", musicianCardRouter);
app.use("/reset_password", resetPasswordRouter);
app.use("/like", likeRouter);
app.use("/admin", adminRouter);

const PORT = config.get("PORT");
app.listen(PORT, () => console.log("listening on port " + PORT));
