import { useEffect } from "react";
import { refreshAccessToken } from "../api/api";

const useTokenRefresh = () => {
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await refreshAccessToken();
                console.log('Token Refreshed')
            } catch (error) {
                console.error("Token refresh failed: ", error);
            }
        }, 2 * 60 * 1000); // Refresh every 25 minutes

        return () => clearInterval(interval);
    }, []);
};

export default useTokenRefresh;