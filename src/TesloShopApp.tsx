import type { PropsWithChildren } from "react";
import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { Toaster } from "sonner";
import { checkAuthAction } from "./auth/actions/check-auth.action";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthAction,
        retry: false,

        // Se valida cada 2 horas, para mantener la sesión activa, si el usuario recarga la página, se validará inmediatamente y se reiniciará el contador
        refetchInterval: 1000 * 60 * 60 * 2, // Refetch every 2 hours
        refetchOnWindowFocus: true, // Refetch when the window regains focus
    })

    if (isLoading) return <CustomFullScreenLoading />;

    return children;
}

export const TesloShopApp = () => {
    return (

        <QueryClientProvider client={queryClient}>
            <Toaster />

            {/* The rest of your application */}
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}