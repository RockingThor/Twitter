import { useEffect, useState } from "react";
import axios from "axios";

const useDebouncedCheck = (value: string, delay: number) => {
    const [isAvailable, setIsAvailable] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);
};
