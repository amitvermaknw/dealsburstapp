
export const useAdminAuth = () => {

    const authenticate = async (formData: { email: string, password: string }): Promise<{ code: number, msg: string } | { error: string }> => {
        try {
            const result = await fetch("/api/auth/admin/login", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            const loginStatus = await result.json();
            if (loginStatus.code === 200) {
                return loginStatus;
            }

            return loginStatus;

        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }

            return { error: "error" }
        }
    }

    const removeToken = async () => {
        try {
            const result = await fetch("/api/auth/admin/logout", {
                method: "DELETE"
            });

            const logoutStatus = await result.json();
            if (logoutStatus.code === 200) {
                return logoutStatus;
            }

            return logoutStatus;

        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }

            return { error: "error" }
        }
    }

    return [authenticate, removeToken] as const
}
