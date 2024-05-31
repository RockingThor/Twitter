import { User } from "@/lib/types";
import { atom } from "recoil";

export const userState = atom<User | undefined>({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});
