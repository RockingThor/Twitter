import { selector } from "recoil";
import { userState, videoURLState } from "./atom";

export const userData = selector({
    key: "userData", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        const data = get(userState);

        return data;
    },
});

export const videoURL = selector({
    key: "videoURL",
    get: ({ get }) => {
        const data = get(videoURLState);
        return data;
    },
});
