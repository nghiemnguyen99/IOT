import { cleanEnv, str, num } from "envalid";
export function validateEnv() {
    console.log(123);
    cleanEnv(process.env, {
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        PORT: num(),
    });
}
//# sourceMappingURL=validateEnv.js.map