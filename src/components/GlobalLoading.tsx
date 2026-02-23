"use client"

import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export default function GlobalLoading() {
    const isFetching = useIsFetching()
    const isMutating = useIsMutating()

    const isLoading = isFetching > 0 || isMutating > 0

    if(!isLoading) {
        return null
    }

    return (
        <div className="fixed w-screen h-screen overflow-hidden bg-black/50 flex items-center justify center z-50 left-0 top-0">
            <h1 className="text-white">Loading</h1>
        </div>
    )

}