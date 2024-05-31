import { selector } from "recoil";
import { userState } from "./atom";

export const userData = selector({
    key: "userData", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const data = get(userState);

        return data;
    },
});
