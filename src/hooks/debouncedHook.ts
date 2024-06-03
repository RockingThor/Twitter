import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

export const useDebouncedCheck = (value: string, delay: number) => {
    const [isAvailable, setIsAvailable] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const source = axios.CancelToken.source();

        const checkAvailablity = async () => {
            if (!value) {
                setIsAvailable(null);
                return;
            }
            setIsLoading(true);
            setError("");

            try {
                const response = await axios.get(
                    `${BACKEND_URL}/validate-username`,
                    {
                        cancelToken: source.token,
                        params: {
                            username: value,
                        },
                    }
                );

                setIsAvailable(response.data.success);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request cancelled", error.message);
                } else {
                    setError("Something went wrong.😟 Please try again");
                }
            } finally {
                setIsLoading(false);
            }
        };

        const handler = setTimeout(() => {
            checkAvailablity();
        }, delay);

        return () => {
            clearTimeout(handler);
            source.cancel("Operation canceled due to new request.");
        };
    }, [value, delay]);

    return { isAvailable, isLoading, error };
};
