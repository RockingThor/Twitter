import axios from "axios";
import { BACKEND_URL } from "./config";

export async function getPresignedURL(authorization: string) {
    try {
        const response = await axios.get(`${BACKEND_URL}/cloud/presigned-url`, {
            headers: {
                authorization,
            },
        });
        const presignedUrl = response.data.preSignedURL;
        const formData = new FormData();
        formData.set("bucket", response.data.fields["bucket"]);
        formData.set(
            "X-Amz-Algorithm",
            response.data.fields["X-Amz-Algorithm"]
        );
        formData.set(
            "X-Amz-Credential",
            response.data.fields["X-Amz-Credential"]
        );
        formData.set(
            "X-Amz-Algorithm",
            response.data.fields["X-Amz-Algorithm"]
        );
        formData.set("X-Amz-Date", response.data.fields["X-Amz-Date"]);
        formData.set("key", response.data.fields["key"]);
        formData.set("Policy", response.data.fields["Policy"]);
        formData.set(
            "X-Amz-Signature",
            response.data.fields["X-Amz-Signature"]
        );
        formData.set(
            "X-Amz-Algorithm",
            response.data.fields["X-Amz-Algorithm"]
        );
        return {
            presignedUrl,
            formData,
        };
    } catch (error) {
        console.log(error);
    }
}
