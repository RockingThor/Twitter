import { User, UserWithDetails } from "@/lib/types";
import { atom } from "recoil";

export const userState = atom<UserWithDetails | undefined>({
    key: "userState", // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});
